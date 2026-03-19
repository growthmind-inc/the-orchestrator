---
name: execute
description: Orchestrate task execution via fresh-context execution agents with wave-based parallelism, cross-task learning, and post-execution quality gates.
argument-hint: "[path-to-task-file]"

---

# Execute: Orchestrated Task Implementation

Orchestrate task execution by spawning fresh-context execution agents per parent task, with wave-based parallelism, cross-task learning, and post-execution quality gates.

**Input:** $ARGUMENTS — Path to XML task file OR implementation plan file

---

## Your Role: Orchestrator, Not Executor

**Read this section before proceeding.**

You are a **lightweight orchestrator**. Your job is to **delegate work to execution agents**. All coding happens inside execution agents, not here.

### What You MUST Do

- **Parse** the task file to understand the work
- **Build waves** based on file conflicts
- **Spawn execution-agent** per parent task using the Task tool
- **Collect results** from agents (commit SHAs, learnings)
- **Update STATE.md** with cross-task learnings
- **Run quality gates** after all tasks complete

---

## Step 0: Branch Setup (MANDATORY)

**Always work on a feature branch.**

```bash
git branch --show-current
```

- If already on a feature branch (not `main`/`master`/`production`) -> proceed
- If on main -> create a branch: `git checkout -b feat/[feature-name]`

---

## Step 1: Parse Task File

### If XML Format (from /taskgen)

Parse the XML structure. Extract all waves and tasks. Skip tasks where `status="completed"` (enables resume). Note complexity ratings for model selection.

### If Plain Text Format

Parse the plan into tasks. Group into waves yourself:
- Tasks modifying different files -> same wave (parallel)
- Tasks modifying the same file -> different waves (sequential)
- Order by dependency

### Initialize STATE.md

Create `STATE.md` next to the task file.

---

## Step 2: Build Waves

Group tasks into waves based on file conflicts:

1. **Conflict detection:** Two tasks conflict if they touch ANY of the same files
2. **Wave building:** Non-conflicting tasks go in the same wave
3. **Wave ordering:** Respect dependencies

---

## Step 3: Execute Waves

For EACH wave:

### 3a. Spawn Execution Agents

For each task in the wave, spawn an `execution-agent` via the Task tool:

```
Task(
  description: "Execute task [id]: [title]",
  subagent_type: "execution-agent",
  model: [select by complexity],
  prompt: "Execute this task. Read CLAUDE.md first. Before writing ANY code, search for existing implementations of similar features and read 2-3 reference files. Copy patterns exactly — only adapt business logic. Create atomic commit when complete."
)
```

**Model selection by complexity:**

| Complexity | Model Parameter |
|---|---|
| 1-2 | `model: "haiku"` |
| 3 | `model: "sonnet"` |
| 4-5 | `model: "opus"` |

### 3b. Collect Results

Check each agent's output for SUCCESS/FAILURE. Extract commit SHAs and cross-task learnings.

### 3c. Update STATE.md

Append learnings from completed tasks.

### 3d. Per-Wave Validation

Run validation after each wave:

```bash
[your validation command]
```

If validation fails:
1. Identify which task caused the failure
2. Spawn a fix agent with the error context
3. Re-run validation
4. If still failing after 2 fix attempts, report the failure and continue

---

## Step 4: Post-Execution Quality Gates

### 4a. Test Existence Check (MANDATORY)

Verify that tests exist for all pure function layers:

```bash
# Check if __tests__/ exists for the module being built
ls [your-module]/__tests__/ 2>/dev/null
```

If tests are missing for modules with pure functions, generate and execute test tasks.

### 4b. Code Review

Spawn the `code-review` agent to review all changes:

```
Task(
  description: "Code review all changes",
  subagent_type: "code-review",
  model: "inherit",
  prompt: "Review all uncommitted and recently committed changes for this feature. Check architecture compliance, quality, and the project's established conventions. Flag any new implementations that duplicate existing patterns."
)
```

### 4c. Reliability Audit + Security Audit (parallel)

Spawn both agents in a single message for parallel execution.

### 4d. CTO Triage

Review code-review, reliability-audit, AND security-audit findings:
- **CRITICAL/HIGH findings:** Spawn fix agents
- **MEDIUM/LOW findings:** Note for follow-up

### 4e. Final Validation

```bash
[your validation command]
```

Both MUST pass before reporting completion.

---

## Step 5: Output Report

```markdown
## Execution Complete: [feature-name]

### Waves Executed
- Wave 1: [n tasks] — [PASS/FAIL]

### Tasks Completed
| ID | Title | Complexity | Model | Status | Commit |
|---|---|---|---|---|---|

### Code Review
- Verdict: [PASS / PASS WITH NOTES / NEEDS REVISION]

### Validation
- TypeScript: PASS/FAIL
- Lint: PASS/FAIL

### Ready for Commit
[Yes — all tasks complete and validated / No — issues remain]
```

---

## Step 6: Push Branch and Create PR

Only do this **after** all waves passed and validation is green.

```bash
git push -u origin [branch-name]
gh pr create --title "feat([feature-name]): [short description]" --body "..." --base main --draft
```

---

## Error Recovery

If execution is interrupted:
1. Re-run `/execute` with the same task file
2. Tasks with `status="completed"` are automatically skipped
3. STATE.md preserves cross-task learnings
4. Execution resumes from the first incomplete wave
