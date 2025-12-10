---
title: "Coca-Cola HTML Motion Video"
category: motion
tags: ["html", "css", "javascript", "3d", "threejs", "branding", "coca-cola", "gsap", "audio"]
author: "[@samuxbuilds](https://x.com/samuxbuilds)"

previewVideo: "/media/motion/coca-cola-motion.webm"
---

Create a cinematic, high-energy **brand motion video inspired by Coca-Cola** using **HTML, CSS, and JavaScript**, optimized for web playback.

## Objective

Create a cinematic, high-energy **brand motion video inspired by Coca-Cola** using **Three.js and GSAP**, optimized for web playback. The scene should feature a realistic 3D can with droplets, dynamic lighting, and punchy synchronized audio. **The animation must loop seamlessly.**

## Tech Stack

* HTML5 + CSS3 (ES Modules)
* **Three.js** (WebGL Rendering)
* **GSAP** (Animation Timeline)
* **Web Audio API** (Procedural Music & SFX)
* **Environment Maps** (HDRI for realistic reflections)

## Visual Style

* Iconic **Coca-Cola red & white** palette
* **Metallic Aluminum Material** (PBR Standard Material)
* Fizzy, carbonated liquid simulation
* Smooth cinematic lighting (Spotlights + Fill Lights)
* High contrast highlights + soft ambient glow

## Scene Breakdown

### Scene 1 — Brand Awakening

* Dark background fades into **deep Coca-Cola red**
* Subtle light sweep reveals **condensation droplets**
* Particles float like carbonation bubbles
* **SFX**: Fizz Sound

### Scene 2 — Hero Product Reveal

* 3D **Coca-Cola Can** rotates slowly (Seamless 360 loop)
* **Metallic Scale**: High metalness (0.6-0.9) with RoomEnvironment reflections
* Light reflections emphasize the aluminum sheen
* **Audio**: High-Energy Kick Drum & Bass starts

### Scene 3 — Dynamic Motion

* Can tilts, liquid inside (visualized as movement)
* Bubbles rise naturally in the background
* Camera orbit animation with easing
* **SFX**: Swoosh during camera moves

### Scene 4 — Logo & Tagline

* Camera zooms out
* **Coca-Cola logo animates in**
* Text fades in: *“Open Happiness”*
* Final soft glow + smooth reset to Scene 1
* **SFX**: Ping/Chime on Logo

## Motion & Interaction

* **Seamless Loop**: The end state must match the start state perfectly for video recording.
* **Click to Play Audio**: User interaction required for browser policy.
* **High-Quality Audio**: Procedural generation preferred for punchy, synchronized beats without external dependencies.

## Output Requirements

* Runs directly in the browser (Single HTML file preferred)
* Clean, modular HTML structure
* Minimal performance overhead
* Can be embedded into a landing page
* Loopable motion video effect (no video file)

## Implementation Tips

* Use `THREE.CylinderGeometry` for the can.
* Use `THREE.RoomEnvironment` for realistic reflections.
* Sync GSAP duration with Audio BPM (e.g., 128 BPM = ~7.5s loop for 4 bars).
* Ensure `rotation` values end exactly at `Math.PI * 2` intervals for seamless looping.
