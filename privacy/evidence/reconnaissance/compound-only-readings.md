# 固定词读音说明

更新日期：2026-08-24。

这份说明记录汉字手写识别 App 中一小部分容易误解的读音。它们看起来像是单个汉字的读音和意思，但相关法语意思实际上要放在一个固定词里理解。为了不让学习者误以为单个汉字单独就等于那句法语，App 会在详情页加上说明。

例如：

> dài < 在“大夫”中 Dans le mot 大夫 >：docteur、médecin

这句话的意思是：**大**读 **dài** 时，`docteur、médecin` 是放在 **大夫** 这个词里才成立的意思。它不是把单独的 **大** 一律翻成 docteur 或 médecin。

候选汉字卡片保持简洁，只显示汉字和读音，不显示这些说明。用户点进汉字详情后，才会看到说明；同时，词例区域会显示完整词语，拼音一一放在汉字上方，法语译文放在右侧。

## 目前已加说明的读音

- 佣，yòng：在“佣金”中 Dans le mot 佣金，commission
- 傀，kuǐ：在“傀儡”中 Dans le mot 傀儡，marionnette、fantoche
- 大，dài：在“大夫”中 Dans le mot 大夫，docteur、médecin
- 埋，mán：在“埋怨”中 Dans le mot 埋怨，se plaindre、reprocher
- 强，jiàng：在“倔强”中 Dans le mot 倔强，obstiné、têtu、inflexible
- 強，jiàng：在“倔強”中 Dans le mot 倔強，obstiné、têtu、inflexible
- 扫，sào：在“扫帚”中 Dans le mot 扫帚，balai
- 掃，sào：在“掃帚”中 Dans le mot 掃帚，balai
- 桔，jié：在“桔梗”中 Dans le mot 桔梗，Platycodon grandiflorum
- 槛，kǎn：在“门槛”中 Dans le mot 门槛，seuil de porte
- 檻，kǎn：在“門檻”中 Dans le mot 門檻，seuil de porte
- 矫，jiáo：在“矫情”中 Dans le mot 矫情，argumentatif、contentieux
- 矯，jiáo：在“矯情”中 Dans le mot 矯情，argumentatif、contentieux
- 膀，páng：在“膀胱”中 Dans le mot 膀胱，vessie
- 观，guàn：在“道观”中 Dans le mot 道观，temple taoïste
- 觀，guàn：在“道觀”中 Dans le mot 道觀，temple taoïste

简体和繁体分别保留，是为了让无论识别到哪一种字形，App 都能给出同样清楚的说明。

## 为什么不把所有看起来相近的情况自动改掉

我们先检查了 CFDICT 中 12,028 个单字读音。用严格规则筛选后，有 40 个值得人工检查的候选。可是“单字释义和某个词的释义相近”并不代表单字没有独立意思。

例如，有些字本来就是独立动词、独立名词或文言读音，只是正好也出现在一个常见词里。如果自动加上“只在某词中”的标签，反而会把正确意思说错。

所以 App 只为语言上明确属于固定词用法的读音加入说明。其余候选保留原来释义，等待逐条人工确认，而不是自动批量修改。

## 数据范围

这项显示修正只改变 App 的说明方式，不更改 CFDICT 原始词典资料。词条法语释义仍来自 CFDICT，词例仍显示其完整拼音和法语翻译。
