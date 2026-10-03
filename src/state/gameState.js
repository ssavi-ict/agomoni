// Game State Management & LocalStorage Persistence

const STORAGE_KEY = 'agomoni-game-state';

class GameStateStore {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadInitialState();
  }

  loadInitialState() {
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultState = {
      currentStage: 1,
      completedStages: [],
      theme: prefersDark ? 'dark' : 'light',
      muted: false
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultState,
          ...parsed,
          // Ensure currentStage is between 1 and 6
          currentStage: Math.max(1, Math.min(6, parsed.currentStage || 1)),
          completedStages: Array.isArray(parsed.completedStages) ? parsed.completedStages : []
        };
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or corrupt. Using default state.', e);
    }

    return defaultState;
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save game state to localStorage:', e);
    }
  }

  getState() {
    return { ...this.state };
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    const currentState = this.getState();
    this.listeners.forEach(fn => {
      try {
        fn(currentState);
      } catch (err) {
        console.error('Error in state listener:', err);
      }
    });
  }

  setStage(stageNum) {
    if (stageNum < 1 || stageNum > 6) return;
    this.state.currentStage = stageNum;
    this.saveState();
    this.notify();
  }

  completeStage(stageNum) {
    if (!this.state.completedStages.includes(stageNum)) {
      this.state.completedStages = [...this.state.completedStages, stageNum];
    }
    this.saveState();
    this.notify();
  }

  nextStage() {
    if (this.state.currentStage < 6) {
      this.state.currentStage += 1;
      this.saveState();
      this.notify();
    }
  }

  setTheme(theme) {
    this.state.theme = theme;
    this.saveState();
    this.notify();
  }

  toggleTheme() {
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setMuted(muted) {
    this.state.muted = !!muted;
    this.saveState();
    this.notify();
  }

  toggleMuted() {
    this.setMuted(!this.state.muted);
  }

  resetGame() {
    this.state.currentStage = 1;
    this.state.completedStages = [];
    this.saveState();
    this.notify();
  }
}

export const gameState = new GameStateStore();
