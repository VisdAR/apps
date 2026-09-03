const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const html = read('privacy/math.html');
assert(html.includes('数字 Nombres'));
assert(!html.includes('Chiffres') && !html.includes('Version 2.2'));
assert(html.includes('com.visdar.chiffres'));
assert(html.includes('android:allowBackup="false"'));
assert(html.includes('No Internet permission'));
assert(html.includes('Pas de permission Internet'));
assert(html.includes('GitHub Pages'));
assert(html.includes('voluntarily email') && html.includes('volontairement un courriel') && html.includes('主动发送邮件'));
assert(!/<script[^>]+src=|localStorage|fetch\(/.test(html));
for (const lang of ['zh', 'fr', 'en']) {
  assert(html.includes(`<section id="policy-${lang}" lang="${lang}"`));
  assert(html.includes(`aria-controls="policy-${lang}"`));
}
for (const file of ['privacy/math.html', 'privacy/evidence/math/index.html']) {
  for (const [, url] of read(file).matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#)/.test(url)) continue;
    assert(fs.existsSync(path.resolve(root, path.dirname(file), url)), `${file}: ${url}`);
  }
}
for (const line of read('privacy/evidence/math/SHA256SUMS.txt').trim().split('\n')) {
  const [hash, file] = line.split(/  /);
  const bytes = fs.readFileSync(path.join(root, 'privacy/evidence/math', file));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), hash);
}
assert(read('index.html').includes('privacy/math.html'));
assert(read('README.md').includes('com.visdar.chiffres'));
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
function element(lang) {
  const classes = new Set();
  return {lang, dataset:{lang}, classes, listeners:{}, attrs:{},
    classList:{add:name=>classes.add(name), toggle:(name,on)=>on?classes.add(name):classes.delete(name)},
    setAttribute(name,value){this.attrs[name]=value;},
    addEventListener(name,fn){this.listeners[name]=fn;}, focus(){this.focused=true;}};
}
for (const locale of ['zh-CN', 'fr-FR', 'en-US']) {
  const tabs = ['zh','fr','en'].map(element);
  const panels = ['zh','fr','en'].map(element);
  const doc = {documentElement:element(''), querySelectorAll:selector=>selector==='.lang-tab'?tabs:panels};
  vm.runInNewContext(script, {document:doc, navigator:{language:locale}});
  assert.equal(doc.documentElement.lang, locale.startsWith('zh')?'zh-CN':locale.slice(0,2));
  for (let i=0;i<3;i++) {
    tabs[i].listeners.click();
    assert.equal(panels.filter(panel=>panel.classes.has('active')).length,1);
    assert(panels[i].classes.has('active'));
    assert.equal(tabs[i].attrs['aria-selected'],'true');
  }
  tabs[2].listeners.keydown({key:'Home',preventDefault(){}});
  assert(tabs[0].focused && panels[0].classes.has('active'));
}
console.log('PASS: math trilingual policy, language controls, local links and all licence evidence hashes');
