---
name: taskgen
description: Generate a structured XML task list from a PRD (and optional Architecture Decision Document). Tasks are organized into waves by dependency order with complexity ratings for model selection.
argument-hint: "[prd-path] [optional-add-path]"

---

# TaskGen: Generate Task List from PRD

Convert a PRD (and optional Architecture Decision Document) into a structured XML task list for `/execute`. Tasks are organized into waves by dependency order with complexity ratings that drive model selection.

**Input:** $ARGUMENTS — Path to PRD file, optionally followed by ADD path

**Usage:**
- `/taskgen .ai/prd/feature-name.md` — Generate from PRD only
- `/taskgen .ai/prd/feature-name.md .ai/add/add-feature-name.md` — Generate from PRD + ADD pair

## Steps

### 1. Parse Documents

Read the PRD at the first path in $ARGUMENTS. If a second path is provided, read the ADD.

Extract:
- **From PRD:** Functional requirements, technical approach, affected modules, implementation phases, acceptance criteria
- **From ADD (if provided):** Implementation sequence, file list, module structure, integration points

### 2. Load Architecture Context

Read these files for pattern awareness:
- `CLAUDE.md` — Architecture rules
- `.ai/CONTEXT.md` — Project overview

### 3. Decompose into Tasks

Break requirements into implementation tasks. Follow dependency order:

1. **Types and schemas** (complexity 1-2): Type definitions, validation schemas, enums
2. **Data layer** (complexity 2-3): Database schemas, repositories, data access
3. **Business logic** (complexity 3-4): Services, business rules, core logic
4. **API layer** (complexity 2-3): Route handlers, validation, response formatting
5. **Event handlers** (complexity 2-3): Background jobs, event processing (if applicable)
6. **UI layer** (complexity 2-4): Components, pages, layouts

For each task, specify:
- **id**: Hierarchical identifier (e.g., `1.1`, `1.2`, `2.1`)
- **complexity**: 1-5 rating (drives model selection in `/execute`)
- **file**: Target file path
- **action**: `create` or `modify`
- **description**: What to implement (specific, not vague)
- **verify**: Verification command (typically `[your validation command]`)

### 4. Build Waves

Group tasks into waves based on file conflicts and dependencies:
- Tasks in the same wave can run in parallel (different files)
- Tasks that depend on earlier tasks go in later waves
- Wave ordering follows dependency order

### 5. Add Mandatory Final Tasks

Every task list MUST include code review and final validation tasks as the last wave.

### 6. Generate XML Output

```xml
<?xml version="1.0" encoding="UTF-8"?>
<execution_plan feature="[feature-name]" prd="[prd-path]" generated="[ISO-date]">
  <wave number="1" description="Types and schemas">
    <task id="1.1" complexity="2" status="pending"
          file="src/[name]/types.ts" action="create">
      <description>Define schemas for [entity]</description>
      <verify>[your validation command]</verify>
    </task>
  </wave>
  <!-- More waves... -->
</execution_plan>
```

### 7. Save Task File

Save to: `tasks/[feature-slug]/tasks.xml`

### 8. Output Summary

```
## Task List Generated

**File:** `tasks/[feature-slug]/tasks.xml`
**Total Tasks:** [count]
**Waves:** [count]

**Next Step:**
Run `/execute tasks/[feature-slug]/tasks.xml` to begin orchestrated implementation.
```

## Complexity Calibration

| Rating | Description | Model |
|--------|-------------|-------|
| 1 | Simple type export, config file, enum | haiku |
| 2 | Schema definition, basic component, data access query | haiku |
| 3 | Service method, API route, event handler | sonnet |
| 4 | Multi-file integration, complex business logic | opus |
| 5 | System-wide change, new module, architecture migration | opus |
