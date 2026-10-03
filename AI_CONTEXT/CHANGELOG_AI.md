# AI Changelog

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
