# NIBBLO — Chocolate Millet Crunch Bites 🍫🌾
> **Premium D2C Food Product Landing Page**  
> *"The Smarter Snack — 100% Baked Millets Enrobed in Rich Dark Chocolate"*

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL2-black.svg)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-green.svg)](https://greensock.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-orange.svg)](https://lenis.darkroom.engineering/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)

---

## 🌟 Project Overview
This repository contains the interactive direct-to-consumer landing page for **NIBBLO**, a modern healthy snacking brand. The site delivers a high-impact, visual storytelling experience combining 3D WebGL product presentation, smooth virtual scrolling, and orchestrated micro-interactions.

For in-depth architectural details, see [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md).

---

## 🚀 Key Features & Sections

1. **Hero Section (`HeroSection.jsx`)**: Immersive 3D center product (`product.glb`), dynamic lighting, and an animated waving silk flag bearing the official NIBBLO logo.
2. **Brand Story & Why We Exist (`WhyWeExist.jsx`)**: Scroll-pinned horizontal stream of physically tilted 3D cards illustrating the journey from junk snacks to ancient super-grains.
3. **Product Showcase (`BiteBuilder.jsx`)**: 5-step interactive layer-by-layer deconstruction of the chocolate millet bite.
4. **Nutrition & Ingredients (`NutritionFacts.jsx`)**: Clean nutritional breakdown with high-res pouch and bowl macro renders.
5. **Why NIBBLO (`MarqueeTicker.jsx`)**: High-velocity interactive marquee highlighting clean label benefits.
6. **Lifestyle Moments (`LifestyleMoments.jsx`)**: Curtain-wipe photo experience showcasing everyday snacking scenarios across all ages.
7. **Interactive Final CTA & Footer (`Footer.jsx`)**: Final checkout call-to-action with an interactive **3D Crunch Bite Rain** easter egg.

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Bundler**: Vite 6
- **3D Graphics**: Three.js (WebGL2, GLTF/GLB Loader, Draco, Scissor Viewport Rendering)
- **Animation**: GSAP 3, ScrollTrigger, SplitText, CustomEase
- **Smooth Scrolling**: Lenis
- **Styling**: Modern CSS variables, Tailwind CSS, Clamp typography

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd nibblo

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
$env:NODE_OPTIONS="--max-old-space-size=4096"; npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License & Assessment
Developed for the **Premium Food Product Landing Page Assessment**. All brand concepts, 3D implementations, and custom animations are proprietary to NIBBLO.
