// Header Restart Button
import { gameState } from '../state/gameState.js';
import { audioManager } from '../audio/audioManager.js'; // adjust to your real path

export function createRestartButton() {
  const btn = document.createElement('button');
  btn.className = 'icon-btn';
  btn.id = 'btn-header-restart';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Restart Journey');
  btn.title = 'যাত্রা পুনরায় শুরু করুন (Restart Journey)';

  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <polyline points="3 3 3 9 9 9" />
    </svg>
  `;

  btn.addEventListener('click', () => {
    if (!confirm('যাত্রা পুনরায় শুরু করবেন? (Restart the journey?)')) return;
    audioManager.stopAll();
    gameState.resetGame();
  });

  return btn;
}