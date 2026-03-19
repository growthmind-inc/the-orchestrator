---
name: code-quality-review
description: Review unstaged, staged, or committed code changes for SOLID/DRY, performance, extraction readiness. Saves report to .ai/audits/.

---

# Code Quality Review

Review unstaged, staged, or committed code changes for quality principles and generate a structured report.

## Steps

### 0. Git Prerequisite

Run:

```bash
git status --porcelain -u && \
echo "----- STAGED (summary) -----" && git diff --staged --name-status && git diff --staged --numstat && git diff --staged --stat && \
echo "----- STAGED (patch) -----" && git diff --staged && \
echo "----- WORKTREE (summary) -----" && git diff --name-status && git diff --numstat && git diff --stat && \
echo "----- WORKTREE (patch) -----" && git diff && \
echo "----- LAST COMMIT (fallback) -----" && git log -1 --name-status && git show -1 --stat
```

### 1. Analyze Code Changes

Review the diff and evaluate against:

1. **SOLID & DRY Assessment** — Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion, DRY, over-engineering check
2. **Conciseness & Readability** — Self-documenting names, warranted complexity, unnecessary comments, simplification opportunities
3. **Performance** — Time/Space complexity (Big-O), bottlenecks (DB in loops, unbounded iterations, memory leaks), scalability at 10x/100x
4. **Boy Scout Rule** — Did changes improve surrounding code? Quick wins missed?
5. **Extraction Readiness** — Generic interfaces vs project-specific types? Could be extracted to separate package? Hard dependencies on project internals?

### 2. Generate Report

```
## Code Quality Review

**Files Changed:** <count, +additions/-deletions>

### Strengths
- <specific examples>

### Concerns

| Severity | Issue | Location |
|----------|-------|----------|
| High/Medium/Low | <Description> | <file.ts:line-range> |

### Performance Analysis
- **Time Complexity:** O(?)
- **Space Complexity:** O(?)
- **Bottlenecks:** <None / specific issues>

### Boy Scout Check
- **Improvements Made:** <list>
- **Missed Opportunities:** <list>

### Extraction Readiness
- **Coupling Level:** <Low / Medium / High>
- **Portable:** <Yes / Partially / No>
- **Blockers:** <list>

### Verdict
<PASS | PASS WITH NOTES | NEEDS REVISION>

### Recommended Improvements
<ordered by priority>
```

### 3. Save Report

Write to `.ai/audits/<YYYY-MM-DD>-code-review-<short-description>.md`
