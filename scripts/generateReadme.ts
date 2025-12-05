import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

interface PromptData {
  title: string;
  category: string;
  tags: string[];
  author: string;
  preview?: string;
  content: string;
  slug: string;
}

async function getMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  
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

async function parsePrompt(filePath: string): Promise<PromptData | null> {
  try {
    const content = await readFile(filePath, 'utf-8');
    const { data, content: body } = matter(content);
    
    const slug = filePath
      .replace(/^prompts\//, '')
      .replace(/\.md$/, '')
      .split('/')
      .pop() || '';
    
    return {
      title: data.title || 'Untitled',
      category: data.category || 'general',
      tags: data.tags || [],
      author: data.author || 'Anonymous',
      preview: data.preview,
      content: body.trim(),
      slug,
    };
  } catch (e) {
    console.error(`Error parsing ${filePath}:`, e);
    return null;
  }
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    '3d': '🎲',
    'arts': '🎨',
    'icons': '✨',
    'illustrations': '🖼️',
    'people': '👤',
    'thumbnails': '📸',
  };
  return emojis[category] || '📝';
}

async function generateReadme() {
  console.log('Generating README with all prompts...\n');
  
  // Get all markdown files
  const promptsDir = join(process.cwd(), 'prompts');
  const files = await getMarkdownFiles(promptsDir);
  
  console.log(`Found ${files.length} prompt files\n`);
  
  // Parse all prompts
  const prompts: PromptData[] = [];
  for (const file of files) {
    const prompt = await parsePrompt(file);
    if (prompt) prompts.push(prompt);
  }
  
  // Group by category
  const categories: Record<string, PromptData[]> = {};
  for (const prompt of prompts) {
    if (!categories[prompt.category]) {
      categories[prompt.category] = [];
    }
    categories[prompt.category].push(prompt);
  }
  
  // Sort categories and prompts
  const sortedCategories = Object.keys(categories).sort();
  for (const cat of sortedCategories) {
    categories[cat].sort((a, b) => a.title.localeCompare(b.title));
  }
  
  // Generate README content
  let readme = `# AwesomePrompts

A curated collection of **${prompts.length}+ AI image generation prompts** for thumbnails, 3D art, illustrations, and more. Open-source and community-driven.

**🌐 Live at: [awesomeprompts.xyz](https://awesomeprompts.xyz)**

## ✨ Features

- **Curated Collection**: Hand-picked prompts organized by category
- **Search & Filter**: Find prompts by title, content, or tags
- **Copy to Clipboard**: One-click copy for any prompt
- **Dark Mode**: Easy on the eyes, day or night
- **Static Site**: Fast, SEO-friendly, and deployable anywhere
- **Open Source**: Contribute your own prompts!

## 📁 Categories

| Category | Count | Description |
|----------|-------|-------------|
`;

  // Add category table
  for (const cat of sortedCategories) {
    const emoji = getCategoryEmoji(cat);
    const count = categories[cat].length;
    const descriptions: Record<string, string> = {
      '3d': '3D renders, figures, miniatures, and dioramas',
      'arts': 'Creative art styles, effects, and transformations',
      'icons': 'Emojis, stickers, badges, and icon designs',
      'illustrations': 'Digital illustrations and graphic art',
      'people': 'Portraits, selfies, and character photography',
      'thumbnails': 'YouTube thumbnails, posters, and covers',
    };
    readme += `| ${emoji} **${cat.charAt(0).toUpperCase() + cat.slice(1)}** | ${count} | ${descriptions[cat] || 'Various prompts'} |\n`;
  }

  readme += `\n---\n\n## 📚 All Prompts\n\n`;

  // Add prompts by category
  for (const cat of sortedCategories) {
    const emoji = getCategoryEmoji(cat);
    readme += `### ${emoji} ${cat.charAt(0).toUpperCase() + cat.slice(1)}\n\n`;
    readme += `<details>\n<summary>View ${categories[cat].length} prompts</summary>\n\n`;
    
    for (const prompt of categories[cat]) {
      readme += `#### ${prompt.title}\n\n`;
      
      if (prompt.tags.length > 0) {
        const tagsStr = prompt.tags.map(t => '`' + t + '`').join(', ');
        readme += `**Tags:** ${tagsStr}\n\n`;
      }
      
      // Fix all relative image paths in content to absolute URLs
      let fixedContent = prompt.content
        // Fix relative paths like /images/... to absolute
        .replace(/!\[([^\]]*)\]\(\/([^)]+)\)/g, '![$1](https://awesomeprompts.xyz/$2)')
        // Fix relative paths without leading slash
        .replace(/!\[([^\]]*)\]\((?!http)([^)]+)\)/g, '![$1](https://awesomeprompts.xyz/$2)');
      
      // Add the full prompt content
      readme += fixedContent + '\n\n';
      
      // Add preview image if available and not already in content
      const contentHasPreview = prompt.preview && fixedContent.includes(prompt.preview);
      if (prompt.preview && !contentHasPreview) {
        const previewUrl = prompt.preview.startsWith('http') 
          ? prompt.preview 
          : `https://awesomeprompts.xyz${prompt.preview}`;
        readme += `<img src="${previewUrl}" alt="${prompt.title}" width="400">\n\n`;
      }
      
      readme += `---\n\n`;
    }
    
    readme += `</details>\n\n`;
  }

  // Add quick start and other sections
  readme += `## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or higher)

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/samuxbuilds/awesome-prompts.git
cd awesome-prompts

# Install dependencies
bun install

# Start the development server
bun run dev
\`\`\`

### Build for Production

\`\`\`bash
bun run build
\`\`\`

## 📝 Adding a New Prompt

1. Create a new \`.md\` file in the appropriate \`/prompts\` subfolder
2. Add the required frontmatter:

\`\`\`markdown
---
title: "Your Prompt Title"
category: "3d"
tags: ["tag1", "tag2", "tag3"]
author: "@yourusername"
preview: "/images/category/your-image.webp"
---

Your prompt content goes here...

You can use **Markdown** formatting!
\`\`\`

3. Run \`bun run build\` to update the index
4. Submit a pull request!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 🛠️ Tech Stack

- **[Bun](https://bun.sh/)**: JavaScript runtime & package manager
- **[Astro](https://astro.build/)**: Static site generator
- **[Tailwind CSS](https://tailwindcss.com/)**: Styling
- **[Pagefind](https://pagefind.app/)**: Search functionality

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Ways to Contribute

- Add new prompts
- Improve existing prompts
- Fix bugs or typos
- Suggest new categories
- Improve documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who share their prompts
- Built with ❤️ by the community

---

**[🌐 Visit Website](https://awesomeprompts.xyz)** | **[➕ Submit a Prompt](https://github.com/samuxbuilds/awesome-prompts/issues/new?template=new-prompt.md)** | **[🐛 Report an Issue](https://github.com/samuxbuilds/awesome-prompts/issues)**
`;

  // Write the README
  await writeFile(join(process.cwd(), 'README.md'), readme);
  
  console.log('✅ README.md generated successfully!');
  console.log(`   Total prompts: ${prompts.length}`);
  console.log(`   Categories: ${sortedCategories.length}`);
}

generateReadme().catch(console.error);
