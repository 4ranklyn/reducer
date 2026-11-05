#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function checkFileComplexity(filePath) {
  const configFile = path.join(__dirname, 'complexity-config.json');
  let config = { maxLines: 300, maxBytes: 15000 };
  if (fs.existsSync(configFile)) {
    try {
      config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    } catch (_) {}
  }

  if (!fs.existsSync(filePath)) return;
  const stat = fs.statSync(filePath);
  if (!stat.isFile()) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const lineCount = content.split(/\r?\n/).length;

  if (lineCount > config.maxLines || stat.size > config.maxBytes) {
    const limitDesc = lineCount > config.maxLines ? `${config.maxLines} lines` : `${config.maxBytes} bytes`;
    const msg = (config.reminder || '[reducer] Target file exceeds complexity threshold (> %LIMIT%).')
      .replace('%LIMIT%', limitDesc);
    console.log(`\x1b[36m${msg} (${path.relative(process.cwd(), filePath)}: ${lineCount} lines, ${(stat.size / 1024).toFixed(1)}KB)\x1b[0m`);
  }
}

function main() {
  const files = process.argv.slice(2);
  files.forEach(f => checkFileComplexity(f));
  process.exit(0);
}

main();
