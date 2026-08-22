#!/usr/bin/env node
'use strict';

/*
 * Read-only audit of CFDICT entries that have the same spelling and pinyin
 * syllables but differ in tone.  It deliberately makes no recommendation to
 * merge them: lexical meanings must be reviewed by a human.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'THIRD_PARTY_NOTICES', 'CFDICT.u8');
const output = path.join(root, 'reports', 'cfdict-tone-variant-audit.md');
const entry = /^(\S+)\s+(\S+)\s+\[([^\]]+)]\s+\/(.*)\/$/;
const marks = { a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', ü: 'ǖǘǚǜ' };

function markPinyin(value) {
  return value.replace(/([A-Za-zÜüVv:]+)([1-5])/g, (_, raw, toneText) => {
    const tone = Number(toneText);
    let syllable = raw.replace(/u:/gi, value => value === 'U:' ? 'Ü' : 'ü')
      .replace(/[vV]/g, value => value === 'V' ? 'Ü' : 'ü');
    if (tone === 5) return syllable;
    const lower = syllable.toLowerCase();
    let index = lower.indexOf('a');
    if (index < 0) index = lower.indexOf('e');
    if (index < 0 && lower.includes('ou')) index = lower.indexOf('o');
    if (index < 0) for (let i = lower.length - 1; i >= 0; i -= 1) if ('aeiouü'.includes(lower[i])) { index = i; break; }
    if (index < 0) return syllable;
    const original = syllable[index];
    const accented = marks[original.toLowerCase()][tone - 1];
    return syllable.slice(0, index) + (original === original.toUpperCase() ? accented.toUpperCase() : accented) + syllable.slice(index + 1);
  });
}

function noToneKey(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[1-5]/g, '').replace(/u:/gi, 'v').replace(/\s+/g, ' ').toLowerCase();
}

const groups = new Map();
for (const line of fs.readFileSync(source, 'utf8').split(/\r?\n/)) {
  const match = line.match(entry);
  if (!match) continue;
  const [, traditional, simplified, pinyin, definitionText] = match;
  const item = { traditional, simplified, pinyin: markPinyin(pinyin), definitions: definitionText.split('/').filter(Boolean) };
  const key = `${traditional}\t${simplified}\t${noToneKey(pinyin)}`;
  const group = groups.get(key) || [];
  group.push(item);
  groups.set(key, group);
}

const candidates = [...groups.values()]
  .filter(group => new Set(group.map(item => item.pinyin)).size > 1)
  .sort((left, right) => left[0].simplified.localeCompare(right[0].simplified, 'zh'));

const lines = [
  '# CFDICT 同形同音节、仅声调不同：人工核对表',
  '',
  `生成日期：2026-08-22。来源：\`THIRD_PARTY_NOTICES/CFDICT.u8\`。共 **${candidates.length} 组**、**${candidates.reduce((sum, group) => sum + group.length, 0)} 条**。`,
  '',
  '规则：同一繁简写法、去除声调后的拼音相同。**本表不表示可合并**；不同读音可能就是不同词义。',
  ''
];

for (const group of candidates) {
  const labels = group.map(item => item.definitions.join('；'));
  const status = new Set(labels).size === 1 ? '释义相同，仍需核对来源' : '释义不同，必须分别保留';
  lines.push(`## ${group[0].simplified}${group[0].traditional === group[0].simplified ? '' : `（${group[0].traditional}）`} — ${status}`, '');
  for (const item of group) lines.push(`- **${item.pinyin}**：${item.definitions.join('；')}`);
  lines.push('');
}

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${lines.join('\n')}\n`, 'utf8');
console.log(`${candidates.length} groups -> ${output}`);
