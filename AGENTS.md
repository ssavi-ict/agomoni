# AGENTS.md — Instructions for AI Agents

Welcome to **Agomoni — Bringing Maa Durga Home**.

Before doing any work, follow the progressive disclosure instructions below:

## 1. Reading Order
1. Read `AGENTS.md` first (this file).
2. Then read `AI_CONTEXT/CURRENT_STATE.md`.
3. Then read `AI_CONTEXT/AI_MAP.md`.
4. Read only additional documentation or source files relevant to the requested task.
5. Do NOT scan the entire repository unless genuinely necessary.
6. Prefer targeted file inspection.

## 2. Core Rules & Constraints
- **Source of truth:** The repository implementation is the source of truth.
- **Architecture:** Preserve the existing architecture unless there is a documented reason to change it.
- **Dependencies:** Do not introduce unnecessary frameworks or dependencies (pure Vanilla JS, CSS, and Vite static build).
- **Game mechanics:** Preserve existing game mechanics unless explicitly asked to modify them.
- **Static deployment:** Keep the project purely static and GitHub Pages compatible (`base: './'`).
- **Visitor counter / Firebase:** Keep visitor counter abstractions isolated. Do not embed Firebase credentials or create backends.
- **Audio:** Centralized AudioManager with resilience to missing assets. Do not fetch copyrighted audio automatically.
- **AI Context maintenance:** Always update `AI_CONTEXT/CURRENT_STATE.md`, `AI_CONTEXT/TODO.md`, and `AI_CONTEXT/CHANGELOG_AI.md` after meaningful changes.

## 3. Recommended Workflow
```text
READ
→ UNDERSTAND
→ TARGET
→ CHANGE
→ TEST
→ DOCUMENT
```
