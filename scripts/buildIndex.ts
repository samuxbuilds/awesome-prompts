import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { join, relative, basename, dirname } from "path";
import matter from "gray-matter";

interface PromptData {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  tags: string[];
  author: string;
  content: string;
  path: string;
  preview?: string;
}

interface PromptSearchIndex {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  author: string;
  preview?: string;
  content: string;
}

interface PaginatedIndex {
  total: number;
  totalPages: number;
  perPage: number;
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
}

const PROMPTS_DIR = join(import.meta.dir, "..", "prompts");
const OUTPUT_DIR = join(import.meta.dir, "..", "public");
const DATA_DIR = join(OUTPUT_DIR, "data");

const ITEMS_PER_PAGE = 50;

// Check if running in production mode (filters out example prompts)
const isProduction = process.argv.includes("--production");

async function getAllMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  async function scanDir(currentDir: string) {
    const entries = await readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        await scanDir(fullPath);
      } else if (entry.name.endsWith(".md")) {
        // Filter out example files in production
        if (isProduction && entry.name.startsWith("example-")) {
          console.log(`  Skipping example file: ${entry.name}`);
          continue;
        }
        files.push(fullPath);
      }
    }
  }
  
  await scanDir(dir);
  return files;
}

function generateSlug(filename: string): string {
  return basename(filename, ".md")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCategoryFromPath(filePath: string, baseDir: string): { category: string; subcategory?: string } {
  const relativePath = relative(baseDir, dirname(filePath));
  const parts = relativePath.split("/").filter(Boolean);
  
  if (parts.length === 0) {
    return { category: "uncategorized" };
  }
  
  if (parts.length === 1) {
    return { category: parts[0] };
  }
  
  return { 
    category: parts[0], 
    subcategory: parts.slice(1).join("/") 
  };
}

async function parseMarkdownFile(filePath: string): Promise<PromptData> {
  const content = await readFile(filePath, "utf-8");
  const { data: frontmatter, content: markdownContent } = matter(content);
  
  const { category, subcategory } = getCategoryFromPath(filePath, PROMPTS_DIR);
  const slug = generateSlug(basename(filePath));
  
  const fullCategory = subcategory ? `${category}/${subcategory}` : category;
  
  return {
    id: `${fullCategory}-${slug}`,
    slug,
    title: frontmatter.title || basename(filePath, ".md"),
    category: fullCategory,
    subcategory,
    tags: frontmatter.tags || [],
    author: frontmatter.author || "anonymous",
    content: markdownContent.trim(),
    path: relative(PROMPTS_DIR, filePath),
    preview: frontmatter.preview,
  };
}

async function buildIndex() {
  console.log("Building prompts index...");
  console.log(`Mode: ${isProduction ? "PRODUCTION (excluding examples)" : "DEVELOPMENT (including examples)"}\n`);
  
  try {
    // Ensure directories exist
    await mkdir(OUTPUT_DIR, { recursive: true });
    await mkdir(DATA_DIR, { recursive: true });
    await mkdir(join(DATA_DIR, "pages"), { recursive: true });
    await mkdir(join(DATA_DIR, "categories"), { recursive: true });
    await mkdir(join(DATA_DIR, "tags"), { recursive: true });
    
    const files = await getAllMarkdownFiles(PROMPTS_DIR);
    console.log(`Found ${files.length} markdown files\n`);
    
    const prompts: PromptData[] = [];
    
    for (const file of files) {
      try {
        const prompt = await parseMarkdownFile(file);
        prompts.push(prompt);
      } catch (error) {
        console.error(`  Error parsing ${file}:`, error);
      }
    }
    
    // Sort by category and title
    prompts.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.title.localeCompare(b.title);
    });
    
    // === Generate paginated data ===
    
    // 1. Create lightweight search index entries
    const searchIndex: PromptSearchIndex[] = prompts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      tags: p.tags,
      author: p.author,
      preview: p.preview,
      content: p.content,
    }));
    
    // 2. Paginate all prompts
    const totalPages = Math.ceil(searchIndex.length / ITEMS_PER_PAGE);
    
    for (let page = 0; page < totalPages; page++) {
      const start = page * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const pageData = searchIndex.slice(start, end);
      
      await writeFile(
        join(DATA_DIR, "pages", `${page + 1}.json`),
        JSON.stringify(pageData)
      );
    }
    console.log(`Generated ${totalPages} paginated pages`);
    
    // 3. Group by category and paginate each
    const categoryMap = new Map<string, PromptSearchIndex[]>();
    searchIndex.forEach(prompt => {
      if (!categoryMap.has(prompt.category)) {
        categoryMap.set(prompt.category, []);
      }
      categoryMap.get(prompt.category)!.push(prompt);
    });
    
    const categoryStats: { name: string; count: number }[] = [];
    
    for (const [category, categoryPrompts] of categoryMap) {
      const catPages = Math.ceil(categoryPrompts.length / ITEMS_PER_PAGE);
      const safeCategoryName = category.replace(/\//g, "_");
      
      categoryStats.push({ name: category, count: categoryPrompts.length });
      
      // Create category directory
      await mkdir(join(DATA_DIR, "categories", safeCategoryName), { recursive: true });
      
      for (let page = 0; page < catPages; page++) {
        const start = page * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const pageData = categoryPrompts.slice(start, end);
        
        await writeFile(
          join(DATA_DIR, "categories", safeCategoryName, `${page + 1}.json`),
          JSON.stringify(pageData)
        );
      }
      
      // Category metadata
      await writeFile(
        join(DATA_DIR, "categories", safeCategoryName, "meta.json"),
        JSON.stringify({ 
          name: category, 
          total: categoryPrompts.length, 
          totalPages: catPages,
          perPage: ITEMS_PER_PAGE 
        })
      );
    }
    console.log(`Generated data for ${categoryMap.size} categories`);
    
    // 4. Group by tag and paginate each
    const tagMap = new Map<string, PromptSearchIndex[]>();
    searchIndex.forEach(prompt => {
      prompt.tags.forEach(tag => {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, []);
        }
        tagMap.get(tag)!.push(prompt);
      });
    });
    
    const tagStats: { name: string; count: number }[] = [];
    
    for (const [tag, tagPrompts] of tagMap) {
      const tagPages = Math.ceil(tagPrompts.length / ITEMS_PER_PAGE);
      const safeTagName = tag.replace(/[^a-z0-9-]/gi, "_").toLowerCase();
      
      tagStats.push({ name: tag, count: tagPrompts.length });
      
      await mkdir(join(DATA_DIR, "tags", safeTagName), { recursive: true });
      
      for (let page = 0; page < tagPages; page++) {
        const start = page * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const pageData = tagPrompts.slice(start, end);
        
        await writeFile(
          join(DATA_DIR, "tags", safeTagName, `${page + 1}.json`),
          JSON.stringify(pageData)
        );
      }
      
      await writeFile(
        join(DATA_DIR, "tags", safeTagName, "meta.json"),
        JSON.stringify({ 
          name: tag, 
          total: tagPrompts.length, 
          totalPages: tagPages,
          perPage: ITEMS_PER_PAGE 
        })
      );
    }
    console.log(`Generated data for ${tagMap.size} tags`);
    
    // 5. Create master index (lightweight)
    tagStats.sort((a, b) => b.count - a.count);
    categoryStats.sort((a, b) => a.name.localeCompare(b.name));
    
    const masterIndex: PaginatedIndex = {
      total: prompts.length,
      totalPages,
      perPage: ITEMS_PER_PAGE,
      categories: categoryStats,
      tags: tagStats,
    };
    
    await writeFile(
      join(DATA_DIR, "index.json"),
      JSON.stringify(masterIndex)
    );
    
    // 6. Still generate full JSON for individual prompt pages (build time only)
    await writeFile(
      join(OUTPUT_DIR, "all-prompts.json"),
      JSON.stringify(prompts, null, 2)
    );
    
    // === Summary ===
    console.log("\n=== Build Summary ===");
    console.log(`Total prompts: ${prompts.length}`);
    console.log(`Total pages: ${totalPages}`);
    console.log(`Categories: ${categoryMap.size}`);
    console.log(`Tags: ${tagMap.size}`);
    
    // Calculate sizes
    const masterSize = JSON.stringify(masterIndex).length;
    const pageSize = JSON.stringify(searchIndex.slice(0, ITEMS_PER_PAGE)).length;
    
    console.log(`\nMaster index size: ${(masterSize / 1024).toFixed(1)} KB`);
    console.log(`Per-page size: ${(pageSize / 1024).toFixed(1)} KB`);
    console.log(`\nAt 10K prompts:`);
    console.log(`  - Master index: ~${((masterSize / prompts.length) * 10000 / 1024).toFixed(0)} KB`);
    console.log(`  - Each page load: ~${(pageSize / 1024).toFixed(1)} KB (same)`);
    
  } catch (error) {
    console.error("Error building index:", error);
    process.exit(1);
  }
}

buildIndex();
