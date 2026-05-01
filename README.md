# 🚀 Futuristic 3D Developer Portfolio

This is a modern, interactive, and futuristic web portfolio designed to showcase 3D skills, specifically customized to load a Blender `.glb` scene using WebGL and Three.js. 

It fulfills all the requirements for the final presentation, including semantic HTML, modern CSS with a dark theme, and an interactive 3D scene.

## 🌟 Features

- **Interactive 3D Scene**: Explore the developer's custom Blender setup directly in the browser (supports rotating, zooming, and panning).
- **Three.js Integration**: Fully custom WebGL implementation with lighting, shadows, and interactive particle effects.
- **Glassmorphism UI**: A futuristic "Cyberpunk" aesthetic with glowing neon accents.
- **Dynamic Interactions**: "Hack Lights" button that alters the scene's mood and particle colors.
- **Scroll Animations**: Smooth GSAP scroll-triggered reveals for all sections.
- **Fully Responsive**: Optimized for desktop and mobile devices.

## 🛠️ Project Structure

```text
/
├── index.html       # Semantic HTML layout
├── style.css        # Futuristic CSS (Flexbox/Grid, Dark Mode)
├── script.js        # Three.js configuration, GLTF loading, GSAP animations
├── README.md        # Project documentation
└── assets/
    └── 3d/
        └── setup.glb # YOUR exported Blender model goes here!
```

## 🎮 How to Add Your 3D Model

1. Export your Blender scene as a `GLB` or `GLTF` format (make sure to include textures).
2. Name the file exactly **`setup.glb`**.
3. Place the file inside the `assets/3d/` folder (create the folder if it doesn't exist yet).
4. Refresh your browser, and the placeholder cube will automatically be replaced by your epic 3D setup!

## 🎓 Academic Requirements Checklist

- [x] Semantic HTML structure (Name, avatar, about, skills, projects, contact).
- [x] 3D Scene integration (Three.js with GLTFLoader).
- [x] Modern CSS (Flexbox/Grid, Dark Mode, Responsiveness).
- [x] JavaScript Interactivity (Button to change lights, particle system).
- [ ] 3D Model created by the student (Your job in Blender!).
- [ ] 4 Git commits on different days (Follow the instructions below).
- [ ] GitHub Pages Publication (Follow the instructions below).

---

## 📌 Instructions for the Student (Very Important)

### 1. How to make the 4 commits on different days

You are required to have at least 4 commits made on 4 different days. Here is a suggested plan on how to divide your work:

**Day 1: Initial Setup**
```bash
git init
git add index.html style.css script.js README.md
git commit -m "Initial commit: basic HTML, CSS, and Three.js setup"
```

**Day 2: Refinements and Content**
*Change some texts in `index.html` to match your personal info.*
```bash
git add index.html
git commit -m "Update portfolio content and personal info"
```

**Day 3: Add the 3D Model**
*Export your model from Blender, put it in `assets/3d/setup.glb`.*
```bash
git add assets/
git commit -m "Add exported Blender 3D setup model"
```

**Day 4: Final Polish**
*Make sure everything looks good. Maybe change a color in `style.css`.*
```bash
git add style.css
git commit -m "Final polish and CSS tweaks for presentation"
```

*(Note: Push all this to your GitHub repository by adding the remote and doing `git push -u origin main`)*

### 2. How to publish using GitHub Pages

Since this project uses vanilla HTML/CSS/JS without bundlers, deploying is extremely easy!

1. Go to your repository on **GitHub**.
2. Click on the **Settings** tab (the gear icon near the top right of the repo).
3. On the left sidebar, scroll down and click on **Pages**.
4. Under the **"Build and deployment"** section:
   - Source: `Deploy from a branch`
   - Branch: Select `main` (or `master`) and folder `/ (root)`.
5. Click **Save**.
6. Wait 1-2 minutes. GitHub will provide you with a live URL at the top of the Pages settings! (e.g., `https://yourusername.github.io/your-repo-name/`).

---
> *Portfolio dynamically generated to help you secure that A+ grade!*
