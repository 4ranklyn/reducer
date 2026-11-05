const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const scriptPath = path.join(__dirname, '..', 'scripts', 'debt-scan.js');
const fixturePath = path.join(__dirname, 'fixtures', 'sample-debt.md');

test('debt-scan outputs markdown and exits 1 on blocking items', () => {
  const result = spawnSync('node', [scriptPath, fixturePath], { encoding: 'utf8' });
  
  assert.equal(result.status, 1, 'Expected exit code 1 due to blocking debt item');
  assert.match(result.stdout, /### Reducer Debt Ledger/, 'Expected markdown header');
  assert.match(result.stdout, /- \*\*Total Deferred Items:\*\* 3/, 'Expected 3 items');
  assert.match(result.stdout, /- \*\*Blocking Items:\*\* 1/, 'Expected 1 blocking item');
  assert.match(result.stdout, /auth-token-exchange/, 'Expected auth token exchange item');
  assert.match(result.stdout, /caching-strategy-v2/, 'Expected caching strategy item');
});

test('debt-scan --json outputs structured json payload', () => {
  const result = spawnSync('node', [scriptPath, '--json', fixturePath], { encoding: 'utf8' });
  
  assert.equal(result.status, 1, 'Expected exit code 1');
  const data = JSON.parse(result.stdout);
  assert.equal(data.total, 3);
  assert.equal(data.blocking, 1);
  assert.equal(data.nonBlocking, 2);
  assert.equal(data.items[0].blocking, true);
  assert.equal(data.items[1].blocking, false);
});
