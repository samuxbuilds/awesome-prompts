---
title: "Capturing Connection: A Real-Life FaceTime Moment"
category: portraits
tags: ["light","nano-banana-pro"]
author: "@_imfaizan18"
author_url: "https://twitter.com/_imfaizan18"
source_url: "https://twitter.com/_imfaizan18/status/1996574990502674700"
preview: "/images/portraits/pg-1996574990502674700.jpg"
---

A cozy bedroom scene unfolds as a couple shares a warm, intimate video call. Dust on the iPad screen adds authenticity, while soft fairy lights create a dreamy ambiance.

## Prompt

```json
{
  "task_configuration": {
    "task_type": "screen_simulation_photorealism",
    "target_model": "SDXL_1.0_Refiner",
    "aspect_ratio": "4:3",
    "resolution": {
      "width": 1536,
      "height": 1152
    }
  },
  "visual_hierarchy": {
    "layer_1_physical_macro": {
      "camera_angle": "Eye-level, straight-on tablet view",
      "framing": "iPad screen covering 94% frame",
      "surface_imperfections": [
        "dust near bezel edges",
        "matte reflection from room light",
        "finger tap smudges",
        "soft refraction shimmer"
      ],
      "foreground_anchor": "Desk edge visible along bottom"
    },
    "layer_2_digital_interface": {
      "theme": "FaceTime Dark",
      "window_layout": {
        "main_window": "Large video call view (couple)",
        "floating_pip": "Small local preview window top-right"
      }
    },
    "layer_3_nested_subject_content": {
      "context": "Inside the FaceTime video feed",
      "environment": "Bedroom fairy-light ambience, blurred background bokeh",
      "lighting_simulation": "Warm tungsten + soft screen glow blend",
      "subjects": {
        "subject_a_guy": {
          "identity_target": "reference_image_male.jpg",
          "action": "Waving casually at camera",
          "position": "Left-center"
        },
        "subject_b_girl": {
          "identity_target": "reference_image_female.jpg",
          "action": "Leaning on his shoulder, smiling gently",
          "position": "Right-center"
        }
      }
    }
  },
  "prompt_assembly": {
    "positive_prompt": "Hyper-realistic iPad screen on a desk. Dust, matte reflections, natural smudges. FaceTime interface visible. A couple appears in warm, intimate lighting inside the video call. Cinematic softness, real-lens depth, raw unedited realism.",
    "negative_prompt": "cartoon, CGI, oversharp, plastic skin, studio light, vector shapes, clean-perfect display"
  },
  "identity_preservation_settings": {
    "strictness_level": "CRITICAL",
    "methodology": {
      "face_restoration": false,
      "control_net_stack": [
        {
          "unit": "ControlNet_Tile",
          "weight": 0.35
        },
        {
          "unit": "IP-Adapter_FaceID_Plus",
          "weight": 0.96,
          "region_mask": "FaceTime main window"
        }
      ]
    }
  },
  "rendering_parameters": {
    "sampler": "DPM++ 3M SDE Karras",
    "steps": 40,
    "cfg_scale": 5.4,
    "denoising_strength": 0.31
  }
}
```

## Source

- [Original Post](https://twitter.com/_imfaizan18/status/1996574990502674700)

## Example Output

![Capturing Connection: A Real-Life FaceTime Moment](/images/portraits/pg-1996574990502674700.jpg)
