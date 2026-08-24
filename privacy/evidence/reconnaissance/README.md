# VisdAR Reconnaissance · licence evidence and audit archive

This directory is a public compliance archive for the **汉字识别 · Reconnaissance de sinogrammes** application. It contains evidence screenshots and a reproducible CFDICT pronunciation-variant audit. It is **not** the application source distribution.

Saved and generated on 2026-08-22.

## Source evidence

- `hanzilookupjs-gpl.png` — HanziLookupJS licence: GPL-3.0.
- `hanzilookupjs-apl.png` — Make Me a Hanzi data: APL 2.0.
- `cfdict-cc-by-sa.png` — CFDICT / Chine Informations: CC BY-SA 3.0. This permits commercial use with attribution and ShareAlike obligations; it is not a no-conditions commercial licence.
- `complete-hsk-mit.png` — Complete HSK Vocabulary: MIT.
- `lxgw-wenkai-ofl.png` — LXGW WenKai GB: SIL Open Font License 1.1.

The original licence texts and their conditions remain controlling. The screenshots are preserved evidence only and do not replace source attribution, notice, or source-availability obligations.

## Tone-variant review

- `cfdict-tone-variant-audit.md` records the results of the audit.
- `audit_tone_variants.js` is the reproducible checker used to produce it.
- `compound-only-readings.md` explains, in plain language, the reading notes
  used when a French gloss only applies in a fixed Chinese word.

The audit is documentation, not application code. It helps prevent accidental merging of same-spelling vocabulary whose meanings differ by tone.

## What is deliberately not published here

The proprietary visual design, full application implementation, private signing keystore, local signing properties, and raw offline application data are not stored in this public policy repository.
