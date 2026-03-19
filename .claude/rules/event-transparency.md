---
paths:
  - "**/events/**/*.ts"
  - "**/handlers/**/*.ts"
  - "**/workers/**/*.ts"
  - "**/jobs/**/*.ts"
  - "**/services/**/*.ts"
---

# Event Transparency Principle

## Core Rule
**Every async operation the user triggers (or that runs on their behalf) MUST have a corresponding UI signal.** If the user is staring at a static screen while the system is working, that's a bug — not a feature gap.

## The Transparency Checklist

Before completing ANY event handler or service method that emits events, answer these five questions:

1. **Does the user know something started?** — Publish a "starting" signal
2. **Does the user know it's still working?** — Show progress (%, step name, or pulse/skeleton)
3. **Does the user know it finished?** — Publish "completed" or update UI state
4. **Does the user know if it failed?** — Show error notification
5. **Does the user know if it timed out?** — Show what happened

If ANY answer is "no" — add the missing signal before shipping.

## Signal Types

| Signal | When to Use | Implementation |
|--------|------------|---------------|
| **Progress message** | Multi-step operations (pipelines, agent runs) | Emit progress event with status and step name |
| **Loading skeleton** | Data being generated/fetched | Component shows skeleton while waiting |
| **Status pulse** | Background work happening | Subtle animation or "working..." indicator |
| **Error notification** | Operation failed | Show error with context |
| **Completion signal** | Work done, UI should update | Emit completed event |

## Pattern: Intermediate Signals for Long Operations

When an operation takes >2 seconds, emit intermediate progress BEFORE the slow work:

```typescript
// Signal that work is starting
await emitProgress({ status: "in_progress", step: "generating", message: "Generating..." });

// Do the slow work
const result = await generateOutput(input);

// Signal completion
await emitProgress({ status: "completed", step: "done", message: "Complete" });
```

## Pattern: Client-Side State Coverage

UI components consuming events handle ALL states:

```tsx
if (!data) return <Skeleton />;
if (data.status === "in_progress") return <ProgressIndicator message={data.message} />;
if (data.status === "failed") return <ErrorState />;
return <Content data={data} />;
```

## Required Signals by Scenario

| Scenario | Required signals |
|----------|-----------------|
| Agent completes a task | "Processing..." -> result ready |
| Timeout expires | "Used default" notification -> dismissed |
| Background job fails | Error notification after retries |
| Long operation running | "Working..." pulse |

## When Adding New Events

1. Ask: "What should the user see when this fires?"
2. If the answer isn't "nothing" — add a signal
3. Add the corresponding client-side consumer
4. Test the full loop: event -> handler -> signal -> UI
