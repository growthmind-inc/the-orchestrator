---
name: ship
description: Complete git workflow — create feature branch, commit with quality message, push, and create PR via gh CLI.
argument-hint: "[branch-name]"

---

# Ship: Branch, Commit, Push & PR

Complete git workflow to ship changes: create a feature branch, stage and commit with a quality message, push, and create a PR.

**Input:** $ARGUMENTS — Optional branch name (e.g., `feat/add-user-auth`). If blank, will suggest based on changes.

## Steps

### 1. Analyze Current State

```bash
git status && git diff --stat && git diff --name-only
```

- Review what files are modified/added/deleted
- Verify we're on the right base branch and have changes to commit

### 2. Determine Branch Name

If $ARGUMENTS provided, use it. Otherwise:
- Analyze changes to determine type: `feat/`, `fix/`, `refactor/`, `docs/`, `chore/`
- Generate descriptive kebab-case name
- **Use it immediately — do NOT ask the user for confirmation** (speed over ceremony)

### 3. Create Feature Branch Off Main

```bash
git fetch origin main
git checkout -b [branch-name] origin/main
```

If there are uncommitted changes, stash first, create the branch, then pop:

```bash
git stash --include-untracked
git fetch origin main
git checkout -b [branch-name] origin/main
git stash pop
```

### 4. Stage Changes

```bash
git add -A
git diff --cached --stat
```

Warn if staging sensitive files (.env, credentials), large binaries, or node_modules.

### 5. Craft Commit Message

Analyze the diff and generate:
- **Format:** `type(scope): subject`
- **Types:** feat, fix, docs, style, refactor, test, chore
- **Subject:** Imperative mood, lowercase, no period, max 72 chars
- **Body:** Bullet points explaining WHY, not just WHAT

### 6. Commit & Push

```bash
git commit -m "type(scope): description

- Why this change was made
- Additional context

git push -u origin HEAD
```

### 7. Create Pull Request

Use `gh pr create`:

```bash
gh pr create --title "type(scope): description" --body "## Summary
- What this PR does

## Changes
- Specific changes made

## Test Plan
- [ ] Manual testing steps
- [ ] Automated tests"
```

### 8. Ship Report

```
## Shipped Successfully

**Branch:** [branch-name]
**Commit:** [hash] - [subject]
**PR URL:** [url]

**Next Steps:**
- Wait for CI checks
- Request review if needed
- Merge when approved
```
