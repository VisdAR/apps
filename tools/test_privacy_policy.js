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
for (const credit of ['CFDICT', 'David Houstin', 'CC-CEDICT', 'Unicode / Unihan 17.0.0', 'LXGW WenKai GB 1.522', 'CC BY-SA 3.0', 'CC BY-SA 4.0', 'Unicode License v3']) {
  expect(cles.includes(credit), `部首政策缺少来源或许可：${credit}`);
}
expect(cles.includes('ne sont donc pas présentés comme une transcription vérifiée'), '应保留新华字典名称尚未逐项核实的限制说明。');
expect(!cles.includes('CNS11643') && !cles.includes('Ministry of Digital Affairs'), '未使用的 CNS11643 来源不应继续出现在部首应用政策中。');
expect(index.includes('privacy/cles.html') && readme.includes('com.visdar.cles'), '站点首页和 README 应登记部首应用。');
for (const file of ['privacy/cles.html', 'privacy/evidence/cles/index.html']) {
  const content = read(file);
  for (const [, url] of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#)/.test(url)) continue;
    expect(fs.existsSync(path.resolve(root, path.dirname(file), url)), `${file} 中的本地链接不存在：${url}`);
  }
}
const crypto = require('crypto');
const math = read('privacy/math.html');
for (const lang of ['zh', 'fr', 'en']) {
  expect((math.match(new RegExp(`<section id="policy-${lang}" lang="${lang}"`, 'g')) || []).length === 1, `数字政策必须包含 ${lang} 隐私说明。`);
  expect(math.includes(`aria-controls="policy-${lang}"`), `数字政策语言按钮必须关联 ${lang} 内容。`);
}
expect(math.includes('com.visdar.chiffres'), '数字政策必须使用真实包名。');
expect(math.includes('android:allowBackup="false"') && math.includes('No Internet permission') && math.includes('Pas de permission Internet'), '数字政策必须准确说明禁用备份与无联网权限。');
expect(math.includes('GitHub Pages') && math.includes('GitHub 隐私声明') && math.includes('General Privacy Statement'), '数字政策必须区分离线 App 与 GitHub Pages 网页访问。');
expect(math.includes('privacy') === true && !/allowBackup="true"|AdMob|Firebase|Crashlytics/.test(math), '数字政策不能复制其它应用的不适用数据处理声明。');
expect(index.includes('privacy/math.html') && index.includes('privacy/evidence/math/'), '站点首页必须链接数字政策和证据页。');
expect(readme.includes('com.visdar.chiffres') && readme.includes('privacy/math.html'), '仓库 README 必须登记数字应用。');
for (const file of ['privacy/math.html', 'privacy/evidence/math/index.html']) {
  const content = read(file);
  for (const [, url] of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#)/.test(url)) continue;
    expect(fs.existsSync(path.resolve(root, path.dirname(file), url)), `${file} 中的本地链接不存在：${url}`);
  }
}
for (const line of read('privacy/evidence/math/SHA256SUMS.txt').trim().split('\n')) {
  const [hash, relative] = line.split(/  /);
  const bytes = fs.readFileSync(path.join(root, 'privacy/evidence/math', relative));
  expect(crypto.createHash('sha256').update(bytes).digest('hex') === hash, `数字许可截图或许可证完整性失败：${relative}`);
}
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
console.log('PASS: trilingual privacy policies, local links, font files and licence-evidence integrity');
