#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const policy = read('privacy/reconnaissance.html');
const index = read('index.html');
const readme = read('README.md');
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

expect(policy.includes('com.visdar.manuscrits'), '政策必须使用手写识别应用的真实包名。');
expect((policy.match(/<section lang="zh"/g) || []).length === 1, '必须有中文政策。');
expect((policy.match(/<section lang="fr"/g) || []).length === 1, '必须有法语政策。');
expect((policy.match(/<section lang="en"/g) || []).length === 1, '必须有英语政策。');
expect(policy.includes('allowBackup="true"') && policy.includes('无 INTERNET 权限'), '政策必须准确说明自动备份与无网络权限。');
expect(policy.includes('HanziLookupJS') && policy.includes('CFDICT'), '政策必须透明说明随 APK 分发的离线数据来源。');
expect(index.includes('privacy/reconnaissance.html'), '站点首页必须链接到该政策。');
expect(readme.includes('com.visdar.manuscrits'), '仓库 README 必须登记该应用。');

const cles = read('privacy/cles.html');
expect(cles.includes('com.visdar.cles'), '部首政策必须使用真实包名。');
expect(!/com\.visdar\.dialectes|Common Voice|passerelle vocale|microphone|麦克风/.test(cles), '不能把方言应用的功能或来源复制进部首政策。');
for (const lang of ['zh', 'fr', 'en']) {
  expect((cles.match(new RegExp(`<section lang="${lang}"`, 'g')) || []).length === 1, `部首政策必须包含 ${lang} 隐私说明。`);
  expect(cles.includes(`aria-controls="policy-${lang}"`), '语言按钮必须关联对应的内容。');
}
expect(cles.includes('Les sauvegardes Android de l’application sont désactivées.'), '部首政策应说明已禁用 Android 备份。');
expect(cles.includes('aucune permission Android') && cles.includes('stockage local de la WebView'), '部首政策应准确说明无权限和收藏的本地存储。');
for (const credit of ['CFDICT', 'David Houstin', 'Unicode / Unihan 17.0.0', 'LXGW WenKai GB 1.522', 'CNS11643', 'CC BY-SA 3.0', 'Government Data Open License 1.0']) {
  expect(cles.includes(credit), `部首政策缺少来源或许可：${credit}`);
}
expect(cles.includes('ne sont donc pas présentés comme une transcription vérifiée'), '应保留新华字典名称尚未逐项核实的限制说明。');
expect(index.includes('privacy/cles.html') && readme.includes('com.visdar.cles'), '站点首页和 README 应登记部首应用。');
for (const file of ['privacy/cles.html', 'privacy/evidence/cles/index.html']) {
  const content = read(file);
  for (const [, url] of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#)/.test(url)) continue;
    expect(fs.existsSync(path.resolve(root, path.dirname(file), url)), `${file} 中的本地链接不存在：${url}`);
  }
}
const crypto = require('crypto');
const font = fs.readFileSync(path.join(root, 'privacy/assets/cles/LXGWWenKaiGB-Regular.ttf'));
expect(crypto.createHash('sha256').update(font).digest('hex') === '295568c131648062107543aa159c97dd49564be791136c2abf74cad83eba3f7f', '楷体字体必须保持官方原始文件。');
const evidenceRoot = 'privacy/evidence/cles/evidence';
for (const line of read(`${evidenceRoot}/SHA256SUMS.txt`).trim().split('\n')) {
  const [hash, relative] = line.split(/  /);
  const bytes = fs.readFileSync(path.join(root, evidenceRoot, relative));
  expect(crypto.createHash('sha256').update(bytes).digest('hex') === hash, `截图与许可文档必须保持原样：${relative}`);
}

if (failures.length) {
  console.error(`FAILED (${failures.length})`);
  failures.forEach(message => console.error(`- ${message}`));
  process.exit(1);
}
console.log('PASS: handwriting-recognition and radical-lookup privacy policies, links, font and evidence integrity');
