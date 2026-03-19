---
name: delta
description: Variance analysis - identify the minimum new code needed by mapping what changes vs what's reusable. Prevents future rewrites by finding the right abstraction boundary.
argument-hint: "[feature description or path-to-prd]"

---

# Delta: Minimum Variance Analysis

Identify the **exact delta** between what exists and what you need to build. Find the variance boundary — the clean line between "what changes per implementation" and "what stays the same" — so you write the fewest lines of new code and never rewrite the pattern.

**Core Question:** "If I build 5 more features like this, what's the only part that changes each time?"

**Input:** $ARGUMENTS — Feature description, PRD path, or architectural concept to analyze

## Steps

### 1. Capture the Requirement

1. If $ARGUMENTS is a file path (`.md`), read it and extract the core requirements
2. If $ARGUMENTS is a description, confirm the scope with 1-2 clarifying questions
3. If not provided, ask the user what they want to build

### 2. Pattern Discovery — Find the Closest Existing Code

Delegate deep codebase search to an Explore agent to find similar implementations, reusable infrastructure, and shared patterns.

### 3. Variance Decomposition — What Actually Changes?

**Category A: REUSE (write 0 new lines)** — Everything that already exists and can be used as-is.

**Category B: DELTA (the only new code)** — Everything that is genuinely unique to this feature.

For each item in Category B, answer:
- **Why can't this be reused?**
- **Will this pattern repeat?** (If yes, flag for extraction)

### 4. Generate the Delta Analysis Document

```markdown
# Delta Analysis: [Feature Name]

## Variance Summary

| Metric | Value |
|--------|-------|
| Closest existing match | [module/feature] |
| Existing code reusable | ~[X] lines across [N] files |
| **New code required** | **~[Y] lines across [M] files** |
| Variance ratio | [Y/(X+Y)]% new code |

## Reuse Map (0 new lines — use as-is)
[List of reusable components with source paths]

## Delta Map (the ONLY new code)
[List of genuinely new code with estimated lines]

## Variance Boundary
[The exact line between "same every time" and "changes every time"]

## Extraction Recommendation
[If repeat patterns flagged, propose the abstraction]

## Implementation Order
[Ordered list of what to build]
```

### 5. Interactive Refinement

After presenting the analysis, ask if the variance boundary feels right.

### 6. Save the Analysis

Save to `.ai/delta/[date]-[feature-slug].md`

---

## When to Use /delta vs Other Commands

| Situation | Use |
|-----------|-----|
| "How much new code does this need?" | `/delta` |
| "Is this feasible?" | `/investigate` |
| "I want full architecture decisions" | `/architect` |
| "I want to just build it" | `/feature` |
| "I want full requirements first" | `/prd` |

**Best combo:** `/delta` first to find the variance boundary, then `/architect` to design the delta, then `/taskgen` + `/execute` to build only the new parts.
