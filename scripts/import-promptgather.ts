import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const API_BASE = "https://promptgather.io/prompts/nano-banana-pro";
const PROMPTS_DIR = join(import.meta.dir, "..", "prompts");
const IMAGES_DIR = join(import.meta.dir, "..", "public", "images");
const TOTAL_PAGES = 66;

// Category detection keywords
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "3d": ["3d", "chibi", "figure", "miniature", "funko", "lego", "diorama", "clay", "voxel", "bobblehead", "keychain", "pendant", "capsule", "globe", "crystal ball", "action figure", "toy", "isometric", "polaroid"],
  portraits: ["selfie", "portrait", "photo", "person", "woman", "man", "girl", "boy", "face", "headshot", "model", "beauty", "fashion"],
  creative: ["art", "illustration", "style", "anime", "cartoon", "painting", "sketch", "watercolor", "oil", "drawing", "caricature", "ink"],
  posters: ["poster", "thumbnail", "banner", "ad", "marketing", "cover", "promotional", "flyer"],
  icons: ["icon", "logo", "emoji", "symbol", "app icon"],
};

interface PromptData {
  tweetId: string;
  twitterUrl: string;
  prompt: any;
  prompt_type: string;
  model: string;
  title: string;
  description: string;
  coverUrl: string;
  viewCount: string;
  publishedAt: string;
  images: { url: string }[];
}

function detectCategory(title: string, description: string, prompt: any): string {
  const text = `${title} ${description} ${JSON.stringify(prompt)}`.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  
  return "creative"; // Default category
}

function extractTags(title: string, description: string, prompt: any): string[] {
  const tags = new Set<string>();
  const text = `${title} ${description}`.toLowerCase();
  
  // Common tag keywords to look for
  const tagKeywords = [
    "3d", "chibi", "anime", "realistic", "cartoon", "portrait", "selfie",
    "illustration", "art", "miniature", "cute", "vintage", "modern",
    "fantasy", "sci-fi", "nature", "urban", "fashion", "food", "travel",
    "minimal", "colorful", "dark", "light", "neon", "pastel", "vibrant",
    "sketch", "watercolor", "oil", "digital", "photorealistic"
  ];
  
  for (const keyword of tagKeywords) {
    if (text.includes(keyword)) {
      tags.add(keyword);
    }
  }
  
  // Add nano-banana-pro tag
  tags.add("nano-banana-pro");
  
  return Array.from(tags).slice(0, 8); // Max 8 tags
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 60);
}

function extractTwitterHandle(url: string): string {
  const match = url.match(/twitter\.com\/([^/]+)/);
  return match ? `@${match[1]}` : "Unknown";
}

function formatPromptContent(prompt: any, promptType: string): string {
  if (promptType === "json" && typeof prompt === "object") {
    // Try to extract the main prompt text
    if (prompt.generation_parameters?.prompt) {
      return prompt.generation_parameters.prompt;
    }
    // Format the JSON nicely
    return "```json\n" + JSON.stringify(prompt, null, 2) + "\n```";
  }
  return String(prompt);
}

async function downloadImage(url: string, destPath: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) return false;
    
    const buffer = await response.arrayBuffer();
    writeFileSync(destPath, Buffer.from(buffer));
    return true;
  } catch (error) {
    console.error(`Failed to download image: ${url}`, error);
    return false;
  }
}

async function fetchPage(page: number): Promise<PromptData[]> {
  try {
    const response = await fetch(`${API_BASE}/${page}`, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "content-type": "application/json",
      },
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch page ${page}: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching page ${page}:`, error);
    return [];
  }
}

async function processPrompt(promptData: PromptData): Promise<boolean> {
  const { tweetId, twitterUrl, prompt, prompt_type, title, description, coverUrl, images } = promptData;
  
  // Detect category
  const category = detectCategory(title, description, prompt);
  const tags = extractTags(title, description, prompt);
  const slug = slugify(title);
  const filename = `pg-${tweetId}-${slug}.md`;
  
  // Ensure directories exist
  const categoryPromptsDir = join(PROMPTS_DIR, category);
  const categoryImagesDir = join(IMAGES_DIR, category);
  
  if (!existsSync(categoryPromptsDir)) {
    mkdirSync(categoryPromptsDir, { recursive: true });
  }
  if (!existsSync(categoryImagesDir)) {
    mkdirSync(categoryImagesDir, { recursive: true });
  }
  
  // Check if already exists
  const promptPath = join(categoryPromptsDir, filename);
  if (existsSync(promptPath)) {
    console.log(`Skipping existing: ${filename}`);
    return false;
  }
  
  // Download image
  const imageUrl = coverUrl || images?.[0]?.url;
  let previewPath = "";
  
  if (imageUrl) {
    const ext = imageUrl.includes(".png") ? "png" : "jpg";
    const imageName = `pg-${tweetId}.${ext}`;
    const localImagePath = join(categoryImagesDir, imageName);
    
    if (await downloadImage(imageUrl, localImagePath)) {
      previewPath = `/images/${category}/${imageName}`;
    }
  }
  
  // Extract author info
  const author = extractTwitterHandle(twitterUrl);
  const authorUrl = twitterUrl.split("/status")[0];
  
  // Format prompt content
  const promptContent = formatPromptContent(prompt, prompt_type);
  
  // Generate markdown
  const markdown = `---
title: "${title.replace(/"/g, '\\"')}"
category: ${category}
tags: ${JSON.stringify(tags)}
author: "${author}"
author_url: "${authorUrl}"
source_url: "${twitterUrl}"
preview: "${previewPath}"
---

${description}

## Prompt

${promptContent}

## Source

- [Original Post](${twitterUrl})

## Example Output

${previewPath ? `![${title}](${previewPath})` : "*No preview available*"}
`;

  writeFileSync(promptPath, markdown);
  console.log(`Created: ${category}/${filename}`);
  return true;
}

async function main() {
  console.log("🚀 Starting PromptGather.io import...");
  console.log(`📦 Fetching ${TOTAL_PAGES} pages...`);
  
  let totalImported = 0;
  let totalSkipped = 0;
  
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    console.log(`\n📄 Fetching page ${page}/${TOTAL_PAGES}...`);
    
    const prompts = await fetchPage(page);
    
    for (const promptData of prompts) {
      const imported = await processPrompt(promptData);
      if (imported) {
        totalImported++;
      } else {
        totalSkipped++;
      }
    }
    
    // Small delay to be nice to the API
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log("\n✅ Import complete!");
  console.log(`📊 Imported: ${totalImported} | Skipped: ${totalSkipped}`);
}

main().catch(console.error);
