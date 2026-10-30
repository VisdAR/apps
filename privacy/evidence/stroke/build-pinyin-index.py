#!/usr/bin/env python3
"""Derive a pinyin lookup index from CC-CEDICT (CC BY-SA 4.0).
Input: MDBG CC-CEDICT 2026-09-29 archive. Output: pinyin to simplified/traditional headwords.
Modifications 2026-10-30: strip tone numbers and punctuation, retain Hanzi-only entries
of up to 8 characters, merge duplicate pairs, and create a compact lookup object.
"""
from pathlib import Path
import gzip, re, json, hashlib, argparse
parser=argparse.ArgumentParser(description="Generate a CC-CEDICT pinyin index")
parser.add_argument("--source",default="data/pinyin/CC-CEDICT-2026-09-29.txt.gz")
parser.add_argument("--output",default="app/src/main/assets/pinyin-index.js")
parser.add_argument("--notice",default="data/pinyin/README.md")
args=parser.parse_args()
source=Path(args.source)
rows={}
for line in gzip.open(source,'rt',encoding='utf-8'):
 if line.startswith('#'):continue
 m=re.match(r'^(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+/',line)
 if not m:continue
 trad,simp,raw=m.groups()
 if not (1<=len(simp)<=8 and len(simp)==len(trad)):continue
 if not all('\u3400'<=c<='\u9fff' for c in simp+trad):continue
 key=raw.lower().replace('u:','v').replace('ü','v')
 key=re.sub(r'[^a-z]','',key)
 if not key:continue
 rows.setdefault(key,set()).add((simp,trad))
# Editorial tie-breaks for common single characters only; no frequency data implied.
common='的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处理世车价深书海安门东神难万口力中国人民我你他她我们他们你好再见谢谢学习汉字笔顺朋友老师学校世界时间喜欢爱和平语言文字'
rank={c:i for i,c in reversed(list(enumerate(common)))}
def order(pair):
 s,t=pair
 if len(s)==1:return (0,rank.get(s,99999),s,t)
 return (1,len(s),sum(rank.get(c,5000) for c in s),s,t)
index={k:sorted(v,key=order) for k,v in sorted(rows.items())}
out='window.pinyinIndex='+json.dumps(index,ensure_ascii=False,separators=(',',':'))+';\n'
Path(args.output).write_text(out,encoding='utf-8')
Path(args.notice).write_text('CC-CEDICT lookup index, derived 2026-10-30 from MDBG CC-CEDICT 2026-09-29, CC BY-SA 4.0. Source archive SHA-256: '+hashlib.sha256(source.read_bytes()).hexdigest()+'\nTransformation: scripts/build_pinyin_index.py. Derived index: app/src/main/assets/pinyin-index.js. Simplified and traditional forms retained; tone numbers and punctuation removed; Hanzi-only headwords up to eight characters. Entries are ranked using a hand-written list of common characters, then length and Unicode order. Attribution: CC-CEDICT contributors, published by MDBG, https://www.mdbg.net/chinese/dictionary?page=cc-cedict . Full licence is app/src/main/assets/licenses/CEDICT-CC-BY-SA-4.0.txt.\n',encoding='utf-8')
print(f'{len(index)} keys; {sum(map(len,index.values()))} headword pairs; {len(out.encode())} bytes')
for k in ('ni','hao','nihao','zhongguo','xue','nvyu'):print(k,index.get(k,[])[:5])
