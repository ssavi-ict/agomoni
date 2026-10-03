# Architecture

## Technical Stack
- **Framework:** Vanilla ES6+ JavaScript modules. No UI library bloat.
- **Styling:** Vanilla CSS with custom design tokens, CSS variables, dark/light themes, and responsive design.
- **Build System:** Vite (`vite build`) producing static HTML/JS/CSS assets.
- **Base Path:** Configured as `base: './'` in `vite.config.js` for seamless GitHub Pages root or subpath deployment.

## Component / Module Structure
```text
index.html                     # Main entry page & fonts
src/
├── main.js                    # Bootstrapper & GameShell orchestrator
├── styles/
│   ├── main.css               # Global styles, typography, reset
│   ├── theme.css              # Light / Night color schemes
│   ├── shell.css              # Theatre window layout & header/footer
│   └── stages.css             # Stage-specific styles and animations
├── state/
│   └── gameState.js           # State container, subscriptions, localStorage sync
├── audio/
│   └── audioManager.js        # Centralized audio, mute support, Web Audio fallback
├── services/
│   └── visitorCounterService.js # Visitor counter interface & placeholder implementation
├── components/
│   ├── Header.js              # Subtle journey indicator (Maa's Journey ● ● ○)
│   ├── ThemeToggle.js         # Night mode toggle button
│   ├── AudioToggle.js         # Mute/unmute button
│   ├── Footer.js              # Footer with VisitorCounter
│   └── VisitorCounter.js      # Visitor counter presentation component
└── stages/
    ├── Stage1Mahalaya.js      # Diya to radio interaction
    ├── Stage2Pratipad.js      # 4 transports, Horse correct
    ├── Stage3Dwitiya.js      # 5 Deities reordering (Ganesha->Lakshmi->Durga->Saraswati->Kartikeya)
    ├── Stage4Tritiya.js       # 10 weapons, 2 arcs, 2 missing '?' chips
    ├── Stage5Chaturthi.js     # "Start the Puja" (Diya -> Dhak -> Conch)
    └── Stage6Panchami.js      # Bodhan reveal + synchronized dhak reveal
```

## State Management & Storage
- Centralized store in `src/state/gameState.js`.
- Key: `agomoni-game-state`.
- State shape:
  ```json
  {
    "currentStage": 1,
    "completedStages": [],
    "theme": "dark",
    "muted": false
  }
  ```
- Progression is strictly completion-based (never date locked).

## Audio Architecture
- Centralized singleton `AudioManager`:
  - `playMahalaya()`, `playDhak()`, `playConch()`, `playDhakReveal()`, `stopAll()`, `toggleMute()`.
  - Non-fatal asset loading: tries configured MP3 files; gracefully synthesizes soothing ambient chords/tones via Web Audio API if MP3s are absent.
  - Honors user gestures to satisfy browser autoplay restrictions.
  - Synchronized dhak trigger on Stage 6 exact face reveal.

## Visitor Counter & Firebase Boundary
- `VisitorCounterService` acts as an abstract interface.
- Current active implementation: `PlaceholderVisitorCounterService` returning formatted count without external network calls.
- Future Firebase integration will plug into `VisitorCounterService` without UI changes.
