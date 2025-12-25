---
title: Awesome Prompts Motion Video
category: motion
tags:
  - neobrutalist
  - gsap
  - video
  - launch
  - 3d-text
  - motion-video
  - 3d
  - chibi
  - neon
  - minimalist
  - portrait
  - dark
  - colorful
author: '[@samuxbuilds](https://x.com/samuxbuilds)'
previewVideo: /media/motion/awesome-prompts.webm
---

A 12-second launch video featuring a 3D logo reveal with cycling images, category card showcase, and call-to-action ending. Uses neobrutalist design with bold shadows and vibrant colors.

## Video Specification

```json
{
  "project": {
    "name": "Awesome Prompts Commercial",
    "duration": "12s",
    "resolution": "1280x720",
    "fps": 30
  },
  "style": {
    "theme": "Neobrutalist Light Mode",
    "background": "#f0f0f0",
    "primary_color": "#9333ea",
    "secondary_color": "#db2777",
    "border_color": "#000000",
    "border_width": "3px",
    "shadow": "8px 8px 0px #000000",
    "font": "Outfit Black"
  },
  "assets": {
    "images": [
      "https://awesomeprompts.xyz/media/3d/3d-chibi-chinese-wedding-scene.webp",
      "https://awesomeprompts.xyz/media/3d/3d-chibi-proposal-scene.webp",
      "https://awesomeprompts.xyz/media/3d/nb-3d-chibi-style-miniature-brand-store.webp",
      "https://awesomeprompts.xyz/media/3d/funko-pop-figure-creation.webp",
      "https://awesomeprompts.xyz/media/3d/3d-couple-jewelry-box-figurine.webp",
      "https://awesomeprompts.xyz/media/3d/3d-papercraft-pop-up-book.webp",
      "https://awesomeprompts.xyz/media/creative/pg-1992650501402542303.webp",
      "https://awesomeprompts.xyz/media/portraits/pg-1991552050342293723.webp",
      "https://awesomeprompts.xyz/media/3d/pg-1995190286775881780.webp",
      "https://awesomeprompts.xyz/media/3d/pg-1991831875573477640.webp",
      "https://awesomeprompts.xyz/media/3d/pg-1995263816842522827.webp",
      "https://awesomeprompts.xyz/media/3d/pg-1994087836191170895.webp",
      "https://awesomeprompts.xyz/media/3d/pg-1993949134618030432.webp",
      "https://awesomeprompts.xyz/media/3d/pg-1996032358408224869.webp",
      "https://awesomeprompts.xyz/media/3d/pg-1995579063923040295.webp",
      "https://awesomeprompts.xyz/media/3d/pg-1995344587750072496.webp",
      "https://awesomeprompts.xyz/media/icons/minimalist-outline-icons.webp",
      "https://awesomeprompts.xyz/media/portraits/pg-1992863330726203428.webp",
      "https://awesomeprompts.xyz/media/posters/event-poster-generator.webp"
    ]
  },
  "scenes": [
    {
      "id": 1,
      "name": "3D Logo Reveal",
      "start": "0s",
      "end": "4s",
      "elements": [
        {
          "type": "text_3d",
          "content": "AWESOME\nPROMPTS",
          "font_size": "170px",
          "font_weight": "900",
          "text_color": "transparent",
          "stroke": "3px #000000",
          "extrusion_depth": "25 layers",
          "extrusion_colors": ["#7e22ce", "#be185d"],
          "line_height": "0.75"
        },
        {
          "type": "image_mask",
          "target": "text_3d front face",
          "images": "cycle through all 19 images",
          "cycle_speed": "10fps",
          "effect": "images visible inside letter shapes"
        }
      ],
      "animation": {
        "rotation_y": { "from": "-30deg", "to": "30deg" },
        "rotation_x": { "from": "10deg", "to": "-10deg" },
        "scale": { "from": "0.8", "to": "1.1" },
        "easing": "power1.inOut"
      },
      "audio": {
        "type": "snap_hit",
        "trigger": "every 5 image cycles"
      }
    },
    {
      "id": 2,
      "name": "Category Cards",
      "start": "4s",
      "end": "10s",
      "loop_count": 6,
      "duration_per_card": "1s",
      "categories": ["3D ART", "CREATIVE", "ICONS", "PORTRAITS", "POSTERS", "THUMBS"],
      "elements": [
        {
          "type": "card",
          "width": "500px",
          "height": "600px",
          "background": "#ffffff",
          "border": "3px solid #000000",
          "shadow": "8px 8px 0 0 #000000",
          "children": [
            {
              "type": "header",
              "height": "70px",
              "background": "alternates #9333ea / #db2777",
              "content": "category name",
              "badge": "Gemini / ChatGPT"
            },
            {
              "type": "image_box",
              "background_size": "contain",
              "background_color": "#eeeeee",
              "image": "one image per category from assets",
              "overlay_buttons": ["SWAP IMG", "COPY"]
            }
          ]
        },
        {
          "type": "floating_tags",
          "position": "around card",
          "style": {
            "background": "#ffffff",
            "border": "2px solid #000000",
            "shadow": "4px 4px 0 #000000",
            "border_radius": "99px"
          },
          "content": ["Style: Cinematic", "Character: Hero", "Lighting: Neon", "Pose: Dynamic"],
          "animation": "float up/down 20px, yoyo, 2s duration"
        }
      ],
      "animation": {
        "card_enter": { "scale": { "from": "0", "to": "1" }, "rotation": { "from": "10deg", "to": "0" }, "easing": "back.out(1.5)", "duration": "0.4s" }
      },
      "audio": {
        "type": "bass_hit",
        "trigger": "each card transition"
      }
    },
    {
      "id": 3,
      "name": "Call to Action",
      "start": "10s",
      "end": "12s",
      "elements": [
        {
          "type": "text",
          "content": "START CREATING",
          "font_size": "100px",
          "font_weight": "900",
          "color": "#000000",
          "text_shadow": "4px 4px 0 #9333ea"
        },
        {
          "type": "button",
          "content": "AWESOMEPROMPTS.XYZ",
          "font_size": "30px",
          "background": "#ffffff",
          "border": "2px solid #000000",
          "shadow": "6px 6px 0 #000000",
          "text_color": "#db2777"
        }
      ],
      "animation": {
        "logo": { "y": { "from": "50px", "to": "0" }, "opacity": { "from": "0", "to": "1" }, "duration": "0.5s", "easing": "back.out(2)" },
        "button": { "scale": { "from": "0", "to": "1" }, "duration": "0.4s", "easing": "elastic.out(1, 0.5)" }
      },
      "audio": {
        "type": "snap_hit",
        "count": 1
      }
    }
  ],
  "global_elements": {
    "noise_overlay": {
      "type": "grain texture",
      "opacity": "0.6",
      "blend_mode": "multiply"
    }
  }
}
```

## Usage

This specification can be used with:
- **HTML5 Canvas + GSAP** - Render directly in browser
- **Remotion** - React-based video rendering
- **Custom video renderers** - Parse JSON and generate programmatically

## Rendering Tips

1. Use `Outfit` font from Google Fonts for the neobrutalist look
2. The 3D text effect requires layered divs with offset positioning
3. Image cycling uses CSS `clip-path` or `mask-image` for text masking
4. Sound effects sync with visual transitions for maximum impact

## Source

- [Original Post](https://x.com/samuxbuilds/status/1998050116356428094)
- [Live Demo](https://codepen.io/samuxbuilds/full/vEGvJjE)
