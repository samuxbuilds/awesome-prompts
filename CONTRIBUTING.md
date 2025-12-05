# Contributing to AwesomePrompts

Thank you for your interest in contributing! This guide will help you add your own prompts to the collection.

## 📁 Folder Structure

```
prompts/
├── arts/           # Digital art, paintings, abstract art
├── illustrations/  # Icons, graphics, UI elements
├── people/         # Portraits, headshots, character designs
├── thumbnails/     # YouTube thumbnails, social media graphics
└── videos/         # Video scripts, storyboards
```

## 📝 Prompt File Format

Create a Markdown file (`.md`) with this structure:

```markdown
---
title: "Your Prompt Title"
category: "thumbnails"
tags: ["tag1", "tag2", "tag3"]
author: "@your_username"
preview: "https://example.com/preview-image.webp"
---

Your prompt content goes here...
```

### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Clear, descriptive title | `"YouTube Thumbnail - Tech Review"` |
| `category` | Folder name | `thumbnails`, `arts`, `illustrations`, `videos`, `people` |
| `tags` | Array of relevant tags | `["youtube", "tech", "thumbnail"]` |
| `author` | Your username/handle | `"@johndoe"` |

### Optional Fields

| Field | Description |
|-------|-------------|
| `preview` | URL to a preview image (shown on cards) |

## 🖼️ Adding Images

### Preview Image (Shows on Card)
Add to frontmatter:
```yaml
preview: "https://example.com/your-image.webp"
```

### Inline Images (Shows in Content)
Use standard Markdown:
```markdown
![Description of image](https://example.com/image.webp)
```

## ✅ Best Practices

1. **Be Specific**: Include details like colors, dimensions, style
2. **Use Sections**: Organize with headers (`##`) for clarity
3. **Add Examples**: Include reference images when possible
4. **Include Specs**: Resolution, color space, aspect ratios
5. **Keep it Practical**: Make prompts usable by others

## 🚀 How to Submit

1. Fork this repository
2. Create your prompt file in the appropriate folder
3. Follow the naming convention: `descriptive-name.md`
4. Submit a Pull Request

## 📌 Example Prompt

See [example-tech-review.md](./prompts/thumbnails/example-tech-review.md) for a complete example.

---

Questions? Open an issue and we'll help you out!
