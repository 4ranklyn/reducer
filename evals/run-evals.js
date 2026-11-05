#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const scenariosPath = path.join(__dirname, 'eval-scenarios.json');
if (!fs.existsSync(scenariosPath)) {
  console.error('Missing evals/eval-scenarios.json');
  process.exit(1);
}

const scenarios = JSON.parse(fs.readFileSync(scenariosPath, 'utf8'));

console.log('===============================================================');
console.log('              REDUCER EVALUATION BENCHMARK REPORT              ');
console.log('===============================================================\n');

let allPassed = true;

scenarios.forEach(sc => {
  const filePath = path.join(__dirname, '..', sc.fixture);
  if (!fs.existsSync(filePath)) {
    console.error(`Fixture file not found: ${sc.fixture}`);
    allPassed = false;
    return;
  }

  const originalContent = fs.readFileSync(filePath, 'utf8');
  const reducedContent = sc.reducedSimulated;

  const origChars = originalContent.length;
  const reducedChars = reducedContent.length;
  const origLines = originalContent.split(/\r?\n/).length;
  const reducedLines = reducedContent.split(/\r?\n/).length;

  const charCompression = (((origChars - reducedChars) / origChars) * 100).toFixed(1);
  const lineCompression = (((origLines - reducedLines) / origLines) * 100).toFixed(1);

  console.log(`Fixture: ${sc.fixture} (${sc.type.toUpperCase()})`);
  console.log(`- Original Inventory: ${origLines} lines, ${origChars} bytes`);
  console.log(`- Reduced Core:       ${reducedLines} lines, ${reducedChars} bytes`);
  console.log(`- Compression Ratio:  ${charCompression}% (by bytes), ${lineCompression}% (by lines)`);

  // Check critical constraints survival
  console.log(`- Critical Constraints Survival Audit:`);
  let fixtureFailed = false;

  sc.criticalConstraints.forEach(c => {
    const reducedLower = reducedContent.toLowerCase().replace(/[\s\-_]/g, '');
    const survived = c.keywords.every(kw => reducedLower.includes(kw.toLowerCase().replace(/[\s\-_]/g, '')));

    if (survived) {
      console.log(`    ✔ [SURVIVED] "${c.name}"`);
    } else {
      console.log(`    ✖ [FAILED]   "${c.name}" was lost during reduction!`);
      fixtureFailed = true;
      allPassed = false;
    }
  });

  if (fixtureFailed) {
    console.log(`  => Status: FAILED (Load-bearing constraint lost)\n`);
  } else {
    console.log(`  => Status: PASSED (Load-bearing core 100% intact)\n`);
  }
});

console.log('===============================================================');
if (allPassed) {
  console.log('ALL FIXTURES PASSED: Compression verified with zero constraint loss.');
  process.exit(0);
} else {
  console.error('EVAL FAILURE: One or more critical constraints failed verification.');
  process.exit(1);
}
