---
name: update
description: Intelligent .ai/ memory maintenance - auto-update memory files from git diffs
argument-hint: "[--dry-run] [--commits N] [--skip-validation]"

---

# Update: Intelligent .ai/ Memory Maintenance

Analyze recent code changes and update .ai/ memory files using authority-based routing.

**Input:** $ARGUMENTS — Optional: `--dry-run`, `--commits N` (default: 5), `--skip-validation`

---

## Overview

This command keeps .ai/ files current by:
1. Analyzing git diffs (staged, unstaged, recent commits)
2. Routing changes to authority files using pattern matching
3. Updating files incrementally (edit in place, not wholesale regeneration)
4. Validating syntax and cross-references
5. Auto-committing updates

---

## Step 1: Analyze Changes

### 1a. Collect Changes

```bash
# Staged changes
git diff --cached --name-status

# Unstaged changes
git diff --name-status

# Recent commits (default: 5)
git log -[N] --name-only --pretty=format:"%H %s"
```

### 1b. Filter Relevant Files

Skip: `node_modules/`, `.next/`, `build/`, `*.log`, `*.lock`, `.ai/**`, binary files

Focus on: source files, app routes, shared infrastructure, documentation, skills

---

## Step 2: Authority-Based Routing

Route detected changes to the appropriate memory file:

| Detected Change | Update Target | Action |
|---|---|---|
| New schema/type export | `.ai/patterns.md` | Note pattern usage |
| New service extension | `.ai/patterns.md` | Increment pattern count |
| New API route | `.ai/CONTEXT.md` | Update route count |
| TODO comment | `.ai/TECH_DEBT.md` | Add TODO item |
| Deprecated pattern usage | `.ai/TECH_DEBT.md` | Flag anti-pattern |
| Architecture decision | `.ai/decisions.md` | Add decision record |

---

## Step 3: Incremental Updates

Update each target file in place. Use Edit tool, not wholesale regeneration.

### Update patterns.md

Detect pattern usage and increment counters. Add new patterns if discovered.

### Update TECH_DEBT.md

Add TODO items. Flag deprecated usage.

---

## Step 4: Validation

- **Syntax checks** — YAML files parse correctly, markdown links resolve
- **Duplication check** — Ensure files contain appropriate content
- **Cross-reference validation** — Check that pointers reference valid locations

---

## Step 5: Output & Commit

### Summary Report

```markdown
## .ai/ Memory Update

**Files Updated:** [list]
**Changes Analyzed:** [list]
**Validation:** PASS/FAIL
```

### Auto-Commit

```bash
git add .ai/
git commit -m "chore(.ai): update memory from recent changes"
```

**Skip commit if:** `--dry-run` flag present, no files changed, or validation failed.

---

## Usage Examples

```bash
# After feature implementation
/update

# Review last 10 commits
/update --commits 10

# Dry run to see what would change
/update --dry-run
```
