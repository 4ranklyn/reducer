<h1 align="center">Reducer</h1>

<p align="center">
  <em>The song already exists. Clear away everything hiding it.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/works%20with-all%20agents-111111?style=flat-square" alt="Works with all agents">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT license">
  <img src="https://img.shields.io/badge/signal-100%25-111111?style=flat-square" alt="100% signal">
</p>

---

> *"The song is already finished. It exists in its perfect form before you even begin. Your job is simply to clear away everything that is not the song."*  
> — **Rick Rubin**

You are not a writer. You are not a builder. Right now, you are a remover.

Your only job is to find the thing that matters and kill everything around it. Not because the other stuff is bad—because it is in the way.

---

## The One Rule That Overrides Everything

**If removing it makes the thing clearer — cut it. If removing it breaks what the thing IS — keep it.**

That is the entire method. Everything below is how to do it systematically across specs, architectures, code, and strategies.

---

## Commands & Skills

| Command | Skill | What it does |
|:--------|:------|:-------------|
| `/reducer [lite \| full \| ultra \| off]` | `skills/reducer/SKILL.md` | Full subtractive loop: ambient de-reverbing, overshoots the cut ($N \rightarrow C$, discarding 75%), rebuilds strictly from core ($C \approx 0.5 T$), and runs Mute Tests. |
| `/reducer-audit [lite \| full \| ultra]` | `skills/reducer-audit/SKILL.md` | Read-only inspection. Scans for anti-patterns (AP-1 to AP-8), calculates compression ratio, and outputs the cut list. **Never modifies the source.** |
| `/reducer-seed [lite \| full \| ultra]` | `skills/reducer-seed/SKILL.md` | Kernel extraction. Ignores everything except the single heartbeat sentence (< 20 words). No caveats. No fluff. |
| `/reducer-review [lite \| full \| ultra]` | `skills/reducer-review/SKILL.md` | Pre-merge reviewer. Intercepts diffs or draft revisions and flags additive creep, speculative wrappers, and horizontal churn. |
| `/reducer-debt [lite \| full \| ultra]` | `skills/reducer-debt/SKILL.md` | Debt ledger. Harvests `[PLACEHOLDER: ...]` tags and deferred decisions into a structured resolution ledger. |

---

## Intensity Tiers

Reducer operates under three intensity levels, plus an off state. Set the tier via slash command arguments (e.g., `/reducer lite`, `/reducer-audit ultra`) or prompt phrasing:

- **`lite`**: **De-reverbing only.** Strip throat-clearing, hedging qualifiers, and ornamental chrome. Leave secondary structure, nested sections, and optional details intact.
- **`full`** *(Default)*: Full subtractive loop plus Component Identity Fracture tests. Overshoot the cut ($N \rightarrow C$), rebuild strictly from core, and execute the Mute Test.
- **`ultra`**: **Radical fracture stress-test.** Prune to the absolute edge of failure. Challenge foundational premises, strip secondary safety nets, and test survival at raw minimal viability.
- **`off`**: Deactivate ambient reducer constraints and return to host defaults.

---

## Before / After

### A Bloated 20-Page PRD
* **Before:** 18 pages of background context, 4 speculative personas that never get built, 6 future roadmap features, 3 pages explaining why we picked PostgreSQL.
* **With Reducer:** 
  * **The Heartbeat:** *Users can send one-click recurring invoices with automatic Stripe reconciliation.*
  * **Load-bearing:** Invoicing trigger, Stripe webhook handler, idempotency deduplication, atomic rollback.
  * **Cut:** 75% discarded. 2 clean pages, instant team alignment, ship in 1 sprint instead of 6 months.

### Enterprise Architecture
* **Before:** A 5-tier microservice architecture with Kafka, Redis cluster caching, 8 custom generic factory interfaces, and DTO mappers for a tool handling 5 QPS.
* **With Reducer:** One clean service, synchronous transactional writes to Postgres. Zero distributed race conditions.

---

## Benchmark Results (Evals)

Automated evaluation scenarios across verbose memos, bloated PRDs, and enterprise code modules. Tested for Compression Ratio and zero loss of critical load-bearing constraints:

| Fixture | Artifact Type | Original Inventory | Reduced Core | Compression Ratio | Constraints Survived |
|:--------|:--------------|:-------------------|:-------------|:------------------|:---------------------|
| `evals/fixtures/verbose-memo.md` | Executive Memo | | | | |
| `evals/fixtures/bloated-prd.md` | 4-Page PRD | | | | |
| `evals/fixtures/verbose-module.js`| 500-Line Code Module | | | | |

*Run the evals suite locally to populate benchmark telemetry:*
```bash
node evals/run-evals.js
```

---

## Developer Tooling & Automation

### 1. Synchronizing Adapters (`scripts/sync-adapters`)
Reducer maintains strict rule symmetry across platforms. `skills/reducer/SKILL.md` is the single source of truth. All agent rule mirrors (`AGENTS.md`, `.cursor/rules/reducer.md`, `.windsurf/rules/reducer.md`, `.clinerules/reducer.md`) are generated from it:

```bash
# Verify all adapters are up-to-date (exits non-zero on drift)
node scripts/sync-adapters.js --check
# or: ./scripts/sync-adapters.sh --check

# Regenerate all adapters
node scripts/sync-adapters.js
```

### 2. Runtime Debt Scanner (`scripts/debt-scan`)
Scans target files or directories for `[PLACEHOLDER: ...]` tags, `TODO`, and `FIXME` comments, outputting a structured Markdown resolution table. Exits with code `1` if any blocking items exist:

```bash
# Scan whole project
node scripts/debt-scan.js

# Scan specific files or emit JSON
node scripts/debt-scan.js path/to/doc.md
node scripts/debt-scan.js --json path/to/doc.md
```

### 3. Automated Hooks
- **Prose-aware lint hook (`hooks/lint-reverb.js`):** Inspects generated content for throat-clearing openers, hedging qualifiers, empty wrapper sections, and restated headings. Warns only; never blocks or rewrites. Patterns are configured in `hooks/reverb-patterns.json`.
- **Complexity threshold reminder (`hooks/complexity-reminder.js`):** Injects a warning if target files exceed configurable limits (`hooks/complexity-config.json`, defaults to 300 lines / 15KB).

---

## Installation

### Claude Code
Install as a plugin:
```bash
/plugin marketplace add 4ranklyn/reducer
/plugin install reducer@reducer
```

### Cursor
The compact ruleset is pre-configured in `.cursor/rules/reducer.md`. To install globally, copy to `~/.cursor/rules/reducer.md`.

### Windsurf
Rules are located in `.windsurf/rules/reducer.md`.

### Cline
Rules are located in `.clinerules/reducer.md`.

### Antigravity & Generic Agents
Copy `AGENTS.md` to your project root or copy `skills/reducer/` into your `~/.agents/skills/` directory.

---

## License

[MIT](LICENSE). Short and permissive.
