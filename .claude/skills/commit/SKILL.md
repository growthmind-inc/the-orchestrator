---
name: commit
description: Simple git commit — stage all changes and commit with a single conventional commit message
argument-hint: ""

---

# Git Commit Command

Stage all changes and create a single commit with a conventional commit message.

## Operating Mode

Always operate without asking for confirmation. Analyze the changes, write a single commit message, and commit immediately.

## Workflow

1. Run `git status` and `git diff` to understand what changed
2. Stage all changes — **always include `.ai/` files** (investigations, audits, retros) alongside code changes
3. Create a single commit with a conventional commit prefix (feat:, fix:, docs:, chore:, refactor:, etc.) and a concise message describing what was done
4. All commits include a Claude Code co-author footer
