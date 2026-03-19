# VALUES.md — TaskFlow (Example)

> This is an example VALUES.md for a fictional project called TaskFlow. Generate your own by running `/values-discovery`.

## Identity Snapshot

- **Who:** Sarah Chen, solo technical founder
- **Building:** TaskFlow — a task management SaaS for small engineering teams
- **Stage:** Pre-revenue, 200 beta users, nights and weekends
- **Team:** Solo developer, occasional contractor for design
- **Constraints:** Limited time (15-20 hours/week), bootstrapped, shipping fast matters more than perfection

## Mental Models

- **"Earn the right" sequencing** — Build the simple version first. Only add complexity when users ask for it.
- **"Would I pay for this?"** — If the answer is no, it's infrastructure, not a feature. Ship features first.
- **"Delete code, not add code"** — The best refactor removes lines. The best feature is the one you don't build.

## Decision Heuristics (in priority order)

1. Does this deliver value a user can see today?
2. Can I validate this in under 48 hours?
3. Am I building for 200 users or 200,000? Build for 200 first.
4. Is this the simplest version that validates the hypothesis?
5. Would a new developer understand this code in 10 minutes?

### Conflict Resolution

| Conflict | Resolution |
|----------|------------|
| Speed vs quality | Ship fast, but with tests for critical paths |
| New pattern vs existing pattern | Always use existing pattern unless it fundamentally cannot work |
| Feature vs tech debt | Feature first, but track debt and pay it down every 3rd sprint |
| User request vs roadmap | If 3+ users ask, it's the roadmap now |

## Code Principles (Non-Negotiable)

- **TypeScript strict mode** — No `any`, no type assertions without comments
- **Tests for pure functions** — Every extractor, scorer, and utility has tests
- **Reuse before create** — Read 2-3 reference implementations before writing anything
- **One way to do things** — If a pattern exists, follow it. Don't introduce alternatives.
- **Small PRs** — If a PR touches more than 10 files, break it up

## Communication Style

**Good:** "Here's what I found, here are the options, here's my recommendation."
**Bad:** "Would you like me to look into this? Should I consider these factors?"

- Be direct. State findings and recommendations.
- Don't ask for permission to investigate. Just do it.
- Show your work (file paths, code snippets) so I can verify.

## Autonomy Boundaries

**Handle without asking:**
- Bug fixes under 50 lines
- Test additions
- Pattern-following implementations (copy from reference, adapt logic)
- Git operations (branch, commit, push)

**Always check first:**
- New architectural patterns
- Database schema changes
- Removing or renaming existing APIs
- Changes that affect more than 3 modules

## Known Failure Modes

- **Over-engineering** — I tend to build for scale too early. Remind me: "Is this for 200 users or 200,000?"
- **Scope creep** — I add "while I'm here" improvements. Ask: "Is this in the PRD?"
- **Skipping tests** — When I'm excited about a feature, I skip tests. Hard gate: no commit without tests for pure functions.
