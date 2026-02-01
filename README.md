# HowTo

A minimal technical tutorials and guides site built with Astro.

## Tech Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide
- **Package Manager**: Bun

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Preview production build
bun preview
```

## Project Structure

```
/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable components
│   ├── content/      # Markdown tutorials
│   ├── layouts/      # Layout components
│   ├── pages/        # Routes
│   └── styles/       # Global styles
└── package.json
```

## Features

- Dark/light theme toggle
- Collapsible table of contents with auto-expand on scroll
- Content collections with Zod validation
- Syntax highlighting for code blocks
