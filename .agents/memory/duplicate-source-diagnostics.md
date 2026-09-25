---
name: Duplicate source diagnostics
description: How to recognize and contain generated duplicate source/config content before renaming declarations.
---

When many unrelated block-scoped declarations fail at once, first compare file length and repeated top-level markers against the last known-good version. Appended duplicate source and concatenated duplicate JSON can cause both compile-time and runtime failures.

**Why:** Renaming individual variables masks the actual corruption and leaves duplicated side effects, timers, handlers, and configuration data.

**How to apply:** Inspect source boundaries and JSON parse boundaries first; isolate or remove only the repeated tail, then run both the language checks and the live workflow/browser verification.