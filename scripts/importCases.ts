import { readdir, readFile, writeFile, mkdir, copyFile, stat } from "fs/promises";
import { join, basename, extname } from "path";
import * as yaml from "yaml";

const SOURCE_DIR = "/Users/muhammadkumbhare/Developer/awesome-nano-banana/cases";
const DEST_DIR = "/Users/muhammadkumbhare/Developer/awesome-prompts/prompts";
const PUBLIC_DIR = "/Users/muhammadkumbhare/Developer/awesome-prompts/public/images";

interface CaseData {
  title: string;
  title_en: string;
  author: string;
  author_link: string;
  source_links: { url: string }[];
  image: string;
  alt_text_en: string;
  prompt: string;
  prompt_en: string;
  prompt_note?: string;
  prompt_note_en?: string;
  reference_note?: string;
  reference_note_en?: string;
}

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
      titleLower.includes('diorama') ||
      titleLower.includes('miniature') ||
      titleLower.includes('voxel') ||
      titleLower.includes('snow globe') ||
      titleLower.includes('capsule') ||
      titleLower.includes('matryoshka') ||
      titleLower.includes('bobble') ||
      titleLower.includes('keychain') ||
      titleLower.includes('pendant') ||
      titleLower.includes('crystal ball')) {
    return '3d';
  }
  
  // Icons/Stickers category
  if (titleLower.includes('emoji') || 
      titleLower.includes('sticker') ||
      titleLower.includes('icon') ||
      titleLower.includes('badge') ||
      titleLower.includes('pin') ||
      titleLower.includes('keycap') ||
      titleLower.includes('stamp')) {
    return 'icons';
  }
  
  // Thumbnails/Social Media category
  if (titleLower.includes('cover') || 
      titleLower.includes('poster') ||
      titleLower.includes('screenshot') ||
      titleLower.includes('instagram') ||
      titleLower.includes('social media') ||
      titleLower.includes('xiaohongshu') ||
      titleLower.includes('magazine') ||
      titleLower.includes('business card') ||
      titleLower.includes('trading card') ||
      titleLower.includes('game cover') ||
      titleLower.includes('forecast') ||
      titleLower.includes('treasure map') ||
      titleLower.includes('tweet')) {
    return 'thumbnails';
  }
  
  // People/Portraits category
  if (titleLower.includes('portrait') || 
      titleLower.includes('selfie') ||
      titleLower.includes('photo') ||
      titleLower.includes('silhouette') ||
      titleLower.includes('double exposure') ||
      titleLower.includes('anime figure') ||
      titleLower.includes('action figure') ||
      titleLower.includes('character card')) {
    return 'people';
  }
  
  // Default to arts for illustrations, styles, effects
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
    'minimalist', 'realistic', 'surreal', 'cute', 'kawaii', 'ghibli',
    'pixar', 'manga', 'comic', 'illustration', 'portrait', 'poster',
    'sticker', 'emoji', 'icon', 'logo', 'lego', 'figurine', 'diorama',
    'glass', 'chrome', 'neon', 'pastel', 'futuristic', 'cyberpunk',
    'steampunk', 'fantasy', 'wedding', 'couple', 'character', 'animal'
  ];
  
  for (const keyword of tagKeywords) {
    if (combined.includes(keyword) && !tags.includes(keyword)) {
      tags.push(keyword);
      if (tags.length >= 5) break;
    }
  }
  
  // Ensure at least 2 tags
  if (tags.length === 0) tags.push('creative');
  if (tags.length === 1) tags.push('ai-art');
  
  return tags;
}

async function importCases() {
  console.log("Starting import of cases (fixing image extensions)...\n");
  
  // Get all case directories
  const cases = await readdir(SOURCE_DIR);
  const caseNumbers = cases
    .filter(c => !c.startsWith('.'))
    .map(c => parseInt(c))
    .filter(n => !isNaN(n))
    .sort((a, b) => a - b);
  
  console.log(`Found ${caseNumbers.length} cases\n`);
  
  // Create category directories
  const categories = ['3d', 'arts', 'icons', 'thumbnails', 'people'];
  for (const cat of categories) {
    await mkdir(join(DEST_DIR, cat), { recursive: true });
    await mkdir(join(PUBLIC_DIR, cat), { recursive: true });
  }
  
  const stats = { total: 0, success: 0, failed: 0 };
  const categoryCount: Record<string, number> = {};
  
  for (const caseNum of caseNumbers) {
    stats.total++;
    const caseDir = join(SOURCE_DIR, String(caseNum));
    
    try {
      // Read case.yml
      const caseYml = await readFile(join(caseDir, "case.yml"), "utf-8");
      const caseData = yaml.parse(caseYml) as CaseData;
      
      if (!caseData.title_en || !caseData.prompt_en) {
        console.log(`  Skipping case ${caseNum}: Missing title_en or prompt_en`);
        stats.failed++;
        continue;
      }
      
      // Determine category
      const category = categorizePrompt(caseData.title_en);
      categoryCount[category] = (categoryCount[category] || 0) + 1;
      
      // Generate slug and filename
      const slug = generateSlug(caseData.title_en);
      const filename = `${slug}.md`;
      
      // Copy image to public folder (preserve original extension)
      let previewPath = '';
      if (caseData.image) {
        const ext = extname(caseData.image); // Get original extension (.webp, .webp, etc.)
        const srcImage = join(caseDir, caseData.image);
        const destImage = join(PUBLIC_DIR, category, `${slug}${ext}`);
        try {
          // Check if source exists
          await stat(srcImage);
          await copyFile(srcImage, destImage);
          previewPath = `/images/${category}/${slug}${ext}`;
        } catch (e) {
          console.log(`  Warning: Could not copy image for case ${caseNum}: ${caseData.image}`);
        }
      }
      
      // Generate tags
      const tags = generateTags(caseData.title_en, caseData.prompt_en);
      
      // Build markdown content
      let content = `---
title: "${caseData.title_en.replace(/"/g, '\\"')}"
category: ${category}
tags: [${tags.map(t => `"${t}"`).join(', ')}]
author: "${caseData.author || '@anonymous'}"
${previewPath ? `preview: "${previewPath}"` : ''}
---

${caseData.prompt_en.trim()}
`;
      
      // Add notes if present
      if (caseData.prompt_note_en && caseData.prompt_note_en.trim()) {
        content += `\n## Notes\n${caseData.prompt_note_en.trim()}\n`;
      }
      
      // Add reference info if present
      if (caseData.reference_note_en && caseData.reference_note_en.trim()) {
        content += `\n## Reference Image\n${caseData.reference_note_en.trim()}\n`;
      }
      
      // Add source attribution
      if (caseData.source_links && caseData.source_links.length > 0) {
        content += `\n## Source\n`;
        for (const link of caseData.source_links) {
          content += `- [Original Post](${link.url})\n`;
        }
      }
      
      // Add preview image in content if available
      if (previewPath) {
        content += `\n## Example Output\n![${caseData.alt_text_en || caseData.title_en}](${previewPath})\n`;
      }
      
      // Write markdown file
      const destFile = join(DEST_DIR, category, filename);
      await writeFile(destFile, content);
      
      console.log(`✓ Case ${caseNum}: ${caseData.title_en} -> ${category}/${filename} (${previewPath || 'no image'})`);
      stats.success++;
      
    } catch (error) {
      console.error(`✗ Case ${caseNum}: ${error}`);
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

importCases();
