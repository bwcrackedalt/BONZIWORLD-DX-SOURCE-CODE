---
name: Server runtime module format
description: Durable compatibility constraints for running the server with the repository's pinned tsx version.
---

The server must run as ESM because its database module uses top-level await. The installed tsx version is too old to parse JSON import attributes reliably, so JSON configuration should be loaded through the filesystem using import.meta.url instead. Replit PostgreSQL uses DATABASE_URL or PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE, not PG_URL/PG_USER/PG_PASSWORD.

**Why:** Keeping the package as CommonJS causes top-level-await failures, while newer JSON import syntax causes parse failures with the pinned runner. Using the wrong PostgreSQL variable names silently targets localhost.

**How to apply:** Preserve the server package's ESM type and use version-compatible imports when changing startup or configuration loading.