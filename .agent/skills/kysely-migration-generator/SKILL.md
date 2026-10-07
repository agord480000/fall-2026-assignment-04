---
name: kysely-migration-generator
description: reads a mermaid erd file and generates a type-safe kysely migration script. triggers when requested to generate a kysely migration for existing erd
---

## Translation Rules
**Entities to Tables:** Map Mermaid entities to snake_case table names (e.g., `USERS` to `users`).
**Keys & Columns:** Convert `PK` attributes to auto-generating IDs/UUIDs and `FK` attributes to `.references().onDelete('cascade')`.
**Cardinalities:** Correctly map `||--o{` (one-to-many) and `||--o|` (one-to-one with unique constraints).
**File Output:** Write the generated TypeScript migration to `src/db/migrations/<timestamp>_<migration_name>.ts`.
**Structure:** Enforce exports for both `up(db: Kysely<any>)` and `down(db: Kysely<any>)` functions. The `down` function must drop tables in reverse dependency order.