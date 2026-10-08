# 词汇语境复查续接记录

本文件是给后续模型/维护者的交接记录。继续复查时，请先读取本文件和 [1–1000 词台账](lexical-review-1000.md)，从 `source-audited` 的下一个词开始，不要重复已标记为 `curated` 或 `context-reviewed` 的词。

## 固定续接规则

- 每批开始前先查本记录和 1–1000 台账；已完成词不重复劳动，用户指出具体错误时才重新打开复查。
- 每批结束后立即列出全部已复查词、处理重点、测试数量和最新统计。
- 代码、自动测试和台账必须在同一轮同步更新，不能只在聊天中口头记录。
- 详细执行约定已写入项目根目录 `AGENTS.md`，供后续模型自动续接。

## 2026-09-04 · 第二批高频词

### 本轮目标

- 继续检查汉语候选是否为日常最常用说法。
- 为每个候选补充法语语境说明；显示格式为：法语对应词 + `（法语语境）`，语法说明使用尖括号。
- 剔除 CFDICT 中与当前法语词无关的专名、方言、碎片和生僻义，不把原始词库的噪声直接展示给用户。

### 本轮已人工排序并补充语境提示

`être`、`avoir`、`dire`、`voir`、`devoir`、`attendre`、`temps`、`donner`、`femme`、`toujours`、`comprendre`、`grand`、`main`、`fois`、`sous`、`maintenant`、`arrêter`、`vraiment`、`rien`、`bon`、`petit`、`homme`、`jour`、`argent`、`problème`。

这些词的优先中文候选和法语语境已写入 `app/src/main/assets/dictionary-core.js` 的 `preferred` / `usageHints`，例如：

- `devoir`：得（obligation pratique）、该/应该（devoir ou conseil）、欠（argent, service ou dette）。
- `main`：手（partie du corps）、右手/左手（côté）、携手（action commune）、牌型（cartes au poker）。
- `temps`：时间（durée, moment ou horaire）、天气（conditions météorologiques）。
- `problème`：问题（difficulté ou question à résoudre）、毛病（défaut, panne ou santé）、课题/难题（étude ou difficulté）。

## 当前统计

由 `node tools/audit-common-french.cjs /tmp/lexique382/Lexique382.tsv` 生成：

- `curated`：36 个完整语境卡片。
- `context-reviewed`：90 个已人工排序并补充语境提示的高频词。
- `source-audited`：873 个已确认本地词库可命中、等待逐义复查的词。
- `missing`：1 个（`bois`，下一轮新增或补充卡片）。

这里的 `source-audited` 只代表“覆盖检查通过”，不代表已经完成语义人工审核；后续必须继续把它们逐词改成常用中文优先、法语括号说明清楚的形式。

## 已验证

- `node --check app/src/main/assets/dictionary-core.js` 通过。
- `node --test tests/dictionary-search.test.cjs`：14/14 通过。
- 56,300 条离线词库仍完整加载；括号平衡检查通过。
- 本轮高频词首项已验证为日常候选（如 `être → 是`、`avoir → 有`、`dire → 说`、`problème → 问题`），并且每个首项都有语境提示或语法说明。

## 2026-09-04 · 第三批高频词

又完成了 `tuer`、`heure`、`tête`、`comment`、`mourir`、`seul`、`peut-être`、`oh`、`dieu`、`père`、`fille`、`monde`、`vrai`、`besoin`、`accord`、`mère`、`ami`、`monsieur`、`nuit`、`enfant`、`air`、`devant`、`aider`、`moment`、`premier`、`beau`、`essayer` 的常用中文排序和法语语境提示；并把 `voilà` 从错误的裸译 `怪不得` 改为完整语境卡片。

第三批同样遵循“等价词不加括号、额外场景放圆括号、语法结构放尖括号”的显示规则。`voilà` 的卡片会覆盖介绍、递交、结论和人物出现四种常见用法，避免继续展示 CFDICT 的错误孤立释义。

## 2026-09-04 · 重音精确匹配修正

发现 `normalize()` 去掉法语重音会把 `la`（阴性定冠词）和 `là`（那里）合并，导致搜索 `la` 错误显示“那里/那边”。现已增加保留重音的精确索引和精确卡片匹配：

- `la`：显示语法卡片，不再返回 `là` 的地点释义。
- `là`：显示 `那里`、`那边`、`那儿` 等地点用法。
- 同时保留无重音输入作为别名的降级能力（例如 `boite` → `boîte`）。

新增回归测试：`la` 结果为空（由应用内语法卡片承接），`là` 首项为 `那里`，并确认两张卡片均存在。

## 2026-09-05 · 第四批常用购物及 march- 词族

针对用户反馈的 `bon marché → 便` 问题，完成以下调整：

- 新增 `bon marché` 完整语境卡片：`便宜`（日常中性）、`实惠`（性价比合适）、`廉价`（常带贬义）；删除孤立的 `便`、`贱`、`廉`。
- 新增 `cher` 完整语境卡片：`贵`、`昂贵`、`亲爱的`、`珍贵`，分别说明价格、称呼和情感价值。
- 整理 `march` 部分输入以及 `marche`、`marché`、`marcher`、`marchandise`、`mettre en marche`，避免 `步`、`市`、`级`、`品`、`开` 等碎片优先出现。
- 完成人工排序和法语语境说明：`payer`、`vendre`、`marche`、`prix`、`client`；同步整理 `coûter`、`gratuit`、`magasin`、`produit` 等购物常用词。
- 改进部分搜索的语境继承：输入 `march` 时，结果可从完整法语词条（例如 `marcher`、`marché`、`bon marché`）取得对应语境，而不是显示没有说明的裸译。

本批完成后，1–1000 台账统计为：完整语境卡片 36、人工语境排序 90、待逐义校订 873、缺失 1（`bois`）。词典自动测试为 17/17 通过。

## 下一步

1. 按 `docs/lexical-review-1000.md` 的排名，从 `source-audited` 继续分批复查，优先处理动词、形容词和多义名词。
2. 每批完成后更新 `preferred`、`usageHints`（必要时更新 `usageGrammar` / `excludedTranslations`），运行测试和审计脚本。
3. 只在用户再次明确要求时打包 APK/AAB；本次仅更新词库与台账，未打包。

## 2026-10-08 · textile / texture 双向精度修正

根据用户报告重新打开复查 `textile`、`texture` 及部分输入 `text`，并参考汉字手写识别应用“人工复核释义优先、源词库只作降级”的组织方式：

- 新增 `texture` 完整语境卡片，常用义依次为 `纹理`（表面可见的线条或颗粒）、`质地`（材料本身的性质与触感）、`质感`（材料造成的触觉或视觉印象）、`口感`（食物或饮料在口中的感觉）。删除源词库错误的孤立单字 `理`。
- 在确实有助于理解复合词时，把单字在词中的作用写进法语圆括号说明，例如 `纹理` 中 `纹` 是 motif ou ligne、`理` 是 organisation des lignes；这不是把法语等价词放进括号。
- 新增 `textile` 完整语境卡片，区分 `纺织品`（纤维制成的成品）、`织物`（织成或针织的材料）和 `纺织业`（产业部门），同样补充构词说明。
- 整理部分搜索 `text`：优先显示人工卡片，并只保留 `文本`、`正文`、`文章`、`课文` 等完整现代词，过滤 `文`、`理`、`莒`、`织品` 等碎片或噪声；人工卡片出现时不再重复显示相同的原始 CFDICT 卡片。
- 新建远程词汇内容 v2，供支持内容更新的已安装版本获取上述两张卡片；应用仍保留完整离线数据。

本批词位于 Lexique 1–1000 之外，因此 1–1000 状态统计保持不变；已把 `textile`、`texture` 写入“前 1000 以外、已完成完整语境卡片”清单。按维护规则，本轮未打包 APK/AAB。

## 2026-10-08 · 高频语法词第一批系统复查

`texture` 的反馈确认问题不是单个名词，而是所有未人工整理词条都会暴露 CFDICT 的孤立匹配。为此新增独立的高频语法词人工层，并从 Lexique 词频表最前端开始推进：

- 完成完整语境卡片：`de`、`je`、`ne`、`et`、`à`、`le`、`pas`、`il`、`les`、`tu`、`vous`、`un`。
- `de` 区分所属、来源、施事和材料；`à` 区分位置、目的地、方向、接收对象和单位比率。
- `pas` 同时区分 `不`、`没有`、`别` 三类否定和名词 `步伐`，不再把“步”类结果误当成唯一答案。
- `il` 区分人称 `他`、事物 `它` 和无人称结构 `不译`；`vous` 区分复数 `你们` 与礼貌单数 `您`。
- 法语冠词 `le / l’ / les` 明确提示汉语通常不译，不再显示 `le plus`、`les autres` 等长词组中误截出的结果；`de` 卡片同时接管省音形式 `d’`。
- 新增可扩充的 `function-word-entries.js`，以后每批语法词不再与普通名词/动词的 CFDICT 排序混在一起；远程内容构建脚本会把这些人工卡片合并到下一版内容更新。

这一批不仅修词，还建立了“语法词人工接管、普通词继续逐义复查”的双轨结构。台账已重新生成，下一批从仍标记为 `source-audited` 的最高频词继续。

最新 1–1000 统计：完整语境卡片 50、人工语境排序 90、待逐义校订 859、缺失 1（`bois`）。自动测试 25/25 通过；远程内容 v3 含本批 12 张语法词卡及上一批 `textile / texture` 卡片。
