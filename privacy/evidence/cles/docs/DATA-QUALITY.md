# Données : périmètre et limites

Version 2.0 — 201 catégories, 8 736 sinogrammes.

## Ce qui est vérifié

Les tests contrôlent l’unicité des catégories, les nombres de traits disponibles, la présence des lectures et des gloses françaises, l’alignement syllabique des noms, la couverture des glyphes, la présence de pinyin, la fidélité du binaire officiel de police et du logo Calendrier, et plusieurs relations courantes.

Les noms non autonomes sont vérifiés sur les pages imprimées 7–20 de GF0014-2009. Leur page est enregistrée. Les noms correspondant simplement au sinogramme autonome utilisent la lecture et la glose des sources ouvertes. Une explication française éditoriale n’est pas présentée comme un texte officiel du ministère.

## Différences avec un dictionnaire papier

- L’index primaire est Unihan 17.0.0, système Kangxi à 214 catégories. L’interface regroupe ces catégories dans 201 clés de référence. Ce n’est pas une table licenciée de l’éditeur de Xinhua.
- Les formes simplifiées et traditionnelles peuvent avoir des décomptes différents. Une recherche par nombre de traits reste liée au décompte indiqué par la source, pas à une promesse d’identité avec chaque édition imprimée.
- Pour 都, le `163.9` original est conservé ; huit traits restants sont ajoutés comme repère du tracé GB de 者 sans point. Voir UAX #38 §3.6.
- 龺 : lecture zhuó vérifiée dans CNS11643 ; aucun sens « printemps ». Les relations avec 乾、朝、韩、翰 sont des recherches supplémentaires par composant visible, non des valeurs Unihan inventées.
- 斗 sous 鬥 est un renvoi par simplification pour le sens dòu ; il ne supprime pas la relation principale de 斗.
- 肉 et 月 restent distincts. 阝 à droite relève de 邑 ; à gauche, de 阜.
- Les dix entrées 禸、禹、禺、鬯、禽、黹、黻、黼、鬰、鬱 ne sont pas attribuées artificiellement à un autre groupe : elles restent accessibles par recherche globale.

## Choix éditoriaux et corrections

Les mots courants sont placés en tête par une petite liste éditoriale ; ce classement n’est pas présenté comme une statistique officielle de fréquence. Unihan kFrequency sert lorsqu’il est disponible.

Les sens de renvoi, indications de classificateur ou noms de famille peuvent être écartés de la glose courte lorsqu’une définition lexicale existe. Les lignes brutes restent dans `data/raw/cfdict.u8`. Le corpus sélectionne les entrées à une syllabe et à un sinogramme représentable par la police.

Corrections explicites : 攴 pū au lieu de bū ; pour 氿, le faux ami français « printemps montagneux » devient « source jaillissant latéralement ». Les noms de composants font l’objet de précisions éditoriales, dont 月/肉, 阝, 龺, 几 et 撇. Les valeurs de référence brutes ne sont pas réécrites.

## Ce qui n’est pas garanti

Les 8 736 notices françaises ne sont pas toutes relues individuellement par un lexicographe francophone. La couverture n’est ni celle de tous les sinogrammes Unicode, ni celle de tous les mots composés, ni celle d’une édition complète du dictionnaire Xinhua. Les pinyin insérés dans des renvois chinois libres utilisent une lecture de référence par signe ; les phrases et noms propres demandent parfois une lecture contextuelle différente.

Une vérification native des contenus et un essai sur appareil Android restent nécessaires avant de promouvoir le produit comme ouvrage de référence exhaustif.
