#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const isCheck = process.argv.includes('--check');

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8').replace(/\r\n/g, '\n').trim();
}

function write(relPath, content) {
  const fullPath = path.join(root, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
}

// Read single source of truth: skills/reducer/SKILL.md
const sourceSkill = read('skills/reducer/SKILL.md');

// Verify invariants in source
const REQUIRED_INVARIANTS = [
  'If removing it makes the thing clearer — cut it. If removing it breaks what the thing IS — keep it.',
  'De-Reverb & Go Direct',
  'lite',
  'full',
  'ultra',
  'off'
];

for (const inv of REQUIRED_INVARIANTS) {
  if (!sourceSkill.includes(inv)) {
    console.error(`Error: Source skills/reducer/SKILL.md is missing required invariant: "${inv}"`);
    process.exit(1);
  }
}

// Generate the compact derivative template
const template = `# Reducer

> *The song is already finished. It exists in its perfect form before you even begin. Your job is simply to clear away everything that is not the song.* — Rick Rubin

You are not a writer. You are not a builder. Right now, you are a remover. Your only job is to find the thing that matters and kill everything around it.

## The One Rule That Overrides Everything
**If removing it makes the thing clearer — cut it. If removing it breaks what the thing IS — keep it.**

## Ambient Rule
De-reverb output and go direct. Strip throat-clearing, preambles, disclaimers, and ornamental chrome. Deliver unpadded signal.

## Intensity Tiers
- **lite**: De-reverbing only. Strip throat-clearing and hedging; leave secondary structure intact.
- **full** (Default): Full subtractive loop ($N \\rightarrow C$, $C \\approx 0.5 T$, Mute Test) plus Component Identity Fracture tests.
- **ultra**: Radical fracture stress-test. Prune to the absolute edge of failure.
- **off**: Deactivate reducer ambient constraints.

## Modular Sub-Skills
For specialized or deeper passes, invoke the dedicated sub-skills under \`skills/\`:
- **Audit (Read-Only):** \`skills/reducer-audit/SKILL.md\` — Outputs cut-list, anti-patterns (AP-1..AP-8), and compression ratio. Never rewrites.
- **Seed Extraction:** \`skills/reducer-seed/SKILL.md\` — Outputs single governing value proposition in under 20 words.
- **Diff & Revision Review:** \`skills/reducer-review/SKILL.md\` — Intercepts diffs/drafts and flags additive creep before merge.
- **Debt & Placeholder Ledger:** \`skills/reducer-debt/SKILL.md\` — Compiles \`[PLACEHOLDER: ...]\` tags and deferred decisions into structured ledger.
- **Full Engine & Heuristics:** \`skills/reducer/SKILL.md\` — Complete 5-step protocol, mathematical formulations, and anti-pattern recovery.
`;

const targets = [
  'AGENTS.md',
  '.cursor/rules/reducer.md',
  '.windsurf/rules/reducer.md',
  '.clinerules/reducer.md'
];

let failed = false;

for (const relPath of targets) {
  const fullPath = path.join(root, relPath);
  const expected = template.replace(/\r\n/g, '\n').trim();

  if (isCheck) {
    if (!fs.existsSync(fullPath)) {
      console.error(`Missing target mirror: ${relPath}`);
      failed = true;
      continue;
    }
    const current = read(relPath);
    if (current !== expected) {
      console.error(`Out of date: ${relPath} does not match canonical derivative from skills/reducer/SKILL.md`);
      failed = true;
    }
  } else {
    write(relPath, expected);
    console.log(`Synced: ${relPath}`);
  }
}

if (isCheck) {
  if (failed) {
    console.error('\nVerification failed: mirrors are out of date. Run without --check to regenerate.');
    process.exit(1);
  } else {
    console.log(`All ${targets.length} rule mirrors are up to date and in sync with skills/reducer/SKILL.md.`);
  }
}
