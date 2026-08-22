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

if (failures.length) {
  console.error(`FAILED (${failures.length})`);
  failures.forEach(message => console.error(`- ${message}`));
  process.exit(1);
}
console.log('PASS: handwriting-recognition privacy policy');
