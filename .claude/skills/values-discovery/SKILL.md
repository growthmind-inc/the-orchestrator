---
name: values-discovery
description: Deep interactive session to discover your core values, engineering principles, architecture philosophy, and decision-making style. Outputs VALUES.md that all agents reference.
argument-hint: "[optional seed description]"

---

# Root Values Discovery

Interactive values discovery session — surfaces fundamental principles, philosophies, and approaches that propagate across all AI agent interactions. Covers both personal operating style AND engineering/architecture preferences so agents write code the way you would.

**Input:** $ARGUMENTS — Optional seed description

## How It Works

This is a multi-round interview (20-30+ rounds, can span multiple sessions). It uses a persistent state file at `~/.claude/discovery/values-session.md` to maintain context across sessions.

## Phases

### Phase 1: Identity & Context (Rounds 1-3)
Open-ended exploration — who you are, what you're building, team structure, constraints.

### Phase 2: Working Style & Decision-Making (Rounds 4-6)
How you think, decide, and communicate.

### Phase 3: Engineering Philosophy (Rounds 7-12)
**This is critical.** These answers directly shape how agents write code in your project.

Cover ALL of these areas:

**Architecture & Patterns:**
- Module boundaries, abstraction philosophy, duplication vs premature abstraction
- What "scalable architecture" means — for users, engineers, or both

**Code Quality & Standards:**
- Testing philosophy, tech debt tolerance, TypeScript strictness
- Code patterns that make you cringe

**Tech Stack Opinions:**
- Non-negotiables, version philosophy, database access patterns

**Engineering Principles:**
- Speed vs quality trade-offs, API structure, rendering approach, shared code

**Architecture Decision-Making:**
- Duplicate implementations, new vs proven libraries, schema design, error handling

### Phase 4: The Dig (Rounds 13+)
Deep probing with scenarios and tensions from both personal and engineering domains.

### Phase 5: Representation
How they want to be represented by AI agents — tone, autonomy boundaries, when to ask vs act.

### Phase 6: Synthesis
Generate the final VALUES.md.

## Output

Generates `.claude/VALUES.md` with:
- **Identity Snapshot** — who they are, what they're building, team, constraints
- **Mental Models** — the frameworks they think in (both life and engineering)
- **Decision Heuristics** — ordered checklist for decisions + conflict resolution table
- **Code Principles (Non-Negotiable)** — the engineering rules that don't bend
- **Communication Style** — good vs bad examples, tone rules
- **Autonomy Boundaries** — handle without asking vs always check
- **Known Failure Modes** — patterns to watch for and how to intervene
- **Situation -> Response Patterns** — concrete scenarios and expected behavior

The Code Principles section is especially important — agents reference it on every code change. Make sure it captures their ACTUAL opinions, not generic best practices.

## Interview Principles

- **Ask one question at a time.** Don't overwhelm with multi-part questions.
- **Dig into WHY.** The story behind the opinion is what makes the VALUES.md useful.
- **Capture their actual voice.** If they say "that's garbage," the VALUES.md should reflect that intensity.
- **Don't assume engineering opinions.** Ask, don't project.
- **Surface tensions.** The resolution is the real value.

## Session Commands

- **"Let's pause here"** — Saves state, resume later
- **"What have we covered?"** — Shows progress summary
- **"Skip to engineering"** — Jump to Phase 3
- **"Let's synthesize"** — Jump to final output
- **"Start over"** — Fresh start

## After Completion

All agents automatically load VALUES.md at boot for personalized decision-making. The engineering principles directly shape how agents write, review, and architect code.
