---
title: "Introduction to TypeScript"
date: 2026-01-20
description: "A beginner-friendly guide to TypeScript - adding static types to your JavaScript code."
---

TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing and class-based object-oriented programming.

## Why TypeScript?

- Catch errors at compile time instead of runtime
- Better IDE support with autocomplete
- Easier refactoring
- Self-documenting code

## Installation

Install TypeScript globally:

```bash
npm install -g typescript
```

Or as a dev dependency:

```bash
npm install --save-dev typescript
```

## Your First TypeScript File

Create a file called `hello.ts`:

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

Compile it:

```bash
tsc hello.ts
```

## Basic Types

### Primitives

```typescript
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
```

### Arrays

```typescript
let list: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];
```

### Objects

```typescript
interface User {
  name: string;
  age: number;
  email?: string; // optional
}

const user: User = {
  name: "Alice",
  age: 30
};
```

## Functions

```typescript
// Function with typed parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;
```

## Type Inference

TypeScript can often infer types:

```typescript
let message = "Hello"; // TypeScript knows this is a string
message = 42; // Error: Type 'number' is not assignable to type 'string'
```

## Next Steps

Explore more advanced features:

- Generics
- Union and intersection types
- Type guards
- Utility types
