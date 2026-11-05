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

## Before / After

### A Bloated 20-Page PRD
* **Before:** 18 pages of background context, 4 user personas that never get built, 6 speculative roadmap features, 3 pages explaining why we chose a database.
* **With Reducer:** 
  * **The Heartbeat:** *Users can send one-click recurring invoices with automatic Stripe reconciliation.*
  * **Load-bearing:** Invoicing trigger, Stripe webhook handler, idempotency deduplication.
  * **Cut:** 75% discarded. 2 clean pages, instant team alignment, ship in 1 sprint instead of 6 months.

### Enterprise Over-Engineering
* **Before:** A 5-tier microservice architecture with Kafka, Redis caching, 8 custom generic factory interfaces, and DTO mappers for a tool doing 5 QPS.
* **With Reducer:** One clean service, synchronous transactional writes to Postgres. Zero distributed race conditions.

---

## How It Works: The Protocol

Reducer works through five non-negotiable steps:

```
[ 1. Find Heartbeat ] ──> [ 2. Strip Opening ] ──> [ 3. Overshoot Cut (-75%) ] ──> [ 4. Rebuild from Core ] ──> [ 5. Mute Test ]
```

1. **Find the Heartbeat:** State in one sentence (<20 words) what the artifact cannot live without.
2. **Strip the Opening (A Cappella):** Cut the first 20%—the warm-ups, disclaimers, background, and throat-clearing.
3. **Overshoot the Cut:** Cut 75% on purpose. Force every surviving piece to justify its right to exist.
4. **Rebuild from the Core:** Only put back what makes the core *stronger*, never what just makes it *bigger*.
5. **The Mute Test:** Mute each piece one by one. If it gets cleaner without it, permanent cut. If it breaks, it is **load-bearing**.

---

## The Three Modes

| Mode | Command / Prompt | What it does |
|:-----|:-----------------|:-------------|
| **Mode 1: Audit** | `/reducer audit` or *"Audit this, show me the cut list"* | Read-only inspection. Identifies what is carrying weight, what is noise, and outputs the cut table without altering your file. |
| **Mode 2: Reduce** | `/reducer` or *"Reduce this"*, *"Cut the fat"*, *"Be brutal"* | Full protocol execution. Strips the artifact and outputs the lean, production-ready result. |
| **Mode 3: Seed** | `/reducer seed` or *"Give me the seed of this"* | Ignores everything except the single heartbeat sentence (< 20 words). No caveats. No fluff. |

---

## What Reducer Cuts vs. Keeps

| Target | What Got Cut (Reverb & Noise) | What Stays (Load-Bearing) |
|:-------|:------------------------------|:--------------------------|
| **PRDs / Specs** | Preamble, throat-clearing, hypothetical edge cases, ungrounded metrics, speculative roadmap phases. | Single-sentence core user outcome, failure states, boundary seams, falsifiable telemetry events. |
| **Architecture** | Premature caching layers, generic factory wrappers, unnecessary event buses, speculative microservices. | Ingestion endpoints, transactional boundaries, idempotency checks, network timeouts. |
| **Codebases** | Unused interface abstractions, dead DTO mappers, horizontal renames, defensive boilerplate. | Core business logic, runtime correctness, trust-boundary validation, security & data-loss handling. |

---

## The 8 Deraillers to Kill

Reducer explicitly identifies and blocks these anti-patterns:

1. **Killing seeds too early:** Critiquing a raw 1-line idea before letting it breathe.
2. **Head-arguing:** Debating theory endlessly instead of building a quick test of both options.
3. **Genre pressure:** Adding sections just because "a standard PRD/architecture doc should have this."
4. **Reverb Land:** Hiding weak signal beneath jargon, nested wrappers, or hedging qualifiers.
5. **Sunk cost defense:** Keeping a component because "we spent 3 weeks on it." (Effort is not load).
6. **Late-stage panic:** Trying to tear down the architecture at 80% completion instead of shipping the frame.
7. **Horizontal churn:** Rewording the same sentence 6 times without making it clearer.
8. **Audience-pleasing:** Padding content to satisfy an algorithm, committee, or formula.

---

## Install & Setup

### Claude Code / Codex / Gemini CLI
Copy the skill folder into your agent's skills directory:
```bash
# Global agent skills directory
cp -r skills/reducer ~/.agents/skills/
```

### Any Other Agent (Cursor, Windsurf, Copilot, Antigravity)
Add [`AGENTS.md`](AGENTS.md) to your workspace root or copy [`skills/reducer/SKILL.md`](skills/reducer/SKILL.md) into your prompt configuration.

---

## FAQ

**Can Reducer be used on codebases?**  
Yes. Reducer ruthlessly strips dead design patterns, premature abstractions, and wrapper theater. Unlike normal refactoring, it will collapse whole architectural layers if they don't carry real weight.

**Is Reducer basically Ponytail?**  
No. **Ponytail** is a lazy senior developer who *adds the smallest possible diff* to satisfy a ticket while keeping existing conventions. **Reducer** is an architect with a sledgehammer who *deletes existing bloat* down to its runtime soul.

**Will Reducer break data safety or security?**  
No. Reducer's Mute Test specifically marks trust-boundary validation, security checks, and data-loss mitigations as **load-bearing**—they can never be cut.

---

## License

[MIT](LICENSE). Short and permissive.
