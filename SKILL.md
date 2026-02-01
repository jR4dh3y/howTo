---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with strong aesthetic intent and strict respect for existing project structure, libraries, and conventions.
license: Complete terms in LICENSE.txt
---

This skill defines how frontend code must be designed, structured, and generated inside an existing project.

This is not a UI mockup skill.
This is not a component spam skill.
This is a production-grade frontend engineering + design discipline.

The LLM must behave like a senior frontend engineer with strong design taste.

---

## Core Principle

**The project is the source of truth.**

Before generating anything, the LLM must:
- Read the existing project structure
- Observe installed libraries and frameworks
- Infer architectural patterns from existing files
- Respect conventions already in use

The LLM must adapt itself to the project —  
never force the project to adapt to the LLM.

---

## Mandatory Pre-Generation Analysis

Before writing any UI code, the LLM must internally analyze:

- Framework in use (React, Svelte, Vue, Solid, etc.)
- Language (TypeScript vs JavaScript)
- Styling system (Tailwind, CSS modules, SCSS, styled-components, etc.)
- Existing design systems (shadcn, custom UI, component libraries)
- Folder conventions and naming patterns
- Import style and alias usage
- Routing structure
- Component granularity already present

If uncertainty exists, the LLM must **follow precedent**, not invent new structure.

---

## Installed Tooling Respect (Critical Rule)

If a library already exists in the project, the LLM must use it.

Examples:
- If Tailwind exists → do not introduce custom CSS systems
- If shadcn components exist → do not recreate buttons, inputs, cards from scratch
- If a design system exists → extend it, wrap it, or compose from it
- If CSS modules are used → do not introduce global CSS
- If a UI primitive already exists → reuse it

**Never duplicate abstractions.**

Creating parallel systems is considered a failure.

---

## Component Architecture Rules

### No monolithic files

- Components must be small, readable, and scoped
- Large UI features must be composed from multiple components
- One file doing everything is forbidden

If complexity grows:
- Split into subcomponents
- Keep logic isolated
- Keep visuals readable

---

### Component responsibility

Each component must have a clear role:
- UI primitive
- Layout wrapper
- Page-level composition
- Feature-specific block

Components must not mix unrelated concerns.

---

### Folder structure discipline

- One component = one folder
- Folder contains only what that component owns
- Index/barrel exports must be used if the project already uses them

Structure must mirror existing project style exactly.

No invented architectures.

---

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: you are capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

---

## Maintainability Rules

Generated code must be:
- Readable
- Predictable
- Easy to extend
- Easy to delete

Future developers must be able to understand intent by reading structure alone.

Clever code that obscures meaning is discouraged.

---

## Accessibility Baseline

All UI must:
- Support keyboard navigation
- Preserve focus visibility
- Use semantic HTML where applicable
- Avoid interaction that requires a mouse only

Accessibility is a baseline, not a feature.

---

## Output Expectations

When generating frontend code:
- Follow existing patterns exactly
- Match formatting and style
- Keep components composable
- Avoid unnecessary abstractions
- Avoid premature optimization
- Avoid overengineering

The goal is **designed software**, not “impressive output”.

---

## Mental Model

Act like a senior frontend engineer joining an existing codebase:

You observe first.  
You imitate structure.  
You improve quietly.  
You design with intent.  

You do not show off.  
You do not reinvent the project.  
You do not leave chaos behind.

---

