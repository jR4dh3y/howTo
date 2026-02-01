# AGENTS.md

Instructions for AI coding agents working in this repository.

## Project Overview

This is an **Astro** project with:
- **Framework**: Astro 5.x (static site generator with islands architecture)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Icons**: Lucide (`@lucide/astro`)
- **Language**: TypeScript (strict mode)
- **Package Manager**: Bun

## Build/Dev Commands

All commands run from project root:

```bash
# Install dependencies
bun install

# Start development server (localhost:4321)
bun dev

# Build for production (outputs to ./dist/)
bun build

# Preview production build locally
bun preview

# Run Astro CLI commands
bun astro ...
bun astro -- --help

# Type checking
bun astro check
```

## Testing

No test framework is currently configured. When adding tests:
- Use Vitest (recommended for Astro projects)
- Run single test: `bun vitest run path/to/test.ts`
- Run all tests: `bun test`

## Linting/Formatting

No ESLint or Prettier is configured. When adding:
- Follow existing code formatting
- Use tabs for indentation (see existing .astro files)

---

## Code Style Guidelines

### File Structure

```
/
├── public/          # Static assets (favicon, images)
├── src/
│   ├── components/  # Astro/framework components
│   ├── content/     # Markdown content with Zod schemas
│   ├── layouts/     # Layout components
│   ├── pages/       # File-based routing (.astro, .md)
│   └── styles/      # Global CSS files
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

### Astro Components (.astro)

```astro
---
// Frontmatter: TypeScript code runs at build time
import Component from '../components/Component.astro';
import { Icon } from '@lucide/astro';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div class="container">
  <h1>{title}</h1>
  <Component />
</div>
```

### TypeScript

- **Config**: Extends `astro/tsconfigs/strict`
- Use explicit types for props and function parameters
- Prefer interfaces over type aliases for object shapes
- No `any` types unless absolutely necessary

### Imports

- Use relative paths for local imports
- Order: external packages first, then local imports
- Use named imports where possible

```typescript
// External packages first
import { Icon } from '@lucide/astro';

// Local imports
import Layout from '../layouts/Layout.astro';
import Button from '../components/Button.astro';
```

### Tailwind CSS v4

- Use utility classes directly in markup
- Use Tailwind's design tokens (spacing, colors, typography)
- Prefer Tailwind utilities over custom CSS
- Use `@apply` sparingly, only for repeated patterns
- Import via `@import "tailwindcss"` in global CSS

```astro
<div class="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-bold text-gray-900">Title</h2>
</div>
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button.astro`, `NavBar.astro` |
| Pages | kebab-case | `about-us.astro`, `blog-post.astro` |
| Variables/functions | camelCase | `getUserData`, `isActive` |
| Constants | SCREAMING_SNAKE_CASE | `API_URL`, `MAX_ITEMS` |
| CSS classes | Tailwind utilities or kebab-case | `btn-primary` |

### Component Architecture

- Keep components small and focused on single responsibility
- One component per file
- Use composition over large monolithic components
- Prefer props over global state

```
src/components/
├── Button/
│   └── Button.astro
├── Card/
│   ├── Card.astro
│   ├── CardHeader.astro
│   └── CardBody.astro
```

### Error Handling

- Use try/catch for async operations
- Provide meaningful error messages
- Handle edge cases gracefully

```typescript
try {
  const data = await fetchData();
} catch (error) {
  console.error('Failed to fetch data:', error);
  // Handle gracefully
}
```

### Content Collections

- Define schemas in `src/content.config.ts` using Zod
- Use `getCollection()` to fetch content
- Access frontmatter via `tutorial.data`

```typescript
import { defineCollection, z } from 'astro:content';

const tutorials = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
  }),
});

export const collections = { tutorials };
```

### Styling Patterns

- Use CSS custom properties (variables) for theming
- Dark mode via `.dark` class on html element
- Access variables with `var(--variable-name)`
- Use `is:global` for global styles in components
- Use `is:inline` for inline scripts that need to run immediately
- Use `define:vars` to pass data from frontmatter to scripts
- Use `class:list` directive for conditional classes

---

## Design Guidelines (from SKILL.md)

### Core Principles

1. **Project is source of truth**: Observe existing patterns before generating code
2. **Use installed libraries**: If Tailwind/Lucide exists, use them - never duplicate
3. **No monolithic files**: Split complex UI into composable components
4. **Accessibility baseline**: Keyboard navigation, focus visibility, semantic HTML

### Aesthetic Direction

- Choose bold, distinctive design directions (not generic AI aesthetics)
- Avoid: Inter, Roboto, Arial, purple gradients on white, cookie-cutter layouts
- Focus: Typography, color themes, motion, spatial composition, visual depth
- Match implementation complexity to aesthetic vision

### Maintainability

- Code must be readable, predictable, easy to extend and delete
- Follow existing patterns exactly
- Avoid premature optimization and overengineering

---

## Quick Reference

```bash
# Development
bun dev                    # Start dev server
bun build                  # Production build
bun astro check            # Type checking

# Common Astro CLI
bun astro add react        # Add React integration
bun astro add tailwind     # Add Tailwind (already installed)
```

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
