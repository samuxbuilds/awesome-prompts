---
title: "The Unassuming Star: A Rock's Quiet Moment"
category: portraits
tags: ["nano-banana-pro"]
author: "@ProperPrompter"
author_url: "https://twitter.com/ProperPrompter"
source_url: "https://twitter.com/ProperPrompter/status/1996880688021123219"
preview: "/media/portraits/pg-1996880688021123219.webp"
---

How can something so simple speak volumes? This solitary gray rock, draped in subtle speckles, rests in serene elegance against a neutral backdrop, inviting reflection on beauty in the mundane.

## Prompt

```json
{
  "version": "0.0.1-infinite-detail",
  "task": "generate_image",
  "title": "The Rock (not Dwayne)",
  "prompt": {
    "short": "A single small gray rock on a plain neutral background, centered, boring, no drama.",
    "long": "Create an image that contains exactly one rock. The rock is unremarkable, medium-gray, matte, with subtle speckling. No moss, no crystals, no branding, no easter eggs, no surprise faces. The background is a flat neutral studio sweep with a soft shadow directly beneath the rock. The image should look like a very basic product photo. Nothing else is in the frame."
  },
  "subject": {
    "class": "rock",
    "synonyms": [
      "stone",
      "pebble-but-not-too-small",
      "mineral-aggregate"
    ],
    "subclass_candidates": [
      "igneous-generic",
      "sedimentary-generic",
      "metamorphic-generic"
    ],
    "selected_subclass_strategy": "choose-any-keep-plain",
    "taxonomy": {
      "is_rock": true,
      "is_gemstone": false,
      "is_iconic_celebrity": false
    },
    "granularity": {
      "edges": "slightly rounded",
      "surface": "matte with mild speckle",
      "micro_scratches": "subtle",
      "glossiness_0_to_1": 0.12,
      "visible_strata_0_to_1": 0.15,
      "interestingness_0_to_1": 0.01
    },
    "scale": {
      "units": "cm",
      "approx_major_axis": 8,
      "approx_minor_axis": 6,
      "approx_depth": 4,
      "apparent_size_in_frame": "fills ~15% of width"
    }
  },
  "composition": {
    "framing": "centered",
    "balance": "symmetrical",
    "rule_of_thirds_compliance": 0,
    "camera_height": "level-with-midline",
    "distance_strategy": "fit-subject-with-margin",
    "margins": {
      "top": "25%",
      "bottom": "20%",
      "left": "25%",
      "right": "25%"
    },
    "horizon_visibility": "none",
    "forbidden_angles": [
      "worm's eye",
      "bird's eye",
      "dutch tilt"
    ]
  },
  "environment": {
    "type": "studio-infinite-sweep",
    "background_color_name": "neutral-light-gray",
    "background_hex_suggestion": "#E6E6E6",
    "background_texture": "none",
    "permitted_extras": []
  },
  "lighting": {
    "intent": "boring-flat",
    "key_light": {
      "type": "softbox",
      "position": "front",
      "height": "slightly above subject",
      "spread": "wide",
      "intensity_0_to_1": 0.6
    },
    "fill_light": {
      "type": "bounce",
      "position": "near camera axis",
      "intensity_0_to_1": 0.4
    },
    "rim_light": {
      "enabled": false
    },
    "shadow": {
      "type": "soft-contact",
      "direction": "directly beneath",
      "hardness_0_to_1": 0.15,
      "length_percent_of_subject": 20
    },
    "forbidden_effects": [
      "godrays",
      "chiaroscuro",
      "lens_flares",
      "sparkles",
      "dramatic_vignette"
    ]
  },
  "camera": {
    "focal_length_mm": 50,
    "aperture_f": 8,
    "sensor": "full-frame",
    "focus_point": "rock-center",
    "focus_mode": "manual",
    "white_balance": "daylight-neutral",
    "lens_character": "unremarkable",
    "distortion_correction": "neutral"
  },
  "style": {
    "target": "boring-product-photo",
    "contrast": "neutral",
    "saturation": "neutral",
    "sharpness": "moderate",
    "grain": "none",
    "aesthetic_boringness_0_to_1": 0.98,
    "hyperrealism_0_to_1": 0
  },
  "constraints": {
    "exact_subject_count": 1,
    "must_have": [
      "one single rock",
      "soft shadow under rock"
    ],
    "must_not_have": [
      "humans",
      "animals",
      "plants",
      "text",
      "logos",
      "faces",
      "eyes",
      "arms",
      "explosions",
      "galaxies",
      "dragons",
      "moral_lessons",
      "moss",
      "crystals",
      "sand",
      "wet_surface",
      "reflections",
      "floating_rock",
      "particles",
      "dust_motes",
      "stickers",
      "Dwayne Johnson"
    ]
  },
  "output": {
    "width_px": 2048,
    "height_px": 1536,
    "dpi": 300,
    "color_space": "sRGB",
    "format": "PNG",
    "background_alpha_0_to_1": 1,
    "upscaler": "none"
  },
  "sampler_settings": {
    "sampler": "euler",
    "steps": 30,
    "cfg_scale": 3,
    "seed": 424242,
    "tiling": false,
    "restore_faces": false
  },
  "negative_prompt": "anything that is not a single boring gray rock on a plain neutral background. remove lettering, patterns, elaborate textures, crystals, moss, plants, animals, people, water, stars, smoke, fire, action, cinematic lighting, dramatic shadows, vignettes, lens flares, chromatic aberration, dust specks, UI, text, captions, borders, reflections, glitter.",
  "postprocessing": {
    "operations": [
      {
        "op": "none",
        "reason": "keep it plain"
      }
    ],
    "sharpen_amount": 0,
    "vignette_amount": 0,
    "saturation_boost": 0
  },
  "determinism": {
    "attempts": 1,
    "stop_conditions": [
      "exactly_one_rock_detected",
      "no_text_detected",
      "background_uniformity_above_95_percent"
    ]
  },
  "quality_assurance": {
    "acceptance_tests": [
      "count_distinct_rocks_equals_1",
      "background_uniform_within_delta_5_percent",
      "shadow_present_and_centered_under_subject",
      "no_text_or_symbols_detected",
      "no_living_things_detected"
    ],
    "fallback_if_failed": "reroll_seed_and_reduce_cfg_to_2.5"
  },
  "redundant_restatement_for_emphasis": {
    "please_make": "one plain rock",
    "please_avoid": "anything exciting",
    "summary_in_plain_english": "It is just a rock."
  },
  "metadata": {
    "notes": "If you see anything interesting, you have gone too far."
  }
}
```

## Source

- [Original Post](https://twitter.com/ProperPrompter/status/1996880688021123219)

## Example Output

![The Unassuming Star: A Rock's Quiet Moment](/media/portraits/pg-1996880688021123219.webp)
