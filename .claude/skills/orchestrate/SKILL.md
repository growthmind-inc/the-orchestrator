---
name: orchestrate
description: Launch the autonomous PM to PL cycle to deliver project outcomes. PM agent plans sprints, PL agent executes them, orchestrator manages branches and merges.
argument-hint: "[--max-cycles N] [--dry-run]"

---

# Orchestrate: Autonomous PM->PL Cycle

Launch the autonomous orchestrator that drives PM->PL cycles to deliver project outcomes.

**Input:** $ARGUMENTS — Optional: `--max-cycles N` (default: 10), `--dry-run` (plan only), `--review` (pause for human sign-off after PRD + ADD before PL runs)

> **CRITICAL — NEVER SKIP THE AGENT CHAIN.**
> You are the orchestrator, not the implementer. Even for tiny sprints with pre-locked design decisions, you MUST delegate: spawn pm-agent -> parse signal -> spawn cto-advisor -> reliability-audit -> spawn pl-agent -> post-audits -> PR.
> NEVER implement features directly. If the sprint is tiny, the agents will be fast. The chain exists for audit trail, artifact generation, and quality gates.

## Pre-flight

1. Verify git repo — if working tree has uncommitted changes, commit them to a new `save/pre-orchestrate-*` branch, push, and create a draft PR before proceeding (prevents losing WIP)
2. Check `shared/OUTCOMES.md` exists (run `/outcomes` first if missing)
3. Check `.claude/VALUES.md` exists — decision heuristics and conflict resolution rules used by PM agent for sprint planning
4. Check for existing orchestrator session

## Launch

**TypeScript orchestrator** (recommended for long runs): `npx tsx scripts/orchestrator.ts`

**In-session** (short runs or dry-run): PM->PL cycle loop directly

### Examples

```bash
# Run all outcomes
npx tsx scripts/orchestrator.ts

# Dry run (plan without execution)
npx tsx scripts/orchestrator.ts --dry-run

# Max 5 cycles
npx tsx scripts/orchestrator.ts --max-cycles 5

# Pause for human review after PRD + ADD before PL runs
npx tsx scripts/orchestrator.ts --review
```

## Cycle Loop

1. **PM agent** reads `shared/OUTCOMES.md` + `shared/ROADMAP.md` + `.claude/VALUES.md` + `.ai/retros/` + `.ai/patterns.md` (if exists) -> uses VALUES.md decision heuristics to prioritise sprints -> writes PRD (with `ui_heavy` flag and a mandatory `north_star` field) -> outputs signal
2. Parse PM signal: complete/blocked/error/next_task
3. **CTO agent** reads PRD + recent `.ai/audits/` + recent `.ai/retros/` + `.ai/patterns.md` (if exists) -> makes architecture decisions grounded in codebase patterns and past outcomes -> writes ADD -> marks sprint `complexity` as `low | medium | high` in the ADD
4. **UX Design** (UI-heavy sprints only): detected via `ui_heavy: true` in PRD -> writes UX spec to `.ai/ux/[feature-slug].md`
5. **Pre-implementation reliability audit**: runs `/reliability-audit` against the sprint's target module/outcome -> identifies likely failures, gaps, and test specs BEFORE coding begins. Report saved to `.ai/audits/`.

5a. **`--review` checkpoint** (only when `--review` flag passed): After PRD + ADD are written, STOP. Print paths to both documents and output: `REVIEW REQUIRED: Read the PRD and ADD then reply "proceed" or provide feedback.` Do not continue until the user explicitly says "proceed".

5b. **Feasibility spike** (only when ADD marks complexity as `high` OR pre-reliability audit has >=2 P0 risks): Spawn a sub-agent to evaluate the proposed approach before writing any code.

6. **PL agent** per sprint:
   - Branch pre-flight: `[your validation command]` on existing branch before touching any files
   - Reads PRD + ADD + UX spec (if exists) + reliability audit + `.ai/patterns.md` (if exists)
   - **Intent injection:** Every task prompt includes: `"North star: [north_star from PRD]. This task is part of [outcome-id]. Optimise for: [success criterion from PRD]."`
   - TaskGen -> Execute -> commit on branch
   - Writes sprint retrospective to `.ai/retros/[sprint].md`
7. **Post-sprint reliability audit**: runs `/reliability-audit` against the implemented code -> verifies test coverage, catches missed edge cases, validates contracts. If P0 gaps found, PM creates a fix sprint.
8. **Post-sprint security audit**: runs `security-auditor` agent against the implemented code -> checks auth, multi-tenancy, input validation, data exposure. If CRITICAL findings, PM creates a fix sprint.
9. **Post-sprint refactor + regression scan**: runs `refactor-agent` against the code-review output -> checks test existence for pure functions, detects race conditions/multi-tenancy gaps/null safety/idempotency issues, applies low-risk fixes. If CRITICAL regressions found, PM creates a fix sprint.

9c. **Pattern extraction** (run after every 3rd sprint retro is committed): Read the last 5 retros in `.ai/retros/`. Identify recurring failure patterns, repeated mistakes, or consistent architectural decisions. Write/update `.ai/patterns.md` with distilled lessons.

10. **Commit `.ai/` artifacts**: After all post-sprint audits and retros are written, stage and commit any remaining `.ai/` files.
11. **Create a PR** for the sprint branch (only if post-sprint audit has no P0 gaps AND security audit has no CRITICAL findings). Use `gh pr create` with a summary of changes. Do NOT merge directly to main.
12. Feed results (including retro path) to PM for next cycle
13. **Convergence-based stuck detection**: if the same sprint appears in multiple consecutive cycles AND audit finding count is not decreasing between attempts -> halt.
14. **Complexity budget**: track cumulative task complexity scores per run (1=haiku task, 3=sonnet, 5=opus). Use `--budget N` to set a hard limit. Warn at 80%, halt at 100%.

**Critical:** The CTO architecture phase ensures strong technical decisions before implementation begins. The dual reliability audits (pre + post) ensure reliable code with test coverage.

### Pre-Implementation Reliability Audit (Step 5)

Runs **after CTO + UX** and **before PL** on every sprint.

```
Skill(skill: "reliability-audit", args: "[outcome-id or module-name]")
```

The audit report provides failure risk maps, test specifications, and gap matrices.

### Post-Sprint Reliability Audit (Step 7)

**Merge gate logic:**
- **No P0 gaps** -> Proceed to security audit
- **P0 gaps found** -> Do NOT create PR. Feed the audit report back to PM. PM creates a targeted fix sprint.
- **P1 gaps only** -> Proceed, but PM includes P1 items in the next sprint's scope

### Post-Sprint Security Audit (Step 8)

**Merge gate logic:**
- **No CRITICAL findings** -> Proceed to create PR
- **CRITICAL findings** -> Do NOT create PR. PM creates a security fix sprint.
- **HIGH findings only** -> Create PR, but PM includes HIGH items in the next sprint

## Safety

- Max cycles prevents infinite loops
- All work on sprint branches — merges to main go through PRs only
- After audits pass, create a PR via `gh pr create` — let the user review and merge
- Graceful shutdown preserves state
