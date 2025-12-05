import { writeFile } from "fs/promises";
import { join } from "path";

const THUMBNAILS_DIR = join(import.meta.dir, "..", "prompts", "thumbnails");

const styles = [
  "bold", "minimalist", "cinematic", "retro", "neon", "vintage", "modern", "grunge",
  "elegant", "playful", "dramatic", "clean", "artistic", "professional", "creative",
  "dynamic", "vibrant", "muted", "dark", "bright", "colorful", "monochrome", "gradient",
  "flat", "3d", "isometric", "hand-drawn", "sketch", "watercolor", "oil-painting"
];

const subjects = [
  "gaming", "tech-review", "cooking", "travel", "fitness", "music", "podcast", "tutorial",
  "vlog", "reaction", "unboxing", "review", "challenge", "storytime", "makeup", "fashion",
  "diy", "art", "photography", "coding", "science", "history", "documentary", "comedy",
  "drama", "horror", "mystery", "romance", "action", "adventure"
];

const adjectives = [
  "stunning", "eye-catching", "viral", "clickable", "engaging", "professional", "unique",
  "creative", "bold", "striking", "memorable", "powerful", "captivating", "intriguing",
  "mysterious", "exciting", "dynamic", "fresh", "modern", "classic"
];

const elements = [
  "typography", "portraits", "icons", "gradients", "patterns", "textures", "borders",
  "shadows", "highlights", "contrast", "composition", "focal-point", "color-scheme",
  "negative-space", "symmetry", "asymmetry", "depth", "layers", "effects", "filters"
];

const tags = [
  "youtube", "thumbnail", "design", "viral", "clickbait", "attention", "views",
  "engagement", "ctr", "branding", "visual", "graphic", "digital", "social-media",
  "content", "creator", "influencer", "marketing", "promotion", "growth"
];

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateLoremContent(): string {
  const paragraphs = [
    "Create a visually stunning thumbnail that immediately captures viewer attention and drives click-through rates. The design should incorporate bold visual elements with strategic color placement to ensure maximum visibility across all device sizes and screen resolutions.",
    "Focus on creating a strong focal point using contrast and strategic element placement. The thumbnail should communicate the video content within milliseconds of viewing while maintaining brand consistency and professional quality standards.",
    "Implement advanced design principles including the rule of thirds, golden ratio composition, and color psychology to maximize emotional impact. Consider the thumbnail's appearance at various sizes from mobile to desktop displays.",
    "Use high-contrast color combinations that pop against YouTube's white background. Incorporate readable text with appropriate font weights and sizes that remain legible even at smaller thumbnail dimensions.",
    "Apply professional retouching techniques to any portraits or product shots. Ensure proper lighting simulation, shadow consistency, and color grading that aligns with the overall mood and tone of the content.",
    "Consider the psychological impact of color choices and how they influence viewer behavior. Warm colors create urgency while cool colors convey trust and professionalism. Balance these elements strategically.",
    "Integrate subtle visual cues that guide the viewer's eye through the composition. Use leading lines, implied motion, and strategic negative space to create visual flow and hierarchy within the design.",
    "Optimize the thumbnail for both light and dark mode viewing experiences. Test the design across multiple devices and screen types to ensure consistent visual impact and brand recognition.",
    "Include elements that create curiosity gaps and emotional triggers without resorting to misleading imagery. Authentic representation builds long-term audience trust and channel credibility.",
    "Layer multiple design elements with appropriate depth and dimensionality. Use shadows, glows, and subtle gradients to create visual interest without overwhelming the core message.",
  ];
  
  // Pick 3-5 random paragraphs to ensure 500+ characters
  const selectedParagraphs = getRandomItems(paragraphs, 3 + Math.floor(Math.random() * 3));
  return selectedParagraphs.join("\n\n");
}

async function generatePrompts() {
  console.log("Generating 150 thumbnail prompts...\n");
  
  for (let i = 1; i <= 150; i++) {
    const style = styles[Math.floor(Math.random() * styles.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const element = elements[Math.floor(Math.random() * elements.length)];
    
    const title = `${adj.charAt(0).toUpperCase() + adj.slice(1)} ${style.charAt(0).toUpperCase() + style.slice(1)} ${subject.charAt(0).toUpperCase() + subject.slice(1)} Thumbnail #${i}`;
    
    const promptTags = getRandomItems(tags, 4 + Math.floor(Math.random() * 3));
    promptTags.push(style, subject);
    
    const content = generateLoremContent();
    
    const markdown = `---
title: "${title}"
category: "thumbnails"
tags: [${promptTags.map(t => `"${t}"`).join(", ")}]
author: "@designer${(i % 20) + 1}"
---

# ${title}

${content}

## Key Design Elements

- **Style**: ${style.charAt(0).toUpperCase() + style.slice(1)} design approach
- **Subject**: Optimized for ${subject} content
- **Focus**: Strong ${element} implementation
- **Goal**: Maximize viewer engagement and CTR

## Technical Specifications

- Resolution: 1280x720 pixels minimum
- Format: PNG or JPEG with high quality compression
- Color Space: sRGB for web compatibility
- Text: Maximum 3-4 words for readability

## Implementation Notes

This thumbnail design leverages ${style} aesthetics combined with proven ${subject} content patterns. The ${element} serves as the primary visual anchor, drawing immediate attention while supporting the overall narrative of the content. Consider A/B testing variations to optimize performance metrics.
`;

    const filename = `${style}-${subject}-thumbnail-${i.toString().padStart(3, '0')}.md`;
    const filepath = join(THUMBNAILS_DIR, filename);
    
    await writeFile(filepath, markdown);
    
    if (i % 25 === 0) {
      console.log(`  Generated ${i}/150 prompts...`);
    }
  }
  
  console.log("\nDone! Generated 150 thumbnail prompts.");
}

generatePrompts();
