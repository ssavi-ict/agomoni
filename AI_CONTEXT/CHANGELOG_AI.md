## 2026-10-10 — Mahalaya to Diya Audio Fade
- **What changed:**
  - Track active audio elements by sound key and add a track-specific fade-out operation.
  - Fade Mahalaya to silence over two seconds when the first Stage 5 Diya interaction occurs, while starting Diya immediately.
  - Use a Web Audio gain ramp where available, with media-volume fade fallback; preserve immediate stop behavior for other stage transitions.
- **Files/components affected:** `src/audio/audioManager.js`, `src/stages/Stage5Chaturthi.js`, `tests/game.test.js`, `AI_CONTEXT/CURRENT_STATE.md`, `AI_CONTEXT/TODO.md`, `AI_CONTEXT/CHANGELOG_AI.md`.
- **Known issues:** None.
- **Next relevant task:** Verify the fade on target mobile browsers and speakers/headphones.

## 2026-10-10 — Mobile Intro Button Arrow
- **What changed:** Replaced the intro start button's text arrow glyph with an aria-hidden CSS arrow, avoiding font glyph issues on mobile.
- **Files/components affected:** `src/stages/introOverlay.js`, `src/styles/intro.css`, `AI_CONTEXT/CURRENT_STATE.md`, `AI_CONTEXT/TODO.md`, `AI_CONTEXT/CHANGELOG_AI.md`.
- **Known issues:** None.
- **Next relevant task:** Verify on target mobile browsers.

## 2026-10-09 — Footer Credit Typography
- **What changed:** Styled the footer credit with a slightly larger display font, clear project/author hierarchy, and theme-aware link colors.
- **Files/components affected:** `src/components/Footer.js`, `src/styles/shell.css`, `AI_CONTEXT/CURRENT_STATE.md`, `AI_CONTEXT/TODO.md`, `AI_CONTEXT/CHANGELOG_AI.md`.
- **Known issues:** None.
- **Next relevant task:** None.

## 2026-10-09 — Stage 6 Credit Link Contrast
- **What changed:** Applied theme-aware link colors to the Stage 6 credit links so they remain legible in dark mode.
- **Files/components affected:** `src/stages/Stage6Panchami.js`, `src/styles/stages.css`, `AI_CONTEXT/CURRENT_STATE.md`, `AI_CONTEXT/TODO.md`, `AI_CONTEXT/CHANGELOG_AI.md`.
- **Known issues:** None.
- **Next relevant task:** None.

## 2026-10-09 — Count Actual Stage Entries
- **What changed:**
  - Moved counter increments from static stage-module imports to stage mounting in `GameShell`, so advancing from Stage 1 to Stage 2 increments the count.
  - Kept the Realtime Database subscription for live cross-tab/visitor updates.
  - Track only pending increment requests while waiting for the latest count, avoiding retention of every completed request.
- **Files/components affected:** `src/components/GameShell.js`, `src/services/visitorCounterService.js`, all six `src/stages/Stage*.js` modules, `tests/game.test.js`, `AI_CONTEXT/CURRENT_STATE.md`, `AI_CONTEXT/TODO.md`, `AI_CONTEXT/CHANGELOG_AI.md`.
- **Known issues:** Live counts still require Firebase deployment configuration and permissions for reads and transactions at `games/agomoni26/visitor_count`.
- **Next relevant task:** Deploy and verify that each stage entry updates the visible counter.

## 2026-10-09 — Live Visitor Counter Updates
- **What changed:**
  - Added a Firebase Realtime Database value subscription for the visitor counter.
  - Updated the counter component to remain synchronized with count changes from other page loads.
  - Added a fallback subscription test for builds without Firebase configuration.
- **Files/components affected:** `src/services/visitorCounterService.js`, `src/components/VisitorCounter.js`, `tests/game.test.js`, `AI_CONTEXT/CURRENT_STATE.md`, `AI_CONTEXT/TODO.md`, `AI_CONTEXT/CHANGELOG_AI.md`.
- **Known issues:** Live updates require a valid Firebase database URL and database rules permitting reads as well as counter transactions.
- **Next relevant task:** Deploy and verify that the counter changes when another visitor loads the site.

## 2026-10-09 — Count Stage Module Loads
- **What changed:**
  - Each of the six stage modules records an atomic visitor-counter increment at module evaluation.
  - The footer now reads the shared total after stage-module increments settle instead of incrementing it itself.
  - Documented the current static-import behavior: all six modules load together, so a page load adds six.
- **Files/components affected:** `src/services/visitorCounterService.js`, all six `src/stages/Stage*.js` modules, `AI_CONTEXT/CURRENT_STATE.md`, `AI_CONTEXT/TODO.md`, `AI_CONTEXT/CHANGELOG_AI.md`.
- **Known issues:** Counter increments require Firebase deployment configuration and Realtime Database rules permitting transactions at `games/agomoni26/visitor_count`.
- **Next relevant task:** Configure Firebase in GitHub Actions if needed, redeploy, and verify the total increases by six per page load.

## 2026-10-09 — Increment Visitor Count on Every Page Visit
- **What changed:**
  - Removed per-session visit suppression so each page visit executes an atomic Firebase Realtime Database transaction.
  - Lazily load Firebase only when a valid Firebase database URL exists; log configuration and database errors while preserving the `000000` fallback.
  - Require valid numeric state for the shared counter, initializing an empty/malformed value at 1.
- **Files/components affected:** `src/services/visitorCounterService.js`, `AI_CONTEXT/CURRENT_STATE.md`, `AI_CONTEXT/TODO.md`, `AI_CONTEXT/CHANGELOG_AI.md`.
- **Known issues:** A live count still requires Firebase deployment configuration and database rules that allow the counter read/write transaction.
- **Next relevant task:** Verify Firebase Actions configuration and Realtime Database rules, then deploy.

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
