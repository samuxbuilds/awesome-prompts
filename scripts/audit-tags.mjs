import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROMPTS_DIR = path.join(__dirname, '../prompts');

const KEYWORD_MAP = {
  'realistic': ['realistic', 'photorealistic', 'hyperrealistic', 'photography', 'photo'],
  'anime': ['anime', 'manga', 'studio ghibli'],
  '3d': ['3d', 'render', 'c4d', 'blender'],
  'illustration': ['illustration', 'vector', 'drawing', 'sketch'],
  'chibi': ['chibi'],
  'neon': ['neon', 'cyberpunk', 'futuristic'],
  'vintage': ['vintage', 'retro', '90s', '80s', 'nostalgia'],
  'minimalist': ['minimalist', 'minimal', 'simple'],
  'portrait': ['portrait', 'face', 'headshot'],
  'landscape': ['landscape', 'scenery', 'nature'],
  'dark': ['dark', 'noir', 'shadow'],
  'colorful': ['colorful', 'vibrant', 'rainbow'],
  'black-and-white': ['black and white', 'monochrome', 'grayscale']
};

function getFiles(dir) {
  const subdirs = fs.readdirSync(dir);
  const files = [];
  map: for (const subdir of subdirs) {
    const res = path.resolve(dir, subdir);
    if (fs.statSync(res).isDirectory()) {
      const subFiles = getFiles(res);
      files.push(...subFiles);
    } else {
      if (res.endsWith('.md')) {
        files.push(res);
      }
    }
  }
  return files;
}

async function auditTags() {
  const files = getFiles(PROMPTS_DIR);
  let updatedCount = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const parsed = matter(content);
    const textToCheck = (parsed.content + ' ' + (parsed.data.title || '')).toLowerCase();
    
    let originalTags = parsed.data.tags || [];
    // Ensure tags is an array
    if (typeof originalTags === 'string') {
        originalTags = [originalTags];
    }
    
    let newTags = new Set(originalTags);
    let changed = false;

    // Remove unwanted tags
    if (newTags.has('nano-banana-pro')) {
      newTags.delete('nano-banana-pro');
      changed = true;
    }

    // Add missing tags based on keywords
    for (const [tag, keywords] of Object.entries(KEYWORD_MAP)) {
      if (keywords.some(k => textToCheck.includes(k))) {
        if (!newTags.has(tag)) {
          newTags.add(tag);
          changed = true;
        }
      }
    }

    if (changed) {
      updatedCount++;
      parsed.data.tags = Array.from(newTags);
      const newContent = matter.stringify(parsed.content, parsed.data);
      fs.writeFileSync(file, newContent);
      console.log(`Updated: ${path.relative(PROMPTS_DIR, file)}`);
    }
  }

  console.log(`\nAudit complete. Updated ${updatedCount} files.`);
}

auditTags();
