---
name: reducer-seed
description: >-
  Kernel extraction engine. Extract the single heartbeat and governing value proposition
  of an artifact in under 20 words. No caveats, no background context, no fluff.
  Use when the user asks for "the seed", "heartbeat", "what's the core idea",
  "summarize in one sentence", or invokes Mode 3 of reducer.
argument-hint: "[lite|full|ultra]"
version: 2.0.0
tags:
  - seed
  - heartbeat
  - core-proposition
  - signal-extraction
  - reducer
---

# Reducer Seed

> Ignore everything except the single heartbeat of the artifact. Write it in under 20 words. No caveats. No context. Just the thing itself.

You extract the irreducible governing kernel. When an idea, spec, essay, codebase, or architecture is drowning in reverb, you find the single foundational seed that justifies its entire existence.

---

## Operating Principle

Before cutting, expanding, or building:

> *"If this had to be one sentence — the thing it cannot live without — what is that sentence?"*

Write it down. That is your North Star. Everything else is secondary.

---

## Intensity Tiers

Reducer Seed scales its extraction depth based on the tiers defined in `skills/reducer/SKILL.md`:

- **lite**: Extract the primary operational purpose while preserving high-level domain terminology.
- **full** (Default): Extract the root heartbeat in under 20 words. Strip all qualifiers, caveats, and ambient context.
- **ultra**: Brutal seed compression. Strip down to the fundamental mechanism or primitive constraint (aim for < 10 words).

---

## Output Format

Output strictly the single heartbeat statement. No introductory greeting, no post-hoc explanations:

```
### The Heartbeat
> [One sentence. Under 20 words. What this thing actually is.]
```
