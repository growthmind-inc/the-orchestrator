---
name: prd
description: Create a comprehensive Product Requirements Document using agent delegation. Research-agent explores codebase, interactive discovery, then prd-writer generates the document.
argument-hint: "[issue-number or feature description]"

---

# Create PRD

Generate a comprehensive Product Requirements Document (PRD) enriched with codebase context. Uses agent delegation: `research-agent` explores the codebase, you handle discovery questions, then `prd-writer` generates the document.

**Enterprise-First Mindset:** All features must be designed with enterprise scalability in mind - code should be ready for a 10-engineer team to maintain, extend, and onboard onto.

**Input:** $ARGUMENTS — Optional GitHub issue number (e.g., `42` or `#42`), or leave blank to describe the feature directly.

## Steps

### 1. Determine Input Source

1. **If a GitHub issue number is provided in $ARGUMENTS:**
   - Strip any `#` prefix
   - Use `gh issue view <number>` to fetch issue details
   - Extract: Title, Body, Labels, Assignees, Milestone, Comments

2. **If a feature description is provided (not a number):**
   - Use the provided text as the feature source

3. **If $ARGUMENTS is empty:**
   - Ask: "Would you like to provide a GitHub issue number or describe the feature directly?"

### 2. Codebase Exploration (Delegated)

Spawn `research-agent` to explore the codebase for context:

```
Task(
  description: "Explore codebase for [feature] context",
  subagent_type: "research-agent",
  model: "haiku",
  prompt: "Research the codebase for context related to: [feature description].
  Find: existing implementations, affected modules, patterns to follow, integration points,
  lint and architecture rules. Check docs/ for architecture docs.
  Return structured findings with key files, patterns, and red flags."
)
```

Save findings for reference.

### 3. Requirements Discovery (Conversational)

Before generating the PRD, engage in discovery. This is NOT optional.

1. **Summarize understanding** (1-2 sentences), incorporating research-agent findings
2. **Ask 4-5 targeted questions** from these categories:
   - Problem & Context (what pain point, current workarounds)
   - Users & Scope (who uses it, segments, frequency)
   - Requirements (success criteria, must-haves vs nice-to-haves)
   - Technical (integrations, performance considerations)
   - UX & Design (UI placement, reference implementations, design input needed)
3. **Wait for responses** before proceeding
4. **Confirm understanding** with a brief summary, get user approval

### 4. Generate PRD (Delegated)

Spawn `prd-writer` agent with gathered context:

```
Task(
  description: "Generate PRD for [feature]",
  subagent_type: "prd-writer",
  model: "inherit",
  prompt: "
---
feature_name: '[feature-slug]'
problem: '[problem statement from discovery]'
users: '[target users from discovery]'
must_haves:
  - '[requirement 1]'
  - '[requirement 2]'
nice_to_haves:
  - '[optional requirement]'
user_flows:
  - '[flow description]'
integration_points:
  - '[affected module]'
success_criteria:
  - '[measurable criterion]'
complexity: '[low/medium/high]'
explore_context: |
  [research-agent findings]
open_questions:
  - '[unresolved question]'
save_to: '.ai/prd/[feature-slug].md'
---
Generate a comprehensive PRD for [feature]. Include: requirements, user flows, success criteria, risks, files affected.
"
)
```

### 5. Review & Finalize

After `prd-writer` returns:
1. Read the generated PRD
2. Verify all discovery answers are reflected
3. Check for completeness (all sections present)
4. If the PRD is missing information, add it directly

### 6. Output Confirmation

```
## PRD Created

**File:** `.ai/prd/[path]`
**Feature:** [Name]
**Key Requirements (P0):** [top 3]
**Design Required:** [Yes/No/Partial]
**Open Questions:** [count]

**Next Steps:**
1. Review PRD for accuracy
2. Answer open questions
3. Run `/architect [prd-path]` to design architecture
4. Run `/taskgen [prd-path] [add-path]` to generate task list
```
