# Project Context — Example

> Replace this file with your project's actual context. This example shows the expected format.

## Identity

TaskFlow — Task management SaaS for small engineering teams.
North Star: Teams ship faster because TaskFlow removes coordination overhead.

## Stack

TypeScript | React | Next.js | PostgreSQL | Prisma | Zod | Tailwind CSS

## Architecture

Modular monolith with clean separation between domain, application, and infrastructure layers.

**Key patterns:**
- Services handle business logic
- Repositories encapsulate data access
- Zod schemas are the single source of truth for types
- API routes use higher-order functions for auth and validation

## Key Paths

- Source code: `src/`
- API routes: `src/app/api/`
- Shared utilities: `src/lib/`
- Architecture docs: `docs/`
