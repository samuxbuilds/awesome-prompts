---
title: Coca-Cola HTML Motion Video
category: motion
tags:
  - html
  - css
  - javascript
  - 3d
  - threejs
  - branding
  - coca-cola
  - gsap
  - audio
  - realistic
  - minimalist
  - dark
author: '[@samuxbuilds](https://x.com/samuxbuilds)'
previewVideo: /media/motion/coca-cola-motion.webm
---

Create a cinematic, high-energy **brand motion video** for **[Brand Name]** using **HTML, CSS, and JavaScript**, optimized for web playback.

## Objective

Create a cinematic, high-energy **brand motion video** for **[Brand Name]**, featuring their core product **([Product Type: e.g., Can, Bottle, Box])**. The scene must use **Three.js** and **GSAP** for sophisticated 3D animation, featuring realistic textures, dynamic lighting, and punchy synchronized audio. **The animation must loop seamlessly.**

## Tech Stack

*   **Three.js** (WebGL Rendering)
*   **GSAP** (Animation Timeline)
*   **Web Audio API** (Procedural Music & SFX)
*   **HTML5/CSS3** (ES Modules, No external assets preferred)

## Visual Identity & Research

**Instructions for the AI:**

1.  **Analyze the Brand**: Based on the provided **[Brand Name]**, determine its official primary colors, aesthetic (e.g., minimalist, playful, luxury), and core product materials.
2.  **Apply Automatically**: Use these analyzed properties to fill in the following:
    *   **Primary Color**: The brand's dominant hex code.
    *   **Accent Color**: The brand's secondary/highlight color.
    *   **Material**: The physical material associated with the product (e.g., Brushed Aluminum for Red Bull, Matte Plastic for Logitech, Glass for Coke).
    *   **Atmosphere**: The mood that matches the brand's marketing style.

## Scene Breakdown

### Scene 1 — Brand Awakening

*   Dark background fades into the **Brand's Primary Color** atmosphere.
*   Subtle lighting reveals the silhouette of the **[Product Type]**.
*   **Particles/Effects**: Add atmospheric elements relevant to the product (e.g., steam for hot coffee, bubbles for soda, sparks for tech).
*   **Audio**: Atmosphere swell + Intro SFX.

### Scene 2 — Hero Product Reveal

*   3D **[Product Type]** rotates slowly (Seamless 360 loop).
*   **Material properties**: Accurately simulate the product's real-world material (High reliability PBR).
*   Lighting highlights the curves and branding.
*   **Audio**: High-Energy Beat (Kick + Bass) kicks in.

### Scene 3 — Dynamic Motion

*   Product tilts or moves dynamically.
*   Camera orbits with easing to show different angles.
*   Background elements (shapes, typography) echo the **Brand's Aesthetic**.
*   **Audio**: Sync swoosh SFX with camera moves.

### Scene 4 — Logo & Tagline

*   Camera pulls back.
*   **[Brand Name]** logo or typography animates in centrally.
*   Display Tagline: *" [Insert Tagline Here] "*
*   Final soft glow + smooth reset to Scene 1 state.
*   **Audio**: Brand Logo Chime/Ping.

## Technical Constraint: Seamless Loop

*   **Duration**: Exactly 4 bars of audio (e.g., 7.5s at 128 BPM).
*   **Looping**: The final frame must match the first frame perfectly.
*   **Audio**: The procedural track must loop seamlessly without clicks.

## Implementation Guide

1.  **Geometry**: Use `THREE.CylinderGeometry`, `THREE.BoxGeometry`, or `THREE.LatheGeometry` depending on the **[Product Type]**.
2.  **Texture**: Procedurally generate the label using a CanvasTexture if no image is available, using the **[Brand Colors]**.
3.  **Lighting**: Use a 3-point lighting setup (Key, Fill, Rim) colored with **[Accent Colors]**.
4.  **Reflections**: ESSENTIAL. Use `THREE.RoomEnvironment` or a PMREMGenerator to ensure the material looks realistic.
