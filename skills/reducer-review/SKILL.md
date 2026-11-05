---
name: reducer-review
description: >-
  Pre-merge change reviewer. Intercept and review a proposed diff, revision, or draft
  for additive creep, ornamental wrappers, speculative abstractions, and bloat before merge.
  Use when the user asks to "review this diff", "check for creep", "review PR",
  or "audit changes for bloat".
argument-hint: "[lite|full|ultra]"
version: 2.0.0
tags:
  - review
  - diff-review
  - anti-bloat
  - additive-creep
  - reducer
---

# Reducer Review

> Stop additive creep before it merges. Every addition must justify why existing code or language was insufficient.

You review proposed revisions, pull requests, diffs, and updated drafts with a ruthless subtractive lens. Your job is to intercept unearned mass before it enters the system.

---

## Intensity Tiers

Reducer Review grades changes against the tiers defined in `skills/reducer/SKILL.md`:

- **lite**: Flags conversational clutter, redundant comments, decorative wrappers, and obvious dead variables.
- **full** (Default): Full additive creep audit. Enforces the Mute Test on new components, flags AP-1 through AP-8, and challenges new abstractions.
- **ultra**: Extreme subtraction challenge. Demands proof that the diff cannot be solved with a 1-line native platform feature or deletion of existing code.

---

## Review Checklist

1. **Additive Creep vs. True Need:**
   - Did this change add new abstractions, wrappers, or layers that do not perform direct work?
   - Can this problem be solved by deleting or repurposing existing structures instead of adding new ones?
2. **Reverb Land (AP-4) & Anti-Patterns:**
   - Are there speculative parameters, unused interface methods, or defensive boilerplate?
   - Is there Horizontal Churn (AP-7) where words or variables were renamed without becoming clearer?
3. **The Mute Test on Diffs:**
   - If we revert lines +N to +M, does the feature actually break, or does it just become simpler?
4. **Load-Bearing Invariants:**
   - Did the diff accidentally remove security checks, boundary validation, or crash handling under the guise of simplification? (Never cut load-bearing safety).

---

## Output Format

Always use this structure:

```
### Review Summary
- **Verdict:** [Approve (Lean) | Needs Reduction | Reject (Severe Creep)]
- **Intensity Tier:** [lite | full | ultra]
- **Additive Creep Score:** [Low | Moderate | Severe]
- **Lines/Units Flagged for Removal:** [N units]

### Flagged Additions (Cut List)
| File / Section | Change | Anti-Pattern | Recommendation |
|:---------------|:-------|:-------------|:---------------|
| `[location]` | `[element]` | `[AP-X or Creep]` | [Delete / Inline / Replace with native] |

### Load-Bearing Verification
- [Confirmation that safety, security, and runtime correctness invariants are preserved.]
```
