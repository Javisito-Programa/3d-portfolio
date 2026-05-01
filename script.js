import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- Scene Setup ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// We don't set a background color so it stays transparent (or we can set a very dark fog)
scene.fog = new THREE.FogExp2(0x030303, 0.02);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// Enable shadows for realism
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
container.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.maxDistance = 10;
controls.minDistance = 2;
// Limit vertical rotation to not go below the ground
controls.maxPolarAngle = Math.PI / 2 + 0.1;

// --- Lighting ---
// Base ambient light (Low intensity for high contrast)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Sharp white structural light 1
const neonLight1 = new THREE.PointLight(0xffffff, 50, 20);
neonLight1.position.set(2, 4, 2);
scene.add(neonLight1);

// Secondary fill light
const neonLight2 = new THREE.PointLight(0xaaaaaa, 20, 20);
neonLight2.position.set(-2, 2, -2);
scene.add(neonLight2);

// Main directional light (Harsh stark white)
const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.position.set(5, 10, 5);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.bias = -0.0001;
scene.add(dirLight);

// --- 3D Model Loading ---
const loader = new GLTFLoader();
let model;

// Create a placeholder while the real model loads, or if it fails
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
    
    // Animate the placeholder
    gsap.to(cube.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
    });
};

// Try to load the user's GLB file. If it doesn't exist, use the placeholder.
loader.load(
    'assets/3d/setup.glb', // Path to the actual model
    (gltf) => {
        model = gltf.scene;
        
        // --- AUTO CENTERING AND SCALING ---
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        // Calculate scale to fit within a reasonable view (target size around 4 units)
        const scale = 4 / maxDim;
        model.scale.set(scale, scale, scale);
        
        // Center the model relative to the world
        model.position.sub(center.multiplyScalar(scale));
        // Push it down slightly so it looks like it's resting
        model.position.y -= (size.y * scale) / 2 - 0.5;
        
        // Enable shadows for all meshes inside the model
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        scene.add(model);
        console.log("Model loaded successfully");
    },
    (xhr) => {
        // Progress callback
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        // Error callback (fallback to placeholder)
        console.warn("Could not load setup.glb. This is normal if the file hasn't been uploaded yet. Using placeholder.");
        createPlaceholder();
    }
);

// --- Particles System ---
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles randomly
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

// --- Mouse Interaction with Particles ---
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

// --- Window Resize ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// --- Animation Loop ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    // Subtle particle floating
    particlesMesh.rotation.y = -0.05 * elapsedTime;
    
    // Parallax effect on particles based on mouse
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);

    renderer.render(scene, camera);
}
animate();

// --- Interactive Buttons (Structural Scan) ---
const lightToggleBtn = document.getElementById('light-toggle');
let isHacked = false;

lightToggleBtn.addEventListener('click', () => {
    isHacked = !isHacked;
    
    if (isHacked) {
        // Wireframe / Scan mode
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
        // Normal mode
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

// --- Scroll Animations (GSAP + ScrollTrigger) ---
gsap.registerPlugin(ScrollTrigger);

// Animate elements as they scroll into view
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
