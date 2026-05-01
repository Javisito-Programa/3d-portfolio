import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// --- Configuración de la Escena ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// No establecemos color de fondo para que sea transparente (o podemos usar una niebla muy oscura)
scene.fog = new THREE.FogExp2(0x030303, 0.02);

// Cámara (Planos cercanos/lejanos aumentados para evitar recortes en modelos grandes)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 5000);
camera.position.set(0, 1.5, 4);

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// Activar sombras para mayor realismo
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
container.appendChild(renderer.domElement);

// Mapa de Entorno (Crucial para que los materiales metálicos/rugosos no se vean defectuosos o negros)
const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

// Controles de Cámara
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.maxDistance = 100;
controls.minDistance = 0.5;
controls.target.set(0, 0, 0); // Enfocar exactamente en el centro
controls.update();

// --- Iluminación ---
// Luz ambiental base (Baja intensidad para alto contraste)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Luz estructural blanca nítida 1
const neonLight1 = new THREE.PointLight(0xffffff, 50, 20);
neonLight1.position.set(2, 4, 2);
scene.add(neonLight1);

// Luz de relleno secundaria
const neonLight2 = new THREE.PointLight(0xaaaaaa, 20, 20);
neonLight2.position.set(-2, 2, -2);
scene.add(neonLight2);

// Luz direccional principal (Blanca dura y severa)
const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.position.set(5, 10, 5);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.bias = -0.0001;
scene.add(dirLight);

// --- Carga del Modelo 3D ---
const loader = new GLTFLoader();
let model;

// Crear un cubo provisional mientras carga el modelo real, o por si falla
const createPlaceholder = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 1;
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);
    model = cube;
    
    // Animar el cubo provisional
    gsap.to(cube.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
    });
};

// Intentar cargar el archivo GLB del usuario. Si no existe, usar el cubo provisional.
loader.load(
    'assets/3d/setup.glb', // Ruta al modelo real
    (gltf) => {
        model = gltf.scene;
        
        // --- AUTO-CENTRADO Y ESCALADO ---
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        // Calcular la escala para encajar en una vista razonable (ACERCAR EL MODELO - ZOOM)
        // Puedes cambiar el "12" por un número mayor para acercarlo más, o menor para alejarlo.
        const scale = 12 / maxDim;
        model.scale.set(scale, scale, scale);
        
        // Centrar el modelo relativo al mundo 3D
        model.position.sub(center.multiplyScalar(scale));
        // Empujarlo un poco hacia abajo para que parezca que está apoyado
        model.position.y -= (size.y * scale) / 2 - 0.5;
        
        // --- CORRECCIÓN PARA EL MODELO MIRANDO HACIA ATRÁS ---
        // Crear un grupo contenedor para poder rotar el modelo centrado de forma segura
        const wrapperGroup = new THREE.Group();
        wrapperGroup.add(model);
        wrapperGroup.rotation.y = Math.PI; // Rotar 180 grados (para que mire al frente)
        
        // Reemplazar la referencia global del modelo para que la interacción del escáner siga funcionando
        model = wrapperGroup;
        
        // Activar sombras para todas las mallas (piezas) dentro del modelo
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        scene.add(model);
        console.log("Modelo cargado exitosamente");
    },
    (xhr) => {
        // Función que se ejecuta durante la carga (progreso)
        console.log((xhr.loaded / xhr.total * 100) + '% cargado');
    },
    (error) => {
        // Función que se ejecuta si hay un error (usar cubo provisional)
        console.warn("No se pudo cargar setup.glb. Esto es normal si el archivo aún no ha sido subido. Usando cubo de prueba.");
        createPlaceholder();
    }
);

// --- Sistema de Partículas ---
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Distribuir las partículas al azar
    posArray[i] = (Math.random() - 0.5) * 15;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// --- Interacción del Mouse con las Partículas ---
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// --- Redimensionamiento de Ventana ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// --- Bucle de Animación ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    // Flotación sutil de partículas
    particlesMesh.rotation.y = -0.05 * elapsedTime;
    
    // Efecto Parallax en las partículas basado en la posición del mouse
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);

    renderer.render(scene, camera);
}
animate();

// --- Botones Interactivos (Escaneo Estructural) ---
const lightToggleBtn = document.getElementById('light-toggle');
let isHacked = false;

lightToggleBtn.addEventListener('click', () => {
    isHacked = !isHacked;
    
    if (isHacked) {
        // Modo Wireframe (Malla) / Escaneo
        gsap.to(ambientLight, { intensity: 2, duration: 1 });
        gsap.to(dirLight, { intensity: 0, duration: 1 });
        document.querySelector('.grid-overlay').style.opacity = '1';
        
        if (model) {
            model.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.userData.originalMaterial = child.material;
                    child.material = new THREE.MeshBasicMaterial({ 
                        color: 0xffffff, 
                        wireframe: true 
                    });
                }
            });
        }
        
        lightToggleBtn.innerHTML = '<span class="btn-text">DESACTIVAR ESCANEO</span><span class="btn-icon">×</span>';
        lightToggleBtn.style.background = '#ffffff';
        lightToggleBtn.style.color = '#000000';
    } else {
        // Modo Normal
        gsap.to(ambientLight, { intensity: 0.2, duration: 1 });
        gsap.to(dirLight, { intensity: 3, duration: 1 });
        document.querySelector('.grid-overlay').style.opacity = '0.5';
        
        if (model) {
            model.traverse((child) => {
                if (child.isMesh && child.userData.originalMaterial) {
                    child.material = child.userData.originalMaterial;
                }
            });
        }
        
        lightToggleBtn.innerHTML = '<span class="btn-text">INICIAR ESCANEO ESTRUCTURAL</span><span class="btn-icon">»</span>';
        lightToggleBtn.style.background = 'transparent';
        lightToggleBtn.style.color = '#ffffff';
    }
});

// --- Animaciones al hacer Scroll (GSAP + ScrollTrigger) ---
gsap.registerPlugin(ScrollTrigger);

// Animar los elementos a medida que aparecen en la pantalla
const revealElements = document.querySelectorAll('.gs-reveal');

revealElements.forEach((elem) => {
    gsap.fromTo(elem, 
        { autoAlpha: 0, y: 50 }, 
        {
            duration: 1, 
            autoAlpha: 1, 
            y: 0, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 80%", 
                toggleActions: "play none none reverse"
            }
        }
    );
});

// --- Lógica del Modo Claro / Oscuro ---
const themeToggleBtn = document.getElementById('theme-toggle');
let isLightMode = false;

themeToggleBtn.addEventListener('click', () => {
    isLightMode = !isLightMode;
    
    if (isLightMode) {
        // Cambiar variables CSS en el HTML
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleBtn.innerHTML = '☾';
        
        // Cambiar colores en Three.js para Modo Claro
        scene.fog.color.setHex(0xf8f9fa);
        // Ajustamos las luces para que no quemen la imagen en fondo blanco
        gsap.to(ambientLight, { intensity: 0.5, duration: 1 });
        gsap.to(dirLight, { intensity: 1.5, duration: 1 });
        particlesMaterial.color.setHex(0x000000); // Partículas negras para que se vean
    } else {
        // Cambiar variables CSS en el HTML al Modo Oscuro por defecto
        document.documentElement.removeAttribute('data-theme');
        themeToggleBtn.innerHTML = '☼';
        
        // Restaurar colores en Three.js para Modo Oscuro
        scene.fog.color.setHex(0x030303);
        // Restauramos intensidades
        gsap.to(ambientLight, { intensity: 0.2, duration: 1 });
        gsap.to(dirLight, { intensity: 3, duration: 1 });
        particlesMaterial.color.setHex(0xffffff); // Partículas blancas
    }
});
