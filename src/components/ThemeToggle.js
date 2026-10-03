// Theme Toggle Component
import { gameState } from '../state/gameState.js';
import { svgIcons } from '../assets/svgIcons.js';

export function createThemeToggle() {
  const button = document.createElement('button');
  button.className = 'icon-btn';
  button.id = 'theme-toggle-btn';
  button.setAttribute('aria-label', 'Toggle night mode');

  function update() {
    const { theme } = gameState.getState();
    button.innerHTML = theme === 'dark' ? svgIcons.sun : svgIcons.moon;
    button.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Night Mode';
  }

  button.addEventListener('click', () => {
    gameState.toggleTheme();
  });

  gameState.subscribe(update);
  update();

  return button;
}
