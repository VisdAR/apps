# 免费商用许可证据 / Preuves de licence

记录日期：**2026-08-28**；英语词库与 Unicode 许可复核于 **2026-09-29**；字形分解数据复核于 **2026-10-03**。以下为实际浏览器截图，未改写网页文字。截图不是单独的授权合同，应连同全文和原始网址理解。

| 文件 | 官方来源 | 证明范围 |
| --- | --- | --- |
| [01-CFDICT-commercial.png](screenshots/01-CFDICT-commercial.png) | [Chine Informations / CFDICT](https://chine.in/mandarin/dictionnaire/CFDICT/) | 可商用、需要署名、改编数据同许可；介绍页面也需署名 |
| [02-WenKaiGB-OFL-full.png](screenshots/02-WenKaiGB-OFL-full.png) | [字体作者的 OFL](https://github.com/lxgw/LxgwWenkaiGB/blob/main/OFL.txt) | OFL 正文、版权与保留名称 |
| [03-Unicode-official-license.png](screenshots/03-Unicode-official-license.png) | [Unicode 官方仓库](https://github.com/unicode-org/unicodetools/blob/main/LICENSE) | Unicode License v3；保留声明 |
| [04-CC-BY-SA-commercial.png](screenshots/04-CC-BY-SA-commercial.png) | [Creative Commons 官方条款](https://creativecommons.org/licenses/by-sa/3.0/deed.fr) | 商用与修改可行，但需署名和相同方式共享 |
| [06-WenKaiGB-commercial-permission.png](screenshots/06-WenKaiGB-commercial-permission.png) | [作者仓库许可页](https://github.com/lxgw/LxgwWenkaiGB/blob/main/OFL.txt) | 清晰可见 Commercial use 与 OFL 1.1；完整法律文字见 02 与原文文件 |
| [07-CC-CEDICT-commercial.png](screenshots/07-CC-CEDICT-commercial.png) | [MDBG / CC-CEDICT 官方下载页](https://www.mdbg.net/chinese/dictionary?lang=en&page=cc-cedict) | CC BY-SA 4.0；页面明确说明允许 non-commercial 与 commercial use，并要求署名及相同方式共享 |
| [08-Unicode-license-policy.png](screenshots/08-Unicode-license-policy.png) | [Unicode 官方许可政策](https://www.unicode.org/policies/licensing_policy.html) | Unicode 数据文件采用 OSI 批准的 Unicode License v3，允许开放再利用 |

`licenses/` 保存 OFL、Unicode 与 CC BY-SA 全文。Unicode 文本从 unicode.org 下载；03 保留早期官方 GitHub 许可截图，08 是 2026-09-29 重新取得的 Unicode 官方许可政策页。

## 字形位置数据（2026-10-03）

- **Make Me a Hanzi**：`dictionary.txt` 使用 LGPL-3.0；本项目保存了上游许可原文和 README。固定提交：`bddc96d41bef78427ed0e034e9f7e31d71fd1b92`。
- **CJK Decomposition**：作为生僻字补充结构源，选用上游明确提供的 Apache-2.0 条款。固定提交：`c29b391fd6267e7a3541387e03a3dd60b1cd34d1`。
- [position-data-manifest.json](position-data-manifest.json) 记录上游地址、提交日期、下载日期、文件字节数和 SHA-256；[SHA256SUMS.txt](SHA256SUMS.txt) 覆盖整个证据目录。
- 应用只使用字形结构来识别部件在字中的位置。人工审校记录优先；来源无法确认时不凭 Unihan 部首编号猜测。

LXGW WenKai GB 原始 v1.522 字体文件与独立官方下载的 SHA-256 完全相同。记录见 `../data/reference-hashes.json`。所有汉字统一使用该楷体，未把普通宋体或系统字体作为已验证的主要字体。

**条件提醒：**免费可商用不等于无条件。禁止单独出售该字体；保留 OFL。法语词库衍生数据继续 CC BY-SA 3.0 并署名 CFDICT；英语词库衍生数据继续 CC BY-SA 4.0 并署名 CC-CEDICT。Unicode 保留其许可和版权。用户提供的品牌 Logo 不以这些数据许可来证明权属。


国家规范只用来核对名称，完整规范 PDF 不放入本次 GitHub 包。没有声称《新华字典》的内容获得了开放商用授权。
