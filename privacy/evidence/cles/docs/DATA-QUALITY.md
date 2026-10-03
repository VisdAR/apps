# Données : périmètre et limites

Version 2.8 — 202 familles de clés, 8 721 sinogrammes avec lecture pinyin valide, interface française et anglaise.

## Ce qui est vérifié

Les tests contrôlent l’unicité des catégories, les nombres de traits disponibles, la présence des lectures et des gloses françaises, l’alignement syllabique des noms, la couverture des glyphes, la présence de pinyin, la fidélité du binaire officiel de police et du logo Calendrier, et plusieurs relations courantes.

La couche anglaise n’est pas une traduction automatique des gloses françaises.
Les définitions sont indexées par sinogramme et pinyin depuis CC-CEDICT ; Unihan
`kDefinition` complète uniquement la lecture principale lorsque CC-CEDICT ne
fournit rien. Elle couvre 8 710 cartes principales sur 8 721 (99,87 %) et 9 364
lectures sur 9 422 (99,38 %). Les 11 cartes restantes affichent explicitement
« Definition unavailable ». Les noms propres CC-CEDICT passent après les sens
lexicaux afin d’éviter, par exemple, d’afficher « surname Ai » avant l’armoise
chinoise pour 艾. Le rapport reproductible est
`docs/open-dictionary-coverage.json`.

Les libellés anglais des 202 familles sont reconstruits à partir de
`CJKRadicals-17.0.0.txt` et `UnicodeData-17.0.0.txt`, avec 26 formulations
positionnelles revues pour l’apprentissage. Le rapport
`docs/english-radical-audit.json` conserve pour chaque clé le nom Unicode et la
formulation affichée. L’ancienne table multilingue traduite par chaînes françaises
n’est plus chargée ni intégrée aux APK/AAB.

Les noms non autonomes sont vérifiés sur les pages imprimées 7–20 de GF0014-2009. Leur page est enregistrée. Les noms correspondant simplement au sinogramme autonome utilisent la lecture et la glose des sources ouvertes. Une explication française éditoriale n’est pas présentée comme un texte officiel du ministère.

Pour les 24 formes positionnelles encodées et nommées dans GF 0014-2009, le jeu de données conserve séparément le libellé exact de la norme (`standardName`) et le nom traditionnel complet affiché. Ainsi, la source **金旁** reste traçable, tandis que l’interface montre **钅 金字旁** ; de même, **氵 三点水**, **扌 提手旁**, **忄 竖心旁**, **阝 左耳旁 / 右耳旁**, etc., sont visibles dans les cartes de recherche.

Une 25e présentation est contextuelle : **女字旁** n’a pas de code Unicode distinct. Son contour gauche est extrait du glyphe de référence de la police incorporée et affiché seul, avec le troisième trait relevé. Le sinogramme complet qui a servi à vérifier ce contour n’est jamais utilisé comme symbole de clé.

## Positions des composants — extension du 2026-10-03

`data/positional-forms.json` relie explicitement 139 couples sinogramme/clé à une
forme relue caractère par caractère. Ces décisions éditoriales ont priorité. Le
reste est dérivé de la décomposition graphique de **Make Me a Hanzi**
(LGPL-3.0), puis de **CJK Decomposition** (Apache-2.0) lorsque la première
source ne couvre pas le signe. Le numéro de clé Unihan ne sert jamais à inventer
une position.

Sur 8 791 relations sinogramme–famille, 8 741 ont une position graphique
traçable (99,43 %). Les 50 relations non résolues restent accessibles dans
« Toute la famille » sans être placées artificiellement dans une catégorie.
Les 202 familles disposent toutes d’au moins une forme classée. Les catégories
sont : forme autonome, gauche, droite, haut, bas, centre, enveloppe, intérieur,
chevauchement et occurrences multiples. Le rapport reproductible est
`docs/positional-form-audit.json`.

Les 133 candidats de l’ancien filtre de fréquence sont désormais admissibles
aux exercices, y compris 可、同、后、在、本、术、机、村、板、林、果、树、桥.
从 et 以 restent dans la famille 人, mais sont séparés de 单立人旁 par leurs
formes positionnelles propres.

Exemples : 会/全 → 人字头 ; 你 → 亻 单人旁 ; 想 → 心字底 ; 情 → 忄 竖心旁 ; 妻 → 女字底 (trait horizontal) ; 她 → 女字旁 (contour gauche, trait relevé). 日 en haut, à gauche ou en bas et 口 à gauche ou à droite ont également des identifiants de réponse distincts. Les noms usuels et les mentions de position éditoriales sont distingués : une position n’est pas présentée comme un nom normatif inventé.

La bonne réponse, les distracteurs et la correction utilisent ces identifiants de forme, jamais la première variante d’une famille. Une autre position de la même famille est proposée lorsqu’elle est disponible. Dans les notices non vérifiées, l’interface dit seulement « Clé de classement » et ne prétend pas montrer une forme propre au sinogramme.

Ces classifications étendues sont intégrées à la version 2.8.

## Différences avec un dictionnaire papier

- L’index primaire est Unihan 17.0.0, système Kangxi à 214 catégories. L’interface part d’une table moderne à 201 clés, mais conserve **土** et **士** comme deux familles distinctes afin de ne pas enseigner l’une comme variante de l’autre : elle affiche donc 202 familles. Ce n’est pas une table licenciée de l’éditeur de Xinhua.
- Les formes simplifiées et traditionnelles peuvent avoir des décomptes différents. Une recherche par nombre de traits reste liée au décompte indiqué par la source, pas à une promesse d’identité avec chaque édition imprimée.
- Pour 都, le `163.9` original est conservé ; huit traits restants sont ajoutés comme repère du tracé GB de 者 sans point. Voir UAX #38 §3.6.
- 龺 : le libellé descriptif **十早 / 十早字头** ne lui attribue ni lecture autonome normalisée ni sens « printemps ». Les relations avec 乾、朝、韩、翰 sont des recherches supplémentaires par composant visible, non des valeurs Unihan inventées.
- 斗 sous 鬥 est un renvoi par simplification pour le sens dòu ; il ne supprime pas la relation principale de 斗.
- 肉 et 月 restent distincts. 阝 à droite relève de 邑 ; à gauche, de 阜.
- Les dix entrées 禸、禹、禺、鬯、禽、黹、黻、黼、鬰、鬱 ne sont pas attribuées artificiellement à un autre groupe : elles restent accessibles par recherche globale.

## Choix éditoriaux et corrections

Le catalogue propose deux ordres. « Courants » additionne, pour chaque clé, les occurrences de ses sinogrammes indexés dans Unihan 17.0.0 kHanyuPinlu, corpus de chinois standard moderne couvrant quatre genres ; il s’agit d’une priorité pédagogique des familles, pas d’une fréquence intrinsèque des clés. « Par traits » classe par nombre de traits croissant puis par numéro d’index. Unicode a retiré l’ancien champ provisoire kFrequency à partir de la version 16.0 ; il n’est donc pas utilisé.

Les sens de renvoi, indications de classificateur ou noms de famille peuvent être écartés de la glose courte lorsqu’une définition lexicale existe. Les lignes brutes restent dans `data/raw/cfdict.u8`. Le corpus sélectionne les entrées à une syllabe et à un sinogramme représentable par la police.

Quinze caractères coréens historiques de type gugja/kwukyel sont exclus de
l’interface chinoise : CFDICT leur attribue le marqueur technique `xx5`, qui
signale l’absence de pinyin exploitable et ne constitue pas une lecture
mandarine. Le compilateur rejette désormais toute lecture `xx` et les tests
empêchent sa réapparition dans une carte.

Corrections explicites : 攴 pū au lieu de bū ; pour 氿, le faux ami français « printemps montagneux » devient « source jaillissant latéralement ». Les noms de composants font l’objet de précisions éditoriales, dont 月/肉, 阝, 龺, 几 et 撇. Les valeurs de référence brutes ne sont pas réécrites.

## Ce qui n’est pas garanti

Les 8 721 notices françaises ne sont pas toutes relues individuellement par un lexicographe francophone. La couverture n’est ni celle de tous les sinogrammes Unicode, ni celle de tous les mots composés, ni celle d’une édition complète du dictionnaire Xinhua. Les pinyin insérés dans des renvois chinois libres utilisent une lecture de référence par signe ; les phrases et noms propres demandent parfois une lecture contextuelle différente.

Une vérification native des contenus et un essai sur appareil Android restent nécessaires avant de promouvoir le produit comme ouvrage de référence exhaustif.

## Mise en page des exercices — 2026-09-29

Les quatre réponses sont disposées sur une ligne à partir de 301 px de largeur.
Le texte des sens conserve 10 px, se renvoie à la ligne et n’est ni tronqué ni
masqué ; la hauteur de la rangée suit son contenu. Sous 301 px, deux colonnes
évitent l’écrasement. Sur écran court, l’introduction de la page d’accueil est
masquée pendant l’exercice et seuls les espacements et le sinogramme-question
sont réduits. Un défilement reste disponible comme solution d’accessibilité en
cas de très grande taille de police système.

## Terre latérale et lettré — 2026-09-04

La forme **提土旁** est un contour étroit isolé du côté gauche du glyphe 地 de LXGW WenKai GB 1.522 (police originale inchangée, SIL OFL 1.1). Son dernier trait monte. Le SVG `earth-left.svg` ne contient ni le composant droit ni le sinogramme complet. Le même cadre et la même largeur CSS que 女字旁 conservent la taille relative du composant, sans le dilater à la largeur d’un sinogramme autonome. Cette 26e présentation de composant est éditoriale ; aucun numéro de page GF n’est inventé pour son nom usuel. Le terme 提土旁 avec l’exemple 地 est également attesté dans [SF/Z JD0201002-2010, tableau des noms de composants](https://www.moj.gov.cn/pub/sfbgw/zwfw/zwfwbgxz/202101/P020210122423060808657.pdf).

Les caractères 地、场、城 sont désormais admis dans les exercices après vérification. **土** et **士** sont deux clés séparées : les relations Unihan 32 restent sous 土 et les relations Unihan 33 restent sous 士. Les fiches de 士、壮、声、壳 appartiennent uniquement à la famille 士 et ne montrent jamais le contour de 提土旁.
