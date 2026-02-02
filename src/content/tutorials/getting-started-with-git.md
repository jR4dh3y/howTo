---
title: "Getting Started with Git"
date: 2026-01-15
description: "Learn the fundamentals of Git version control - from installation to your first commit."
tags: ["git", "version-control", "programming"]
youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
---

Git is a distributed version control system that tracks changes in your code. This guide will walk you through the essentials.

## Installation

First, install Git on your system:

```bash
# macOS (using Homebrew)
brew install git

# Ubuntu/Debian
sudo apt-get install git

# Windows (using winget)
winget install Git.Git
```

## Configuration

Set up your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Creating Your First Repository

Initialize a new repository:

```bash
mkdir my-project
cd my-project
git init
```

You should see a message saying the repository was initialized.

## Basic Workflow

### Staging Changes

Add files to the staging area:

```bash
# Add specific file
git add filename.txt

# Add all changes
git add .
```

### Committing

Save your staged changes:

```bash
git commit -m "Your commit message"
```

### Viewing History

Check your commit history:

```bash
git log --oneline
```

## Working with Remotes

Connect to a remote repository:

```bash
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

## Next Steps

Now that you understand the basics, explore:

- Branching and merging
- Pull requests
- Rebasing
- Git hooks
