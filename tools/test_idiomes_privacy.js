#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const policyPath = path.join(root, 'privacy', 'idiomes.html');
const evidenceRoot = path.join(root, 'privacy', 'evidence', 'idiomes');
const html = fs.readFileSync(policyPath, 'utf8');
const evidenceHtml = fs.readFileSync(path.join(evidenceRoot, 'index.html'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(evidenceRoot, 'manifest.json'), 'utf8'));

function check(condition, message) {
  if (!condition) throw new Error(message);
  console.log('✓', message);
}

check(/id="policy-zh"[^>]*lang="zh-CN"/.test(html), 'Chinese policy panel exists');
check(/id="policy-fr"[^>]*lang="fr"/.test(html), 'French policy panel exists');
check(/id="policy-en"[^>]*lang="en"/.test(html), 'English policy panel exists');
check((html.match(/<button[^>]+role="tab"/g) || []).length === 3, 'three accessible language tabs exist');
for (const lang of ['zh', 'fr', 'en']) {
  check(html.includes(`aria-controls="policy-${lang}"`), `${lang} tab controls its panel`);
}
check(html.includes('com.visdar.expressions'), 'correct application ID is disclosed');
check(html.includes('android:allowBackup=&quot;false&quot;') || html.includes('android:allowBackup="false"'), 'disabled Android backup is disclosed');
check(html.includes('<code>INTERNET</code>'), 'absence of INTERNET permission is disclosed');
check(/100 (?:条教学词条|fiches pédagogiques|teaching entries)/.test(html), '100-entry, non-exhaustive scope is disclosed');
check(html.includes('CFDICT') && html.includes('CC BY-SA 3.0'), 'CFDICT attribution and license are disclosed');
check(html.includes('GitHub Pages') && html.includes('github-general-privacy-statement'), 'GitHub Pages website processing is distinguished');
check(html.includes('evidence/idiomes/'), 'policy links to the evidence archive');
check(fs.existsSync(path.join(root, 'privacy', 'assets', 'idiomes', 'logo.jpg')), 'app logo exists');

for (const item of manifest.items) {
  const fullPath = path.join(evidenceRoot, item.file);
  check(fs.existsSync(fullPath), `${item.file} exists`);
  const data = fs.readFileSync(fullPath);
  const digest = crypto.createHash('sha256').update(data).digest('hex');
  check(data.length === item.size, `${item.file} byte size matches manifest`);
  check(digest === item.sha256, `${item.file} SHA-256 matches manifest`);
  check(evidenceHtml.includes(item.file), `${item.file} is linked from evidence gallery`);
}

for (const rel of ['licenses/CC-BY-SA-3.0.txt', 'licenses/MOE-idioms-use-conditions.pdf', 'manifest.json', 'SHA256SUMS.txt', 'README.md']) {
  check(fs.existsSync(path.join(evidenceRoot, rel)), `${rel} exists`);
  check(evidenceHtml.includes(rel), `${rel} is linked from evidence gallery`);
}

check(fs.readFileSync(path.join(root, 'index.html'), 'utf8').includes('privacy/idiomes.html'), 'site index links to the policy');
console.log('\nAll idiomes privacy checks passed.');
