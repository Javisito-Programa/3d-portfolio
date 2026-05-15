<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=00f3ff&height=150&section=header&text=🌌%20PROJECT.NEXUS&fontSize=50&fontColor=ffffff&animation=fadeIn" width="100%"/>
  
  # 🚀 INTERACTIVE 3D DEVELOPER PORTFOLIO
  **A Next-Generation Web Experience rendered in Real-Time WebGL**
  
  [Explorar](#-features) • [Instalación](#-instalación) • [Tecnologías](#-tecnologías) • [Estructura](#-estructura-del-sistema)
</div>

---

> *"Diseñado no solo para ser visto, sino para ser experimentado."*

Bienvenido a **PROJECT.NEXUS**, un portafolio web de vanguardia diseñado para fusionar el desarrollo Front-End avanzado con entornos 3D inmersivos. Este proyecto demuestra la integración fluida de gráficos interactivos, animaciones complejas y un diseño UI inspirado en interfaces de ciencia ficción (estilo *Iron Man Armory*).

---

## ⚡ FEATURES DESTACADOS

### 🖥️ **Armería 3D Interactiva (Iron Man Style)**
Una galería de modelos 3D alojados en cápsulas de contención cibernéticas. Cuenta con pedestales brillantes, aros giratorios y un **Visor Holográfico a Pantalla Completa**. 
* Modelos incluidos: **Setup Gamer**, **Restaurante**, y una **Simulación del Sistema Solar**.

### 🌌 **Simulación de Espacio Profundo (Pure CSS)**
El modelo del Sistema Solar cuenta con un entorno exclusivo: un fondo de espacio profundo generado 100% con matemáticas CSS (`radial-gradient`), creando un campo de estrellas en movimiento infinito sin usar una sola imagen.

### 🐻 **Rive Motion Integration**
Integración de estados dinámicos y micro-interacciones utilizando el motor **Rive** (Loginbear), logrando animaciones vectoriales fluidas, ligeras y con respuesta en tiempo real.

### 🔮 **Cyber-UI & Glassmorphism**
Interfaz construida con paneles translúcidos (`backdrop-filter`), detalles de neón personalizables (Cyan y Naranja Solar), tipografía futurista (*Space Grotesk*) y animaciones de revelado con **GSAP**.

---

## 🛠️ STACK TECNOLÓGICO

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Blender-F5792A?style=for-the-badge&logo=blender&logoColor=white" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
</div>

- **Three.js & WebGL**: Renderizado de modelos `.glb` interactivos con control de cámara dinámico y corrección geométrica de origen espacial.
- **Google `<model-viewer>`**: Motor principal para la manipulación y visualización fluida de los assets 3D en la galería.

---

## 🚀 INSTALACIÓN Y DESPLIEGUE

El proyecto está diseñado para funcionar de manera nativa en navegadores modernos, pero debido a las políticas de seguridad **CORS** para la carga de modelos 3D, debe ejecutarse a través de un servidor local.

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Javisito-Programa/3d-portfolio.git
   ```

2. **Ejecutar Localmente:**
   - Abre la carpeta del proyecto en **Visual Studio Code**.
   - Instala la extensión **Live Server**.
   - Haz clic en `Go Live` en la barra inferior para desplegar el entorno.

---

## 📁 ESTRUCTURA DEL SISTEMA

```text
📦 PROJECT.NEXUS
 ┣ 📂 assets
 ┃ ┣ 📂 3d
 ┃ ┃ ┣ 📜 setup.glb           # Entorno de desarrollo principal
 ┃ ┃ ┣ 📜 Modelo2.glb         # Renderización Arquitectónica (Restaurante)
 ┃ ┃ ┗ 📜 SolarSystem.glb     # Simulación Astronómica
 ┃ ┣ 📂 Videos
 ┃ ┃ ┗ 📜 Loginbear.mp4       # Render interactivo de Rive
 ┃ ┗ 📂 img
 ┣ 📜 index.html              # Estructura del DOM & Interfaz
 ┣ 📜 style.css               # Sistema de diseño, CSS Stars y Neon FX
 ┣ 📜 script.js               # Controladores de cámara 3D y lógica del Modal
 ┗ 📜 README.md               # Documentación
```

---

## 🎓 INFORMACIÓN ACADÉMICA
Este proyecto es una demostración técnica de capacidades Front-End avanzadas, estructuración de interfaces modernas e integración de gráficos 3D en la web.

- **Desarrollador:** Javier (Itran)
- **Perfil de GitHub:** [@Javisito-Programa](https://github.com/Javisito-Programa)

---
<div align="center">
  <i>Renderizado en tiempo real. Construido para el futuro.</i>
</div>
