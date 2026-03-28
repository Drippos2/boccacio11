# Boccaccio Restaurant Website PRD

## Original Problem Statement
Profesionálna webstránka pre reštauráciu Boccaccio - Typická talianska reštaurácia v Nitre. Požiadavky zahŕňali animovaný text, smooth scroll, hover efekty, fade-in text a viacjazyčnú podporu.

## User Choices
- Farebná schéma: Teplé talianske farby (terracotta, olivová, krémová)
- Sekcie: Menu s obrázkami jedál, Galéria, O nás, Kontakt
- Jazyky: Slovenčina, Angličtina, Nemčina, Taliančina
- Animácie: Stredná intenzita medzi jemnou a dynamickou
- Logo: Placeholder (bude nahradené neskôr)

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Framer Motion + Lenis smooth scroll
- **Backend**: FastAPI (minimálny - len status endpoint)
- **Database**: MongoDB (nepoužívaná pre túto statickú stránku)

## Core Requirements (Static)
1. Hero sekcia s veľkým názvom "BOCCACCIO REŠTAURÁCIA"
2. Navigácia s glassmorphism efektom
3. O nás sekcia s históriou (založená 1997)
4. Menu s 5 kategóriami a obrázkami jedál
5. Galéria s masonry grid layoutom
6. Kontakt s Google Maps, adresou, telefónom
7. Viacjazyčný prepínač (SK/EN/DE/IT)
8. Mobilné responzívne menu

## What's Been Implemented (March 14, 2026)
- [x] Hero sekcia so smooth zoom animáciou pozadia
- [x] Floating navigácia s glassmorphism efektom
- [x] Language switcher (SK, EN, DE, IT)
- [x] O nás sekcia s fotografiou šéfkuchára
- [x] Menu sekcia s 5 kategóriami (Steaky, Morské špeciality, Šaláty, Prílohy, Dezerty)
- [x] Každé jedlo má obrázok, cenu a alergény
- [x] Galéria s masonry grid layoutom
- [x] Kontakt s Google Maps embed
- [x] Otváracie hodiny a kontaktné informácie
- [x] Instagram a Facebook odkazy
- [x] Mobilné responzívne menu
- [x] Smooth scroll s Lenis
- [x] Fade-in animácie s Framer Motion
- [x] Hover efekty na kartách a obrázkoch

## Prioritized Backlog
### P0 - Critical (Done)
- [x] Všetky základné sekcie implementované
- [x] Viacjazyčná podpora

### P1 - Important (Future)
- [ ] Online rezervačný systém
- [ ] Pridanie vlastného loga
- [ ] Nahradenie placeholder fotografií vlastnými

### P2 - Nice to Have
- [ ] Newsletter prihlásenie
- [ ] Aktuálne akcie/špeciality dňa
- [ ] Integrácia s rezervačným systémom

## Next Tasks
1. Nahradiť placeholder obrázky vlastnými fotografiami
2. Pridať vlastné logo reštaurácie
3. Zvážiť pridanie online rezervačného formulára
