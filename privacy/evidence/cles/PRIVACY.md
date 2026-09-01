# Confidentialité et références / 隐私与参考资料

Version 2.0 — mise à jour du 31 août 2026.

## Confidentialité

L’application ne demande aucune permission Android, n’utilise aucun compte,
publicité, outil d’analyse, serveur de recherche ou télémétrie. Le dictionnaire
et la police sont incorporés. Les recherches et favoris restent sur l’appareil.
Les favoris utilisent le stockage local de la WebView. Effacer les données de
l’application ou la désinstaller les supprime. Les sauvegardes Android de
l’application sont désactivées.

L’interface de l’application ne comporte aucun lien externe. Les liens de source
figurent uniquement dans cette documentation publiée séparément ; les sites tiers
consultés à partir de cette page appliquent leurs propres politiques.

应用离线使用，无账号、广告、统计或上传。收藏只保存在当前设备，清除应用数据或卸载会删除。应用界面不提供外部链接；资料链接仅列在这份独立发布的文档中。

## Références et licences

Cette section rassemble les notices détaillées retirées de l’interface. Le panneau
de l’application conserve une seule liste courte des quatre sources, de leurs
licences et des crédits nécessaires. Les droits sur les données, la police et la
marque restent distincts.

### CFDICT · Chine Informations

**Licence : [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.fr).**
Source : [CFDICT, Chine Informations](https://chine.in/mandarin/dictionnaire/CFDICT/),
David Houstin et les contributeurs.

CFDICT fournit les sens français et le pinyin. Le fichier incorporé annonce un
instantané du **14 décembre 2024** ; il a été téléchargé le **28 août 2026**. Ces
deux dates ne désignent pas la même chose.

Adaptations : sélection des entrées à un seul sinogramme dans la colonne
simplifiée, conversion du pinyin numéroté en accents, choix d’une glose courte,
réorganisation et indexation des sens. Les lectures disponibles et les numéros de
ligne d’origine sont conservés. Certaines formes traditionnelles ou anciennes
subsistent dans la colonne simplifiée de la source ; quelques corrections sont
signalées dans l’audit des données.

Les données adaptées sont redistribuées sous CC BY-SA 3.0. La source demande une
attribution dans l’application et sur ses pages de présentation ; cette attribution
ne doit donc pas être déplacée exclusivement sur une page GitHub.

### Unicode / Unihan 17.0.0

**Licence : [Unicode-3.0](https://www.unicode.org/license.txt).**
© 1991–2026 Unicode, Inc.

Sources : [Unihan 17.0.0](https://www.unicode.org/Public/17.0.0/ucd/Unihan.zip),
[CJKRadicals.txt](https://www.unicode.org/Public/17.0.0/ucd/CJKRadicals.txt) et
[documentation UAX #38](https://www.unicode.org/reports/tr38/).

Ces données servent au classement par clé, au décompte des traits et aux lectures
de référence. Les 214 catégories Kangxi sont reliées aux 201 catégories de
l’interface ; les valeurs Unihan originales sont conservées. Quelques repères
visuels supplémentaires facilitent la recherche par composant ou forme simplifiée
et sont signalés comme tels, sans remplacer le classement original.

Le classement peut différer d’une édition papier. Par exemple, la partie gauche de
都 peut compter huit ou neuf traits suivant le tracé : l’index `163.9` est conservé
et un repère à huit traits restants est ajouté. Voir
[UAX #38, section 3.6](https://www.unicode.org/reports/tr38/#Radical-Stroke_Counts).

### LXGW WenKai GB 1.522 / 霞鹜文楷

**Licence : SIL OFL 1.1.**
© 2022–2026 LXGW ; © 2020 The Klee Project Authors.

La police d’écriture régulière (楷体, kaishu) utilisée pour les sinogrammes est le
[binaire officiel de la version 1.522](https://github.com/lxgw/LxgwWenkaiGB/releases/tag/v1.522).
Elle est incorporée sans modification ni sous-ensemble. Son empreinte SHA-256 et
la couverture des glyphes sont vérifiées lors des tests.

La police peut accompagner une application commerciale, mais ne peut être vendue
seule. Les droits d’auteur, la licence et les noms réservés sont conservés dans le
[texte OFL fourni avec la police](app/src/main/assets/fonts/OFL.txt) et dans la
[licence officielle de l’auteur](https://github.com/lxgw/LxgwWenkaiGB/blob/main/OFL.txt).

### CNS11643

**Licence : Government Data Open License 1.0.**

Attribution complète : **數位發展部，CNS11643中文標準交換碼全字庫網站，https://www.cns11643.gov.tw。**
Éditeur des données à Taïwan : Ministry of Digital Affairs.

La [fiche U+9FBA](https://www.cns11643.gov.tw/wordView.jsp?ID=949815) sert à vérifier
la lecture **zhuó** de **龺** et la description de sa structure. Aucune police CNS
n’est incorporée. Voir la [déclaration officielle de licence](https://www.cns11643.gov.tw/pageView.jsp?ID=59)
et la [notice conservée dans le paquet](app/src/main/assets/licenses/CNS11643.txt).
Le nom du site n’est pas répété dans le panneau de l’application.

### Noms chinois et explications françaises

Les noms chinois des composants sont vérifiés d’après **GF 0014-2009**, les noms
des composants courants et le tableau de référence des 201 clés. Sources :
[ministère de l’Éducation](https://www.moe.gov.cn/jyb_xwfb/gzdt_gzdt/moe_1485/tnull_45766.html),
[document de référence transmis à l’IRG](https://www.unicode.org/irg/docs/n2739-GF0014-2009.pdf)
et [annonce de révision de 2022](https://www.moe.gov.cn/jyb_xwfb/gzdt_gzdt/s5987/202211/t20221118_995332.html).

Les gloses françaises sont des formulations pédagogiques de Visd AR, appuyées sur
CFDICT et Unihan, et non un standard officiel en français. Les noms décrivent
parfois la position d’un composant plutôt que son sens. L’[audit des noms](docs/radicals-source-audit.csv)
distingue le nom chinois, le pinyin, le sens court et l’explication française.

Ces normes sont des références factuelles : aucune autorisation générale de
reproduire leurs documents n’est revendiquée. Les PDF complets consultés localement
ne sont pas inclus dans le paquet GitHub. Le projet ne revendique pas une
conformité exhaustive à la norme révisée de 2022.

### Vérification des appellations traditionnelles

L’édition de référence envisagée est le [新华字典, 12e édition, présenté par son éditeur](https://www.cp.com.cn/book/9c3b015f-5.html).
La page officielle confirme la présence du tableau de recherche par clé, mais ne fournit pas sa liste complète de noms. Les noms existants issus de GF 0014-2009 ne sont donc pas présentés comme une transcription vérifiée des appellations du dictionnaire. La vérification de cette correspondance nécessite les pages de l’édition utilisée.

### Indépendance, logo et pied de page

L’application est indépendante, sans affiliation ni approbation du dictionnaire
Xinhua. Aucun texte de définition de ce dictionnaire n’est reproduit. La couverture
française se limite aux entrées présentes dans les données CFDICT retenues.

Le logo sur fond blanc et le pied de page proviennent de l’application Calendrier
fournie par le propriétaire du projet. Leur propriété n’est pas couverte par les
licences ouvertes des données. La mention « Tous droits réservés » concerne la
marque et les éléments propres à l’application ; les licences des données et de la
police restent applicables. Voir [LICENSE](LICENSE).

## Captures et documents de preuve

Les captures de licence ont été réalisées le **28 août 2026** et sont conservées
dans le dossier GitHub, pas dans l’interface ni dans les ressources des APK/AAB.
Elles documentent les pages consultées et ne constituent pas une garantie juridique.
Voir l’[index des preuves](evidence/README.md), les [captures](evidence/screenshots),
les [textes conservés](evidence/licenses) et les [empreintes SHA-256](evidence/SHA256SUMS.txt).

Les captures sont des captures réelles de pages, sans retouche de leur contenu.
La capture Unicode utilise le dépôt officiel unicode-org/unicodetools, le site
unicode.org étant inaccessible dans le navigateur au moment de la capture. Son
année de copyright diffère de celle du texte courant téléchargé sur unicode.org ;
les deux documents et leur contexte sont conservés.

Les textes de licence nécessaires restent également distribués avec l’application
dans [assets/licenses](app/src/main/assets/licenses) et dans le dossier de la police.
Les détails de qualité et les limites linguistiques figurent dans
[DATA-QUALITY.md](docs/DATA-QUALITY.md).
