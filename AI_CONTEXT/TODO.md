# Priority TODO List

## P0 (Completed)
- [x] Build `vite.config.js` with `base: './'`.
- [x] Implement `src/state/gameState.js` with localStorage persistence (`agomoni-game-state`).
- [x] Implement `src/audio/audioManager.js` with safe fallbacks and mute toggle.
- [x] Implement Stage 1: Mahalaya (Lamp to radio interaction & dawn illumination).
- [x] Implement Stage 2: Shukla Pratipad (4 transports, Horse fixed correct choice).
- [x] Implement Stage 3: Shukla Dwitiya (5 deities touch/drag reordering).
- [x] Implement Stage 4: Shukla Tritiya (10 weapon slots, 2 arcs, 2 '?' missing slots, 10 chips, hidden slot titles).
- [x] Implement Stage 5: Shukla Chaturthi ("Start the Puja", Diya -> Dhak -> Conch sequence).
- [x] Implement Stage 6: Panchami / Bodhan (Maa Durga face reveal synchronized with dhak reveal sound, emotional culmination).
- [x] Implement theatre window layout (desktop 60%, tablet 75–85%, mobile 90–95%).
- [x] Subtle journey progress indicator (`Maa's Journey ● ● ○`).
- [x] Night mode toggle honoring `prefers-color-scheme`.
- [x] Visitor counter abstraction with placeholder implementation.
- [x] GitHub Pages workflow (`.github/workflows/deploy.yml`).

## P1 (Future Enhancements)
- Connect `VisitorCounterService` to production Firebase / Firestore counter if requested.
- Provide custom studio-recorded MP3 files in `public/assets/audio/` if licensed.
