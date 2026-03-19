---
paths:
  - "src/**/*"
  - "lib/**/*"
  - "modules/**/*"
---

# Test Requirements: No Shipping Without Tests

## Hard Rule

**Every module with pure functions MUST have unit tests before it can be committed or shipped.**

This applies to:
- Extractors, scorers, resolvers, composers (pure functions with no I/O)
- Delta/diff computation functions
- Domain logic utilities
- Any function that takes inputs and returns outputs without side effects

## What Counts as Tested

A function is "tested" when there is a corresponding test file in `__tests__/` that:
1. Calls the function with known inputs
2. Asserts on the output
3. Tests at least one edge case (empty input, missing fields, etc.)

## Where Tests Live

```
[your-module]/
  __tests__/
    extractors/          # Unit tests per extractor
    scoring/             # Unit tests per scorer
    integration/         # End-to-end fixture-based tests
```

## Pre-Commit Checklist

Before committing a module, verify:
- [ ] Every pure function has at least one test file
- [ ] `__tests__/` directory exists in the module
- [ ] Tests pass with your test runner

## When Creating a New Module

If the task plan does not include test tasks:
1. **Flag it** — tell the orchestrator that tests are missing from the plan
2. **Add them yourself** — create test tasks for every pure function layer
3. **Never ship without them** — a module with pure functions but no tests is incomplete

## For Crash Recovery / Continuation Flows

When resuming work from a killed or interrupted session:
1. Check if `__tests__/` exists in the module
2. If no tests exist, **add tests before committing** — this is a hard gate
3. Do not treat "the code works" as equivalent to "the code is tested"

## Tests-First Pattern (Highest Reliability)

When building new functions or modifying existing ones:
1. **Include the `__tests__/` file as context** — always read adjacent test files before writing implementation
2. **Write tests before implementation** when building from a spec
3. **Reference test expectations** when debugging — tests define the contract
