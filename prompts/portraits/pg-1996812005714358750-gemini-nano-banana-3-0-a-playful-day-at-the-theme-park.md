---
title: "Gemini Nano Banana 3.0: A Playful Day at the Theme Park"
category: portraits
tags: ["nano-banana-pro"]
author: "[@rowanali09](https://x.com/rowanali09)"
author_url: "https://twitter.com/rowanali09"
source_url: "https://twitter.com/rowanali09/status/1996812005714358750"
preview: "/media/portraits/pg-1996812005714358750.webp"
---

Under the warm golden glow of the afternoon sun, a young woman strikes a playful pose in a whimsical theme park, surrounded by dreamy castle architecture and lush greenery.

## Prompt

```json
{
  "render_simulation_context": {
    "project_id": "THEME_PARK_PLAYFUL_001",
    "simulation_type": "Photorealistic_Portrait_Composite",
    "reference_constraint": {
      "input_source": "ATTACHED_USER_PHOTO",
      "mapping_method": "Feature_Preservation_Strict",
      "target_features": [
        "Eye_Geometry",
        "Nose_Structure",
        "Jawline",
        "Skin_Pigmentation"
      ]
    }
  },
  "optical_telemetry": {
    "device_profile": {
      "body": "Canon EOS R6",
      "sensor_format": "Full Frame (35mm)",
      "color_science": "Canon Neutral"
    },
    "lens_profile": {
      "focal_length": "50mm",
      "aperture_value": "f/2.0",
      "focus_distance": "1.2m (Subject Focus)",
      "bokeh_character": "Smooth_Gaussian"
    },
    "exposure_triangle": {
      "shutter_speed": "1/400",
      "iso": "Automatic (Low Noise)",
      "exposure_compensation": "+0.2 EV (Slight Backlight Correction)"
    }
  },
  "scene_geometry_layers": {
    "layer_0_background_infinity": {
      "type": "HDRI_Environment",
      "components": [
        "Theme_Park_Castle (Fantasy Architecture)",
        "Lush_Greenery (Blurred Depth)",
        "Blue_Sky (Soft Clouds)",
        "Crowd_Elements (Lightly Blurred)"
      ]
    },
    "layer_1_foreground_props": {
      "structure": "Pathway / Railings",
      "materials": [
        {
          "name": "Railing",
          "type": "Metal",
          "properties": "High_Reflectivity, Smooth Finish"
        },
        {
          "name": "Bench",
          "type": "Painted_Wood",
          "properties": "Soft Texture, Pastel Hues"
        }
      ]
    },
    "layer_2_subject_instance": {
      "pose_matrix": "Half-Body Standing Playful Pose",
      "anatomy": {
        "hair_simulation": {
          "style": "Long_Wavy",
          "physics": "Free_Fall",
          "interaction": "Rim Light Backlighting"
        },
        "skin_shader": {
          "type": "Subsurface_Scattering_Human",
          "tone": "Warm_Golden"
        }
      },
      "wardrobe_mesh": {
        "item": "Knitted Cardigan + Ruffled Mini-Skirt",
        "color_hex": "#FFC0CB (Light Pink) / #FFFFFF (White)",
        "material": "Knitted Wool / Cotton Blend",
        "details": [
          "Pom-Poms",
          "Soft Ruffles",
          "Animal-Themed Hat",
          "Pastel Novelty Bag"
        ]
      }
    }
  },
  "lighting_physics_engine": {
    "sun_position": {
      "elevation": "Medium (Afternoon Sun)",
      "azimuth": "Side Oblique (Soft Backlighting)"
    },
    "atmospheric_volumetrics": {
      "density": "Low",
      "haze_color": "Golden Warm",
      "effect": "Subtle Glow on Hair and Shoulders"
    },
    "light_transport_bounces": {
      "primary": "Direct Sunlight (Rim Highlight)",
      "secondary": "Ambient Sky Bounce (Soft Fill on Face)"
    }
  },
  "prompt_compilation_string": "Hyper-realistic half-body portrait using face reference [INPUT_PHOTO]. Young woman poses playfully outdoors at a theme park, 50mm, f/2.0. Background: castle, blurred greenery, soft clouds. Lighting: warm afternoon side backlight creating rim glow on wavy hair. Outfit: light pink knitted cardigan with pom-poms, white ruffled mini-skirt, animal-themed hat, pastel novelty bag. Mood: Sweet, playful, whimsical. 8k, highly detailed texture, Canon R6 color science."
}
```

## Source

- [Original Post](https://twitter.com/rowanali09/status/1996812005714358750)

## Example Output

![Gemini Nano Banana 3.0: A Playful Day at the Theme Park](/media/portraits/pg-1996812005714358750.webp)
