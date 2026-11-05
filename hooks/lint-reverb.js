#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function lintContent(text, filename) {
  const patternsFile = path.join(__dirname, 'reverb-patterns.json');
  if (!fs.existsSync(patternsFile)) return;

  const patterns = JSON.parse(fs.readFileSync(patternsFile, 'utf8'));
  const warnings = [];

  const lower = text.toLowerCase();

  // 1. Throat clearing
  (patterns.throatClearing || []).forEach(pat => {
    if (lower.includes(pat)) {
      warnings.push(`[Throat-Clearing Opener]: Found "${pat}"`);
    }
  });

  // 2. Hedging
  (patterns.hedging || []).forEach(pat => {
    if (lower.includes(pat)) {
      warnings.push(`[Hedging Qualifier]: Found "${pat}"`);
    }
  });

  // 3. Reverb buzzwords
  (patterns.reverbPhrases || []).forEach(pat => {
    if (lower.includes(pat)) {
      warnings.push(`[Reverb Buzzword]: Found "${pat}"`);
    }
  });

  // 4. Empty wrappers
  (patterns.emptyWrappers || []).forEach(regexStr => {
    const rx = new RegExp(regexStr, 'i');
    if (rx.test(text)) {
      warnings.push(`[Empty Wrapper Section]: Found empty section matching ${regexStr}`);
    }
  });

  // 5. Restated heading paragraph (e.g. ## Overview\n\nThis is an overview of...)
  const headingMatch = text.match(/^(#{1,6})\s+([^\n]+)\n+\s*(?:this section|this document|here we discuss|this is)\s+(?:an?\s+)?\2/im);
  if (headingMatch) {
    warnings.push(`[Restated Heading]: Paragraph immediately restates heading "${headingMatch[2]}"`);
  }

  if (warnings.length > 0) {
    console.warn(`\x1b[33m[reducer:lint-reverb] Notice for ${filename || 'artifact'}:\x1b[0m`);
    warnings.forEach(w => console.warn(`  - ${w}`));
    console.warn(`  \x1b[90m(Suggestion: run /reducer-audit or /reducer lite to strip ornamental chrome)\x1b[0m\n`);
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    let stdinData = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => stdinData += chunk);
    process.stdin.on('end', () => lintContent(stdinData, 'stdin'));
  } else {
    args.forEach(file => {
      if (fs.existsSync(file) && fs.statSync(file).isFile()) {
        const text = fs.readFileSync(file, 'utf8');
        lintContent(text, file);
      }
    });
  }
  // WARN ONLY. NEVER BLOCK (exit 0).
  process.exit(0);
}

main();
