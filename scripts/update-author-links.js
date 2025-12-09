#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Recursively get all md files
function getMarkdownFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = getMarkdownFiles('prompts');

let updated = 0;
let skipped = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  
  // Match author field that is NOT already a markdown link
  const authorMatch = content.match(/^author:\s*"@([^"\[\]]+)"$/m);
  
  if (authorMatch) {
    const username = authorMatch[1];
    const newAuthor = `author: "[@${username}](https://x.com/${username})"`;
    const newContent = content.replace(authorMatch[0], newAuthor);
    
    fs.writeFileSync(file, newContent);
    updated++;
    console.log(`✅ Updated: ${file} -> @${username}`);
  } else {
    // Check if already has link format
    if (content.match(/^author:\s*"\[.*\]\(.*\)"$/m)) {
      skipped++;
      console.log(`⏭️ Skipped (already linked): ${file}`);
    }
  }
});

console.log(`\n📊 Summary: Updated ${updated} files, Skipped ${skipped} files`);
