import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { existsSync } from 'fs';

const PROMPTS_DIR = join(process.cwd(), 'prompts');
const IMAGES_DIR = join(process.cwd(), 'public', 'images');

// Get all markdown files recursively
async function getMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md') && !entry.name.startsWith('example-')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Extract external URLs from markdown content
function extractExternalUrls(content: string): string[] {
  const urls: string[] = [];
  
  // Match preview field in frontmatter
  const previewMatch = content.match(/^preview:\s*["']?(https?:\/\/[^"'\s\n]+)["']?/m);
  if (previewMatch) {
    urls.push(previewMatch[1]);
  }
  
  // Match image URLs in markdown content  
  const imageMatches = content.matchAll(/!\[.*?\]\((https?:\/\/[^)]+)\)/g);
  for (const match of imageMatches) {
    if (!urls.includes(match[1])) {
      urls.push(match[1]);
    }
  }
  
  return urls;
}

// Download image and return local path
async function downloadImage(url: string, category: string, promptSlug: string): Promise<string | null> {
  try {
    console.log(`  Downloading: ${url.substring(0, 80)}...`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageDownloader/1.0)'
      }
    });
    
    if (!response.ok) {
      console.error(`    Failed: HTTP ${response.status}`);
      return null;
    }
    
    const contentType = response.headers.get('content-type') || '';
    let ext = '.webp';
    if (contentType.includes('jpeg') || contentType.includes('jpg')) ext = '.jpg';
    else if (contentType.includes('png')) ext = '.png';
    else if (contentType.includes('gif')) ext = '.gif';
    else if (contentType.includes('webp')) ext = '.webp';
    
    // Create category-specific image directory
    const categoryDir = join(IMAGES_DIR, category);
    if (!existsSync(categoryDir)) {
      await mkdir(categoryDir, { recursive: true });
    }
    
    // Generate filename from prompt slug
    const filename = `${promptSlug}${ext}`;
    const localPath = join(categoryDir, filename);
    const relativePath = `/images/${category}/${filename}`;
    
    // Check if already exists
    if (existsSync(localPath)) {
      console.log(`    Already exists: ${relativePath}`);
      return relativePath;
    }
    
    // Download and save
    const buffer = await response.arrayBuffer();
    await writeFile(localPath, Buffer.from(buffer));
    console.log(`    Saved: ${relativePath}`);
    
    return relativePath;
  } catch (error) {
    console.error(`    Error downloading: ${error}`);
    return null;
  }
}

// Process a single markdown file
async function processFile(filePath: string): Promise<{ updated: boolean; downloads: number }> {
  let content = await readFile(filePath, 'utf-8');
  const externalUrls = extractExternalUrls(content);
  
  if (externalUrls.length === 0) {
    return { updated: false, downloads: 0 };
  }
  
  // Extract category and slug from path
  const pathParts = filePath.split('/');
  const category = pathParts[pathParts.length - 2];
  const filename = pathParts[pathParts.length - 1];
  const slug = filename.replace('.md', '');
  
  console.log(`\nProcessing: ${category}/${filename}`);
  
  let updated = false;
  let downloads = 0;
  
  for (let i = 0; i < externalUrls.length; i++) {
    const url = externalUrls[i];
    const imageSuffix = externalUrls.length > 1 ? `-${i + 1}` : '';
    const localPath = await downloadImage(url, category, `${slug}${imageSuffix}`);
    
    if (localPath) {
      // Replace URL in content
      content = content.split(url).join(localPath);
      updated = true;
      downloads++;
    }
  }
  
  if (updated) {
    await writeFile(filePath, content, 'utf-8');
    console.log(`  Updated file with ${downloads} local image(s)`);
  }
  
  return { updated, downloads };
}

async function main() {
  console.log('=== Downloading External Images ===\n');
  
  const files = await getMarkdownFiles(PROMPTS_DIR);
  console.log(`Found ${files.length} prompt files\n`);
  
  let totalUpdated = 0;
  let totalDownloads = 0;
  
  for (const file of files) {
    const result = await processFile(file);
    if (result.updated) {
      totalUpdated++;
      totalDownloads += result.downloads;
    }
  }
  
  console.log('\n=== Summary ===');
  console.log(`Files updated: ${totalUpdated}`);
  console.log(`Images downloaded: ${totalDownloads}`);
  console.log('\nDone! Run "bun run build" to rebuild the index.');
}

main().catch(console.error);
