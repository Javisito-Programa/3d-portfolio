# 🌌 Immersive 3D Developer Portfolio

Welcome to the **Immersive 3D Developer Portfolio** project!  
This is a modern, interactive web portfolio designed to showcase front-end skills and 3D environment rendering.

The project demonstrates how to integrate **Three.js** and **WebGL** to load a custom Blender scene directly into the browser, creating a dynamic, explorable background.

---

## 🎓 Academic Information

- **Course Name:** [Insert Course Name]  
- **Teacher's Name:** [Insert Teacher's Name]  
- **Student Name:** [Insert Your Name]

---

## ✨ Features

- 🖥️ **Interactive 3D Background:** The entire website background is a real-time rendered 3D room.
- 🌞 **Dynamic Lighting & Themes:** A functional Light/Dark mode toggle that instantly recalculates 3D scene lighting and UI CSS variables.
- 🔍 **Structural Scan Mode:** A custom "Scan" button that strips the materials from the 3D model and renders its pure wireframe structure.
- 🖼️ **3D Gallery:** A dedicated section using `<model-viewer>` to showcase 3 individual, highly detailed 3D models.
- 📱 **Fully Responsive:** Smooth UI scaling and layout adjustments for mobile devices.

---

## 📚 Theory

### 🧊 What is Three.js?

**Three.js** is a powerful 3D JavaScript library that makes it easy to create and display animated 3D computer graphics in a web browser using WebGL.  
Instead of dealing directly with complex WebGL API calls, Three.js provides high-level objects like Cameras, Scenes, Lights, and Materials.

In this project, Three.js is used to:
- Render the `setup.glb` model.
- Apply realistic PBR lighting (`RoomEnvironment`).
- Create floating particle effects mapped to mouse movements (Parallax).

---

### 🌐 What is WebGL?

**WebGL (Web Graphics Library)** is a JavaScript API for rendering high-performance interactive 3D and 2D graphics within any compatible web browser without the use of plug-ins. It interacts directly with the GPU.

---

## 🛠 Technologies

- 🌐 HTML5 (Semantic Structure)
- 🎨 CSS3 (CSS Variables, Grid/Flexbox, Glassmorphism)
- ⚡ JavaScript (ES6+ Vanilla JS)
- 🧊 Three.js (3D Rendering)
- 🟩 GSAP (Scroll animations and transitions)

---

## 🧰 Requirements

- Any modern web browser (Chrome, Firefox, Safari, Edge).
- A local development server (like VS Code **Live Server** extension) to bypass CORS restrictions when loading the `.glb` files.

---

## 🚀 Installation & Setup

### 1- Clone the repository:

```bash
git clone <your_project_url>
```

### 2- Open the project:

Open the `3d-portfolio` folder in **Visual Studio Code**.

### 3- Add your 3D Models:

- Export your main background scene from Blender as `setup.glb` and place it in `assets/3d/`.
- Export your gallery models as `modelo1.glb`, `modelo2.glb`, and `modelo3.glb` and place them in the same folder.  
*(Make sure to check "Apply Modifiers" when exporting from Blender).*

### 4- Run the project:

Click on **"Go Live"** at the bottom right of VS Code to launch the Live Server.

---

## 🎮 Usage

- **Navigate:** Scroll down to see the different sections revealed with GSAP animations.
- **Interact:** Drag with your mouse on the background to rotate the main 3D scene. Use the scroll wheel to zoom in and out.
- **Scan Structure:** Click the "INICIAR ESCANEO ESTRUCTURAL" button to trigger the wireframe view of the scene.
- **Change Theme:** Click the `☼` or `☾` button in the navigation bar to toggle between Light and Dark mode.

---

## 📁 Project Structure

```text
/
├── index.html       # Main HTML layout & UI overlay
├── style.css        # Glassmorphism design and Light/Dark themes
├── script.js        # Three.js configuration, GLTF loading, GSAP animations
├── README.md        # Project documentation
└── assets/
    └── 3d/
        ├── setup.glb   # Main background scene
        ├── modelo1.glb # Gallery item 1
        ├── modelo2.glb # Gallery item 2
        └── modelo3.glb # Gallery item 3
```

---

## 🎥 DEMO

![Demo](./assets/portfolio_demo.gif)

---

## 👏 Credits

- **3D Modeling & Development:** [Your Name]
- **Libraries used:** Three.js, GSAP, Google Model-Viewer.
