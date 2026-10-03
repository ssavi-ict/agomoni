# Architectural & Design Decisions

This document records non-negotiable architectural and design decisions that future agents must not accidentally reverse.

1. **Completion-based Progression:**
   Progression is purely completion-based. The game is never locked by real-world calendar dates so anyone can complete the journey at any time.

2. **Single-Page Game Flow:**
   The entire journey unfolds in a continuous single-page theatrical window. It is one continuous Agomoni journey, not disconnected mini-games.

3. **GitHub Pages Static Deployment:**
   Built as a static client application with no Node.js runtime, SSR, Express, or backend database. Base path is set relatively (`base: './'`) to allow deployment under any repository subpath.

4. **No Backend:**
   All logic runs locally in the client browser. No external API dependencies.

5. **Firebase Deferred for Visitor Counting:**
   A clean service abstraction (`VisitorCounterService`) is provided with a placeholder implementation. No Firebase credentials, configurations, or fake network requests are introduced now.

6. **localStorage Progress Persistence:**
   Game state is persisted to `localStorage` under key `agomoni-game-state`. Reloading the page restores stage progress, completion state, theme, and mute setting.

7. **Centralized Audio Management:**
   All sound effects and background music flow through `AudioManager`. Missing audio files do not cause crashes or console errors, falling back gracefully to Web Audio synthesis.

8. **Audio Triggered Through User Interaction:**
   Audio respects browser autoplay policies by triggering exclusively on user gestures (e.g. clicking the lamp/radio, selecting a transport, tapping a puja item).

9. **Final Dhak Timing:**
   In Stage 6 (Bodhan), the `dhak-reveal` audio triggers **synchronously when Maa Durga's face becomes visible**, not before or after.

10. **Weapon Puzzle Rules:**
    10 canonical weapons arranged in two arcs (Left: Chakra, Trident, Sword, Thunderbolt, Lotus; Right: Conch, Spear, Bow, Snake, Axe). Exactly 2 randomly chosen positions are marked with `?`. The other 8 show slot positions without displaying their names. All 10 weapon chips are available to drag/select.

11. **Horse as Fixed Correct Transport:**
    In Stage 2, Horse (ঘোড়া) is the fixed, canonical correct choice. It is never randomized.

12. **Deity Ordering:**
    In Stage 3, the Puja family must be arranged in traditional canonical order:
    `Ganesha → Lakshmi → Durga → Saraswati → Kartikeya`.

13. **"Start the Puja" Wording & Sequence:**
    Stage 5 must be titled exactly `Start the Puja`. The player discovers the unprompted sequence: Diya → Dhak → Conch.

14. **Final Emotional Reveal:**
    Stage 6 is not a puzzle; it is an atmospheric, emotional celebration where the player feels: *"আমি মাকে ঘরে এনেছি।"*
