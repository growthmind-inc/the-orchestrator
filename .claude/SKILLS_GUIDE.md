# Skill Selection Guide

Slash commands are powered by skills in `.claude/skills/`. Use this guide to choose the right skill.

## Quick Decision Tree

```
Need to understand feasibility first?
  -> /investigate

Building a feature?
  Simple (1-2 files)     -> /feature (inline implementation)
  Moderate (3-6 files)   -> /feature (generates tasks via task-writer)
  Complex (7+ files)     -> /prd -> /architect -> /taskgen -> /execute

Fixing a bug?
  -> /bugs

Ready to ship code?
  Group commits intelligently -> /commit
  Full workflow (branch+PR)   -> /ship

Code quality?
  Review changes      -> /code-quality-review
  Weekly patterns     -> /drift-report
  Full validation     -> /validate
```

## Comparison Table

| Task     | Light                    | Heavy                    | Use Light When             | Use Heavy When                     |
| -------- | ------------------------ | ------------------------ | -------------------------- | ---------------------------------- |
| Feature  | `/feature`               | `/prd` -> `/execute`     | Complexity <=6, clear reqs | Complexity >=7, needs architecture |
| Bug      | `/bugs`                  | `/bugs`                  | Simple, known location     | Complex, needs investigation       |
| Commit   | `/commit`                | `/ship`                  | Just commit grouping       | Full branch + PR workflow          |
| Research | `/feature` (inline)      | `/investigate` -> `/prd` | Want to start coding       | Want feasibility first             |

## Other Skills

| Skill              | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `/outcomes`        | Define project outcomes interactively     |
| `/orchestrate`     | Autonomous PM->PL cycle                   |
| `/delta`           | Minimum variance analysis                 |
| `/drift-report`    | Weekly code quality pattern analysis      |
| `/update`          | Auto-update .ai/ memory files             |
| `/reliability-audit` | Failure analysis and test gap discovery |

## Tips

1. **Start lighter, escalate if needed** — `/feature` auto-routes to `/prd` if too complex
2. **Use `/investigate` liberally** — cheap research, prevents wasted effort
3. **Quality gates** — After features: `/validate`, Before commits: `/code-quality-review`
