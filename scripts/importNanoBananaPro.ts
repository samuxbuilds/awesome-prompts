import { writeFile, mkdir, readFile } from "fs/promises";
import { join } from "path";

const DEST_DIR = "/Users/muhammadkumbhare/Developer/awesome-prompts/prompts";
const README_PATH = "/tmp/nanobanana-pro-readme.md";

// Categorize based on keywords in title
function categorizePrompt(title: string): string {
  const titleLower = title.toLowerCase();
  
  // 3D/Figurines category
  if (titleLower.includes('chibi') || 
      titleLower.includes('3d') || 
      titleLower.includes('figurine') ||
      titleLower.includes('figure') ||
      titleLower.includes('funko') ||
      titleLower.includes('lego') ||
      titleLower.includes('claymation') ||
      titleLower.includes('diorama') ||
      titleLower.includes('miniature') ||
      titleLower.includes('voxel') ||
      titleLower.includes('toy')) {
    return '3d';
  }
  
  // Icons/Stickers category
  if (titleLower.includes('emoji') || 
      titleLower.includes('sticker') ||
      titleLower.includes('icon') ||
      titleLower.includes('badge') ||
      titleLower.includes('logo')) {
    return 'icons';
  }
  
  // Thumbnails/Social Media category
  if (titleLower.includes('cover') || 
      titleLower.includes('poster') || 
      titleLower.includes('advertisement') ||
      titleLower.includes('ad ') ||
      titleLower.includes('social') ||
      titleLower.includes('magazine') ||
      titleLower.includes('card')) {
    return 'thumbnails';
  }
  
  // People/Portraits category
  if (titleLower.includes('portrait') || 
      titleLower.includes('selfie') ||
      titleLower.includes('photo') ||
      titleLower.includes('headshot') ||
      titleLower.includes('person') ||
      titleLower.includes('couple') ||
      titleLower.includes('style') && titleLower.includes('shot')) {
    return 'people';
  }
  
  // Default to arts
  return 'arts';
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

// Generate tags from title and content
function generateTags(title: string, prompt: string): string[] {
  const tags: string[] = [];
  const combined = (title + ' ' + prompt).toLowerCase();
  
  const tagKeywords = [
    '3d', 'chibi', 'anime', 'cartoon', 'pixel', 'retro', 'vintage',
    'minimalist', 'realistic', 'photorealistic', 'cute', 'kawaii', 'ghibli',
    'pixar', 'manga', 'film', 'illustration', 'portrait', 'poster',
    'sticker', 'emoji', 'icon', 'logo', 'lego', 'figurine', 'diorama',
    'glass', 'chrome', 'neon', 'pastel', 'futuristic', 'cyberpunk',
    'steampunk', 'fantasy', 'wedding', 'couple', 'character', 'animal',
    'professional', 'business', 'glamour', 'fashion', 'nostalgic', 'cinematic'
  ];
  
  for (const keyword of tagKeywords) {
    if (combined.includes(keyword) && !tags.includes(keyword)) {
      tags.push(keyword);
      if (tags.length >= 5) break;
    }
  }
  
  if (tags.length === 0) tags.push('creative');
  if (tags.length === 1) tags.push('ai-art');
  
  return tags;
}

interface ParsedPrompt {
  title: string;
  description: string;
  prompt: string;
  source: string;
  imageUrl: string;
}

async function parseReadme(): Promise<ParsedPrompt[]> {
  const content = await readFile(README_PATH, 'utf-8');
  const prompts: ParsedPrompt[] = [];
  
  // Split by ### headers
  const sections = content.split(/^### /gm).slice(1); // Skip first empty part
  
  for (const section of sections) {
    const lines = section.split('\n');
    const titleLine = lines[0];
    
    // Extract title (e.g., "1.1. Hyper-Realistic Crowd Composition")
    const titleMatch = titleLine.match(/^[\d.]+\s*(.+)/);
    if (!titleMatch) continue;
    
    const title = titleMatch[1].trim();
    
    // Find description (italic text after title)
    let description = '';
    const descMatch = section.match(/\*([^*]+)\*/);
    if (descMatch) {
      description = descMatch[1].trim();
    }
    
    // Find image URL
    let imageUrl = '';
    const imgMatch = section.match(/src="([^"]+)"/);
    if (imgMatch) {
      imageUrl = imgMatch[1];
    }
    
    // Find prompt (inside code blocks)
    let prompt = '';
    const codeMatch = section.match(/```(?:text|json)?\n([\s\S]*?)```/);
    if (codeMatch) {
      prompt = codeMatch[1].trim();
    }
    
    if (!prompt) continue;
    
    // Find source
    let source = '';
    const sourceMatch = section.match(/Source:\s*\[([^\]]+)\]\(([^)]+)\)/);
    if (sourceMatch) {
      source = sourceMatch[2];
    }
    
    prompts.push({
      title,
      description,
      prompt,
      source,
      imageUrl
    });
  }
  
  return prompts;
}

async function importFromReadme() {
  console.log("Parsing awesome-nanobanana-pro README...\n");
  
  const prompts = await parseReadme();
  console.log(`Found ${prompts.length} prompts\n`);
  
  // Create category directories
  const categories = ['3d', 'arts', 'icons', 'thumbnails', 'people'];
  for (const cat of categories) {
    await mkdir(join(DEST_DIR, cat), { recursive: true });
  }
  
  const stats = { total: 0, success: 0, failed: 0 };
  const categoryCount: Record<string, number> = {};
  
  for (const p of prompts) {
    stats.total++;
    
    try {
      const category = categorizePrompt(p.title);
      categoryCount[category] = (categoryCount[category] || 0) + 1;
      
      const slug = 'nb-' + generateSlug(p.title); // prefix with nb- to avoid conflicts
      const filename = `${slug}.md`;
      const tags = generateTags(p.title, p.prompt);
      
      let content = `---
title: "${p.title.replace(/"/g, '\\"')}"
category: ${category}
tags: [${tags.map(t => `"${t}"`).join(', ')}]
author: "@nanobanana-pro"
${p.imageUrl ? `preview: "${p.imageUrl}"` : ''}
---

${p.description ? `*${p.description}*\n\n` : ''}${p.prompt}
`;
      
      if (p.source) {
        content += `\n## Source\n- [Original](${p.source})\n`;
      }
      
      if (p.imageUrl) {
        content += `\n## Example Output\n![${p.title}](${p.imageUrl})\n`;
      }
      
      const destFile = join(DEST_DIR, category, filename);
      await writeFile(destFile, content);
      
      console.log(`✓ ${p.title} -> ${category}/${filename}`);
      stats.success++;
      
    } catch (error) {
      console.error(`✗ ${p.title}: ${error}`);
      stats.failed++;
    }
  }
  
  console.log("\n=== Import Summary ===");
  console.log(`Total: ${stats.total}`);
  console.log(`Success: ${stats.success}`);
  console.log(`Failed: ${stats.failed}`);
  console.log("\nBy Category:");
  for (const [cat, count] of Object.entries(categoryCount)) {
    console.log(`  ${cat}: ${count}`);
  }
}

importFromReadme();
