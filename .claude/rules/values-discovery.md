---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.py"
  - "**/*.js"
  - "**/*.jsx"
---

# Values: Discovery & Reuse

## Read Reference Code First

Read reference implementations before writing any code. Every line of code should match existing patterns in the codebase.

## Core Principle: Reuse Before Create

Always prioritize discovering and reusing existing patterns, components, and solutions before creating new ones.

**The discovery process:**
1. **Read the PRD/requirements first** — understand functional requirements
2. Identify what you're building (API route, service, component, etc.)
3. Find 2-3 reference implementations of the same type
4. Read the reference code in full
5. Copy the structure and patterns exactly
6. Only adapt the business logic specific to your feature

### Decision Hierarchy

1. **Discover**: Search for existing implementations in the codebase
2. **Reuse**: Leverage what already exists — use existing components, follow established patterns
3. **Improve**: Enhance existing code only when necessary — extend rather than replace
4. **Create**: Build new solutions only when there's a clear gap — verify no existing solution can be adapted

### Why This Matters

- **Consistency**: Reusing patterns maintains architectural coherence
- **Velocity**: Leveraging existing work accelerates development
- **Maintenance**: Fewer unique implementations means easier codebase navigation
- **Quality**: Battle-tested code is more reliable than new code

### Examples

**Good**: "I need a validation schema -> use the same pattern from an existing module"
**Bad**: "I need a validation schema -> create a custom validation approach"

**Good**: "This component is 80% what I need -> extend it with new props"
**Bad**: "This component is 80% what I need -> build a new one from scratch"

### Questions to Ask Before Creating

1. Does this already exist in the codebase?
2. Can I adapt an existing pattern to fit this need?
3. Have I READ a reference implementation first?
4. Does my code look structurally identical to the reference?
5. If I build this, will it be reusable for future features?
6. Am I introducing a new pattern when an established one exists?

---

**Remember**: The best code is the code you don't have to write. The second-best code is code that looks identical to existing patterns. Discover, reuse, then improve or create only when justified.
