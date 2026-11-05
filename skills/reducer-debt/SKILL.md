---
name: reducer-debt
description: >-
  Subtractive debt and placeholder ledger. Scans an artifact for [PLACEHOLDER: ...] tags,
  TODOs, and deferred decisions, compiling them into a structured resolution ledger.
  Use when the user asks for "reducer debt", "list placeholders", "what was deferred",
  or "audit pending decisions".
argument-hint: "[lite|full|ultra]"
version: 2.0.0
tags:
  - debt
  - placeholder
  - ledger
  - deferred-decisions
  - reducer
---

# Reducer Debt

> Don't let deferred decisions turn into invisible rot. Put a tag on the stuck node, finish the frame, then harvest the ledger.

During high-velocity reduction or rapid drafting, teams often encounter Late-Stage Panic (AP-6) or unresolved technical/product decisions. Rather than blocking the entire frame or writing speculative fiction, Reducer marks stuck nodes with `[PLACEHOLDER: ...]` tags.

Reducer Debt harvests these deferred decisions into an explicit, structured resolution ledger so that "later" never turns into "never".

---

## Intensity Tiers

Reducer Debt parses artifacts against the tiers defined in `skills/reducer/SKILL.md`:

- **lite**: Lists explicit `[PLACEHOLDER: ...]` tags only.
- **full** (Default): Compiles all `[PLACEHOLDER]`, `TODO`, `FIXME`, and ungrounded speculative assumptions into the structured ledger.
- **ultra**: Aggressive debt audit. Flags implicit hand-waving, unverified dependencies, and missing boundary contracts as blocking debt.

---

## Output Format

Always present the harvested items in this structured table format:

```
### Reducer Debt Ledger

- **Total Deferred Items:** [N]
- **Blocking Items:** [Count]
- **Non-Blocking Items:** [Count]

| ID | Item | Location | Owner-Decision Needed | Blocking (Y/N) |
|:---|:-----|:---------|:----------------------|:---------------|
| `D-01` | `[Deferred element or placeholder]` | `[File:Line or Section]` | [Exact decision or validation required from human owner] | [Y / N] |
| `D-02` | `...` | `...` | `...` | `...` |

### Recommended Action Order
1. [Highest-priority blocking decision to unlock downstream work]
2. [Next decision]
```
