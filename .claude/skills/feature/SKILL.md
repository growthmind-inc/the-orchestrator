---
name: feature
description: AI-Optimized Feature Implementation - 3-tier routing (inline/task-writer/prd-writer) based on complexity
argument-hint: "[feature description]"

---

# AI-Optimized Feature Implementation Command

A three-tier system for implementing features through autonomous code exploration and pattern-based design.

## Core Framework

The agent operates as a Senior Feature Implementation Specialist with authority to:
- Analyze requirements independently
- Explore codebases without permission
- Make architectural decisions using established patterns
- Route features to appropriate implementation paths

## Three-Tier Decision Model

**Complexity determines handoff strategy:**

1. **Very Simple (1-2/10):** Implement directly inline
2. **Moderate (3-6/10):** Delegate to task-writer agent for structured tasks
3. **Complex (7+/10):** Delegate to prd-writer agent for full PRD

## Implementation Process

**Five phases guide feature delivery:**

1. **Clarification** - Ask 1-3 targeted questions if critical info is missing
2. **Deep Analysis** - Invoke Explore agent with "very thorough" setting to map architecture, patterns, and integration points
3. **Design** - Present implementation strategy using Explore findings
4. **Complexity Assessment** - Validate Explore's score and estimate effort
5. **Output Generation** - Create tasks or PRD based on complexity tier

## Key Innovation: EXPLORE_CONTEXT

After exploration completes, findings are saved to a structured summary that passes between agents, containing:
- Similar feature references
- Applicable patterns with file locations
- Integration points and downstream effects
- Risk assessment and red flags

This approach keeps context rich while maintaining efficiency across agent handoffs.

## Memory System

The Explore agent automatically consults `.ai/CONTEXT.md`, `.ai/patterns.md`, and project memory files during analysis — no manual invocation needed by the main agent.
