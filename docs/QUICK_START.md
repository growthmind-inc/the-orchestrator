# Quick Start Guide

Get The Orchestrator running in your project in 5 minutes.

## Prerequisites

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed and authenticated
- A git repository for your project
- Basic familiarity with Claude Code slash commands

## Step 1: Copy The Orchestrator Files

Copy the `.claude/` directory from this repo into your project root:

```bash
# Clone The Orchestrator
git clone https://github.com/growthmind-inc/the-orchestrator.git

# Copy skills, rules, and guides into your project
cp -r the-orchestrator/.claude/ /path/to/your-project/.claude/

# Copy the shared state file templates
mkdir -p /path/to/your-project/shared/
cp the-orchestrator/shared/OUTCOMES.md /path/to/your-project/shared/
cp the-orchestrator/shared/ROADMAP.md /path/to/your-project/shared/

# Copy the .ai directory structure
mkdir -p /path/to/your-project/.ai/
cp the-orchestrator/.ai/CONTEXT.md /path/to/your-project/.ai/
```

## Step 2: Add CLAUDE.md to Your Project

Copy the `CLAUDE.md` from this repo to your project root, then customize it:

```bash
cp the-orchestrator/CLAUDE.md /path/to/your-project/CLAUDE.md
```

Edit `CLAUDE.md` to reflect your project's:
- Tech stack
- Architecture conventions
- Module structure
- Validation commands (e.g., your equivalent of typecheck and lint)

## Step 3: Discover Your Values

Run the values discovery session to generate your personalized `VALUES.md`:

```bash
cd /path/to/your-project
claude "/values-discovery"
```

This is a multi-round interview (20-30 rounds) that surfaces your engineering principles, decision-making style, and code preferences. The output at `.claude/VALUES.md` shapes how every agent thinks and decides.

## Step 4: Define Outcomes

Run the outcomes discovery to define what you want to build:

```bash
claude "/outcomes"
```

This creates `shared/OUTCOMES.md` with measurable outcomes and success criteria. The PM agent reads this file to plan sprints.

## Step 5: Launch The Orchestrator

Start the autonomous PM-to-PL cycle:

```bash
claude "/orchestrate"
```

Or for more control:

```bash
# Dry run — plan without executing
claude "/orchestrate --dry-run"

# Pause for human review after PRD + ADD
claude "/orchestrate --review"

# Limit to 5 cycles
claude "/orchestrate --max-cycles 5"
```

## What Happens Next

The orchestrator runs a cycle:

1. **PM agent** reads your outcomes and plans a sprint (writes a PRD)
2. **CTO agent** makes architecture decisions (writes an ADD)
3. **Pre-implementation audit** identifies likely failures before coding
4. **PL agent** executes the sprint with wave-based parallelism
5. **Post-sprint audits** verify reliability and security
6. **Pattern extraction** captures learnings for future sprints
7. **PR creation** — changes land on a feature branch with a draft PR

Each cycle produces a working increment on a feature branch. You review and merge.

## Customization

### Validation Commands

The skill files reference `[your validation command]` as placeholders. Replace these with your project's actual commands:

```
# Example replacements:
[your validation command] -> npm run typecheck && npm run lint
[your test command] -> npm test
[your build command] -> npm run build
```

### Module Structure

The skills reference generic module paths. Update references to match your project's directory structure.

### Agent Types

The orchestrator uses agent types like `execution-agent`, `research-agent`, `reliability-auditor`, `security-auditor`, and `code-review`. These are defined inline via Task tool prompts — there is no separate config file. The `subagent_type` field is a label that describes the agent's role, not a reference to a file.

If you want persistent agent personas, create agent definition files and reference them in your `CLAUDE.md`.

## Troubleshooting

### "VALUES.md not found"

Run `/values-discovery` first. The orchestrator requires this file for personalized decision-making.

### "OUTCOMES.md not found"

Run `/outcomes` to define your project deliverables. The PM agent reads this to plan sprints.

### Validation commands fail

Replace `[your validation command]` placeholders in skill files with your actual commands.

### Agent produces confused output

Check that your `CLAUDE.md` accurately describes your tech stack and architecture. The agents use this as their primary context.
