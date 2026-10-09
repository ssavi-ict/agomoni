## 2026-10-09 — Keep the Game Available Without Firebase Configuration
- **What changed:**
  - Made Firebase SDK loading and initialization lazy so missing or invalid database configuration cannot crash the app during startup.
  - Return the existing zero-padded placeholder when no valid Firebase Realtime Database URL is configured.
  - Added a test for the unconfigured fallback and clarified how to enable the live visitor count.
- **Files/components affected:** `src/services/visitorCounterService.js`, `tests/game.test.js`, `AI_CONTEXT/CURRENT_STATE.md`, `AI_CONTEXT/TODO.md`, `AI_CONTEXT/CHANGELOG_AI.md`.
- **Known issues:** The live visitor count requires a valid Firebase Realtime Database URL and configured GitHub Actions secrets.
- **Next relevant task:** Configure Firebase secrets only if a live visitor count is desired.

## 2026-10-09 — Publish GitHub Pages from the `deploy` Branch
- **What changed:**
  - Updated `.github/workflows/deploy.yml` to build on pushes to `main` (or manual dispatch) and publish the generated `dist/` contents to the `deploy` branch.
  - Changed workflow permissions to the minimum needed for publishing branch contents.
  - Documented the remaining one-time GitHub Pages setting: select `deploy` / root as the Pages source.
- **Files/components affected:** `.github/workflows/deploy.yml`, `AI_CONTEXT/CURRENT_STATE.md`, `AI_CONTEXT/TODO.md`, `AI_CONTEXT/CHANGELOG_AI.md`.
- **Known issues:** GitHub Pages repository settings must be changed manually to use the `deploy` branch.
- **Next relevant task:** Configure Pages to publish from `deploy` / root and verify the live site.

## 2026-10-04 — Image Assets Integration & Stage 4 Weaponize Ma Durga Overhaul
- **What changed:**
  - Integrated high-quality images in `public/assets/images/`:
    - Stage 2: horse, elephant, palanquin, boat with responsive card layout and galloping animation.
    - Stage 3: Lord Ganesha, Ma Lokkhi, Ma Durga, Ma Saraswati, Lord Kartikey with swap reordering.
    - Stage 5 & 6: final image of Durga (`durga_final.png`) for sacred puja culmination banner and Bodhan reveal.
  - Re-implemented Stage 4 (Shukla Tritiya) matching the "Weaponize Ma Durga" UI:
    - Central ॐ hub with breathing glow and ripple rings upon completion.
    - Two symmetrical opposing arcs of 5 slots each (sealed medallions and 2 randomized `?` missing slots).
    - 10 draggable chips with pointer events, drag ghosting, slot hover targeting, and click/tap selection fallback.
    - Misses counter and "New attempt" button.
    - Integration with `gameState.completeStage(4)` and continue button.
  - Verified unit test suite passing 100% and production build passing in `dist/`.
- **Files/components affected:** `src/stages/Stage2Pratipad.js`, `src/stages/Stage3Dwitiya.js`, `src/stages/Stage4Tritiya.js`, `src/stages/Stage5Chaturthi.js`, `src/stages/Stage6Panchami.js`, `src/styles/stages.css`, `AI_CONTEXT/*`.
- **Known issues:** None.
- **Next relevant task:** Deploy to GitHub Pages.

## 2026-10-03 — Complete Game Implementation
- **What changed:** Implemented the full interactive web game:
  - Game Shell & Theatre window layout (~60% desktop width, responsive mobile/tablet).
  - Subtle journey progress indicator (`Maa's Journey ● ● ● ○ ○ ○`).
  - Stage 1 (Mahalaya): Diya to vintage radio interaction, dawn illumination.
  - Stage 2 (Shukla Pratipad): 4 transport choices with Horse as fixed correct transport and animation.
  - Stage 3 (Shukla Dwitiya): 5 deities interactive touch/drag reordering.
  - Stage 4 (Shukla Tritiya): 10 canonical weapons in two arcs, 2 randomized '?' slots, 10 chips.
  - Stage 5 (Shukla Chaturthi): "Start the Puja" with Diya -> Dhak -> Conch unprompted discovery.
  - Stage 6 (Panchami / Bodhan): Bodhan reveal with synchronized dhak sound and final Bengali poem.
  - Centralized AudioManager with Web Audio fallbacks and mute persistence.
  - Night Mode atmospheric theme toggle.
  - Abstracted VisitorCounterService with zero-padded placeholder.
  - Configured Vite with relative base path and GitHub Actions workflow.
  - Automated test suite `tests/game.test.js` passing.
- **Files/components affected:** `src/main.js`, `src/components/*`, `src/stages/*`, `src/state/*`, `src/audio/*`, `src/services/*`, `src/styles/*`, `src/assets/*`, `.github/workflows/deploy.yml`, `tests/game.test.js`.
- **Known issues:** None.
- **Next relevant task:** Deploy to GitHub and activate GitHub Pages.
