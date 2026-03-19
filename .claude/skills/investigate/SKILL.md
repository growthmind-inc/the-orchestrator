---
name: investigate
description: Pre-implementation feasibility research - explores codebase and web to assess technical viability
argument-hint: "[technical idea or feature concept]"

---

# Investigation Command

Explore feasibility and options for a technical idea through systematic research **without automatically proceeding to implementation**.

**Input:** $ARGUMENTS — The technical idea, feature concept, or problem to investigate

---

## Core Purpose

Investigation is about **understanding before committing**. This command:
- Explores what's already in the codebase
- Researches external solutions and best practices
- Assesses technical feasibility and architectural fit
- Provides honest recommendations
- **Stops at findings** rather than automatically generating tasks or requirements

---

## Five-Phase Process

### Phase 0: Project Context Scan (MANDATORY FIRST STEP)

**Before asking ANY clarifying questions**, scan the project memory files to understand context.

Use Task tool with `subagent_type=general-purpose` and `model="haiku"`:

```
Scan project memory files and return ONLY the structured context below. Do NOT answer the investigation question yet.

Read these files:
1. `.ai/CONTEXT.md` — Project overview and architecture
2. `.ai/patterns.md` — Implementation patterns

Return this EXACT format (max 300 words):

**Product Context:**
- What: [product description]
- Users: [target users]
- Key Features: [3-5 main features]

**Tech Stack:**
- [Languages, frameworks, tools]

**Architectural Patterns:**
- [Key patterns in use]

**File Structure:**
- [Key directories and their purposes]

STOP HERE. Do not investigate the question yet.
```

**After the agent returns context:**
1. Review the context to understand what the project already has
2. Use this context to inform Phase 1 clarification questions
3. Avoid asking questions that memory files already answer

---

### Phase 1: Scope Clarification

**Only ask questions if critical context is missing.** Ask 1-2 specific questions informed by Phase 0 context.

If Phase 0 gave you enough context, **skip clarification entirely** and proceed to Phase 2.

---

### Phase 2: Codebase & Memory Analysis

Delegate deep codebase exploration to an Explore agent for context efficiency.

---

### Phase 3: Web Research

Delegate external research to a research agent for parallel investigation.

---

### Phase 3b: Library Documentation (Optional)

If Phase 3 identified candidate libraries, optionally query their documentation.

---

### Phase 4: Synthesis & Feasibility Assessment

Combine all findings into a coherent assessment.

```markdown
# Investigation Report: [TOPIC]

## Summary
[2-3 sentences]

## Feasibility Assessment
| Dimension | Rating | Reasoning |
|-----------|--------|-----------|
| Technical Feasibility | High/Medium/Low | [Why?] |
| Architectural Fit | Good/Moderate/Poor | [How well?] |
| Effort Estimate | Small/Medium/Large | [Hours/days] |
| Risk Level | Low/Medium/High | [What could go wrong?] |

## Codebase Analysis
[Similar functionality, integration points, architectural fit]

## External Research
[Common approaches, candidate libraries, known gotchas]

## Recommendation
**Overall:** [Proceed / Proceed with Caution / Do Not Proceed]

## Next Steps
**Ready to build? I can create an outcome and orchestrate automatically.**
Say "yes" and I'll:
1. Save this investigation report
2. Create an outcome in `shared/OUTCOMES.md`
3. Run `/orchestrate` to plan and execute a sprint

**Or pick a manual path:**
- `/feature [topic]` — single feature, requirements clear
- `/prd [topic]` — complex, needs full PRD first
```

---

### Phase 5: Save Report

After presenting the report, **always save it** to: `.ai/investigations/[date]-[topic].md`

---

### Phase 6: Auto-Outcome & Orchestrate (User Opts In)

If the user says "yes", "orchestrate", or similar:

1. Read `shared/OUTCOMES.md` and find the highest `O-XXX` number
2. Append a new outcome with requirements synthesized from investigation findings
3. Run `/orchestrate`

---

## Honest Assessment Principles

- If something is a bad idea, say so
- If there are better alternatives, present them
- If the effort isn't worth it, explain why
- Don't artificially inflate feasibility
- Don't hide risks or unknowns
