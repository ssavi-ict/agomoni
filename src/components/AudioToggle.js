// Audio Toggle Component
import { gameState } from '../state/gameState.js';
import { svgIcons } from '../assets/svgIcons.js';

export function createAudioToggle() {
  const button = document.createElement('button');
  button.className = 'icon-btn';
  button.id = 'audio-toggle-btn';
  button.setAttribute('aria-label', 'Toggle audio mute');

  function update() {
    const { muted } = gameState.getState();
    button.innerHTML = muted ? svgIcons.volumeMuted : svgIcons.volumeOn;
    button.title = muted ? 'Unmute Audio' : 'Mute Audio';
  }

  button.addEventListener('click', () => {
    gameState.toggleMuted();
  });

  gameState.subscribe(update);
  update();

  return button;
}
