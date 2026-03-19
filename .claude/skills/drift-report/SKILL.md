---
name: drift-report
description: Weekly code quality pattern analysis - aggregates violations into systemic insights
argument-hint: ""

---

# Weekly Drift Report Command

Systematic code quality analysis through aggregated insights from multiple data sources.

## Core Purpose

Transform individual code review findings into "systemic insights" by identifying patterns that reveal deeper problems — whether in team training, rule design, architecture, or processes.

## Key Process Steps

**Data gathering** pulls from `.ai/TECH_DEBT.md`, `.ai/patterns.md`, git history, and recent code reviews to build a comprehensive picture.

**Pattern analysis** categorizes findings by severity, type, location, and age while identifying frequently-changed files that correlate with existing issues.

**Hotspot diagnosis** connects concentrated violations to root causes: "Same violation by different people, rule exists but not followed" suggests training problems, while "violations concentrated in integration points" indicates architecture concerns.

**Required decisions** force concrete actions: which tech debt gets fixed this week, which rules need revision, and which items become accepted permanent debt with documented consequences.

## Output Structure

The report template mandates sections for violation patterns, hotspot analysis, recurring solutions, and three mandatory decision points. Crucially, it emphasizes: "A drift report that doesn't force decisions is just noise. The value is in the decisions, not the data."

## Integration Value

The system creates a feedback loop where code reviews feed findings into tech debt tracking, which drift reports aggregate into rule improvements, creating better enforcement and fewer violations over time.
