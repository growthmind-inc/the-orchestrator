---
name: outcomes
description: Interactive project setup to discover outcomes, create state files, and enable autonomous orchestration via /orchestrate.
argument-hint: "[optional outcome description]"

---

# Outcomes: Define Project Deliverables

Interactive project setup — discover outcomes, create state files, and enable autonomous orchestration via `/orchestrate`.

**Input:** $ARGUMENTS — Optional outcome description to seed the conversation

## Steps

### 1. Context Gathering (Context Engineering)

Before any questions, silently load grounding context:
- Read `.claude/VALUES.md` — identity, mental models, decision heuristics, grounding constraints
- Read `shared/ROADMAP.md` if it exists — continuity with prior work
- Read `shared/OUTCOMES.md` if it exists — idempotency check:
  - **If exists:** Offer to review/update, start fresh, or cancel
  - **If missing:** Proceed to discovery

This context shapes every question you ask and every outcome you propose. Don't ask the user things VALUES.md already answers.

### 2. Interactive Discovery (Intent Engineering)

Shape discovery around what the user actually wants to become, not just what to build.

**Round 1:** One open question — describe the project, who it's for, what success looks like.

**Round 2:** Extract deliverables, propose as outcomes with success criteria. Max 3 questions. Ground questions in the user's stated mental models.

**Round 3+:** Refinement only if contradictions, vague criteria, or unclear dependencies.

**Stop when:** Each outcome is one sentence, has measurable criteria, no contradictions, dependencies documented.

### 3. Judgment Gate (Judgment Engineering)

Before presenting outcomes, run each one through the decision heuristics from VALUES.md:

1. **Can I see the end result?** — Is the outcome concrete enough to ship?
2. **Does it deliver immediate user value?** — Or is it infrastructure without a customer path?
3. **Is there a path to ROI?** — Does this move toward willingness to pay?
4. **Can we validate in 48 hours?** — If not, should it be broken smaller?
5. **Am I feature creeping?** — Is this on the core validation path?

Flag any outcome that fails a check. Propose alternatives or scope reductions.

### 4. Coherence Check (Coherence Engineering)

Verify the full outcome set aligns with identity and constraints:

- Do these outcomes serve who we're becoming (identity snapshot)?
- Do they respect grounding constraints?
- Are they sequenced by "earn the right" logic — fundamentals before advanced?
- Would a 10-engineer team understand the direction from these outcomes alone?

### 5. Confirmation

Present outcome table with a brief note on how each outcome maps to the validation path. Wait for explicit user confirmation.

### 6. Create State Files

- Create/overwrite `shared/OUTCOMES.md` with outcomes, criteria, constraints, non-goals
- Create `shared/ROADMAP.md` only if missing

### 7. Completion Summary (Evaluation Engineering)

Report files created. Include a quick self-assessment:
- Which layer of the stack each outcome primarily exercises
- Any open risks or assumptions that need validation

Offer to run `/orchestrate`.
