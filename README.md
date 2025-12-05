# AwesomePrompts

A curated collection of AI prompts for thumbnails, videos, illustrations, and more. Open-source and community-driven.

**Live at: [awesomeprompts.xyz](https://awesomeprompts.xyz)**

## Features

- **Curated Collection**: Hand-picked prompts organized by category
- **Search & Filter**: Find prompts by title, content, or tags
- **Copy to Clipboard**: One-click copy for any prompt
- **Dark Mode**: Easy on the eyes, day or night
- **Static Site**: Fast, SEO-friendly, and deployable anywhere
- **Open Source**: Contribute your own prompts!

## Categories

- **Thumbnails**: YouTube and social media thumbnails
- **Videos**: Video production and editing prompts
- **Illustrations**: Digital art and illustration prompts
- **Arts**: General art and creative prompts
- **People/Woman**: Portrait prompts for women
- **People/Man**: Portrait prompts for men

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/awesomeprompts.git
cd awesomeprompts

# Install dependencies
bun install

# Generate the prompts index
bun scripts/buildIndex.ts

# Start the development server
bun run dev
```

### Build for Production

```bash
bun run build
```

This will:
1. Run the `buildIndex.ts` script to generate `public/all-prompts.json`
2. Build the Astro site to the `dist/` folder

### Preview Production Build

```bash
bun run preview
```

## Project Structure

```
/awesomeprompts
├── /prompts              # Markdown prompt files
│   ├── /thumbnails
│   ├── /videos
│   ├── /illustrations
│   ├── /arts
│   └── /people
│       ├── /woman
│       └── /man
├── /scripts
│   └── buildIndex.ts     # Bun script to generate JSON index
├── /src
│   ├── /components       # Astro components
│   ├── /layouts          # Page layouts
│   └── /pages            # Astro pages
├── /public               # Static assets & generated JSON
├── astro.config.mjs      # Astro configuration
├── package.json          # Project dependencies
└── README.md
```

## Adding a New Prompt

1. Create a new `.md` file in the appropriate `/prompts` subfolder
2. Add the required frontmatter:

```markdown
---
title: "Your Prompt Title"
category: "thumbnails"
tags: ["tag1", "tag2", "tag3"]
author: "@yourusername"
---

Your prompt content goes here...

You can use **Markdown** formatting!
```

3. Run `bun scripts/buildIndex.ts` to update the index
4. Submit a pull request!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## Deployment

### Cloudflare Pages (Recommended)

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Create a new project and connect your repository
4. Configure build settings:
   - **Framework preset**: Astro
   - **Build command**: `bun run build`
   - **Build output directory**: `dist`
5. Deploy!

### Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/)
3. Vercel will auto-detect Astro settings
4. Deploy!

### GitHub Pages

1. Add the GitHub Pages adapter:
   ```bash
   bun add @astrojs/github-pages
   ```
2. Update `astro.config.mjs` with your base path
3. Set up GitHub Actions for deployment (see `.github/workflows/deploy.yml`)

## Tech Stack

- **[Bun](https://bun.sh/)**: JavaScript runtime & package manager
- **[Astro](https://astro.build/)**: Static site generator
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)**: YAML frontmatter parser
- **[marked](https://marked.js.org/)**: Markdown parser

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Ways to Contribute

- Add new prompts
- Improve existing prompts
- Fix bugs or typos
- Suggest new categories
- Improve documentation

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who share their prompts
- Built with love by the community

---

**[Submit a Prompt](https://github.com/yourusername/awesomeprompts/issues/new?template=new-prompt.md)** | **[Report an Issue](https://github.com/yourusername/awesomeprompts/issues)**
