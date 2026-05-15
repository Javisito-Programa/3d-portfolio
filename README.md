<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=00f3ff&height=150&section=header&text=🌌%20PROJECT.NEXUS&fontSize=50&fontColor=ffffff&animation=fadeIn" width="100%"/>
  
  # 🚀 INTERACTIVE 3D DEVELOPER PORTFOLIO
  **A Next-Generation Web Experience rendered in Real-Time WebGL**
  
  [Explore](#-highlighted-features) • [Installation](#-installation-and-deployment) • [Technologies](#️-technology-stack) • [Structure](#-system-structure)
</div>

---

> *"Designed not just to be seen, but to be experienced."*

Welcome to **PROJECT.NEXUS**, a cutting-edge web portfolio designed to fuse advanced Front-End development with immersive 3D environments. This project demonstrates the seamless integration of interactive graphics, complex animations, and a sci-fi inspired UI design (Iron Man Armory style).

---

## ⚡ HIGHLIGHTED FEATURES

### 🖥️ **Interactive 3D Armory (Iron Man Style)**
A gallery of 3D models housed in cybernetic containment pods. Features glowing pedestals, rotating rings, and a **Full-Screen Holographic Viewer**. 
* Included models: **Gamer Setup**, **Restaurant**, and a **Solar System Simulation**.

### 🌌 **Deep Space Simulation (Pure CSS)**
The Solar System model features an exclusive environment: a deep space background generated 100% with CSS math (`radial-gradient`), creating an infinitely moving starfield without using a single image.

### 🐻 **Rive Motion Integration**
Integration of dynamic states and micro-interactions using the **Rive** engine (Loginbear), achieving fluid, lightweight vector animations with real-time response.

### 🔮 **Cyber-UI & Glassmorphism**
Interface built with translucent panels (`backdrop-filter`), customizable neon accents (Cyan and Solar Orange), futuristic typography (*Space Grotesk*), and scroll-reveal animations powered by **GSAP**.

---

## 🛠️ TECHNOLOGY STACK

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Blender-F5792A?style=for-the-badge&logo=blender&logoColor=white" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
</div>

- **Three.js & WebGL**: Rendering of interactive `.glb` models with dynamic camera controls and geometric spatial origin correction.
- **Google `<model-viewer>`**: Main engine for fluid manipulation and visualization of 3D assets in the gallery.

---

## 🚀 INSTALLATION AND DEPLOYMENT

The project is designed to run natively on modern browsers, but due to **CORS** security policies for loading 3D models, it must be run through a local server.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Javisito-Programa/3d-portfolio.git
   ```

2. **Run Locally:**
   - Open the project folder in **Visual Studio Code**.
   - Install the **Live Server** extension.
   - Click `Go Live` on the bottom status bar to deploy the environment.

---

## 📁 SYSTEM STRUCTURE

```text
📦 PROJECT.NEXUS
 ┣ 📂 assets
 ┃ ┣ 📂 3d
 ┃ ┃ ┣ 📜 setup.glb           # Main development environment
 ┃ ┃ ┣ 📜 Modelo2.glb         # Architectural Rendering (Restaurant)
 ┃ ┃ ┗ 📜 SolarSystem.glb     # Astronomical Simulation
 ┃ ┣ 📂 Videos
 ┃ ┃ ┗ 📜 Loginbear.mp4       # Interactive Rive Render
 ┃ ┗ 📂 img
 ┣ 📜 index.html              # DOM Structure & UI
 ┣ 📜 style.css               # Design System, CSS Stars and Neon FX
 ┣ 📜 script.js               # 3D Camera Controllers and Modal Logic
 ┗ 📜 README.md               # Documentation
```

---

## 🎓 ACADEMIC INFORMATION
This project is a technical demonstration of advanced Front-End capabilities, modern interface structuring, and 3D graphics integration on the web.

- **Developer:** ITRAN JAVIER MORALES BROCA
- **GitHub Profile:** [@Javisito-Programa](https://github.com/Javisito-Programa)

---
<div align="center">
  <i>Rendered in real-time. Built for the future.</i>
</div>
