// Stage 1: Mahalaya (মহালয়া — জাগরণের শুরু)
import { gameState } from '../state/gameState.js';
import { audioManager } from '../audio/audioManager.js';
import { svgIcons } from '../assets/svgIcons.js';

export function createMahalayaStage() {
  const container = document.createElement('div');
  container.className = 'stage-container';

  // Stage Header
  const header = document.createElement('div');
  header.className = 'stage-header-block';
  header.innerHTML = `
    <h2 class="stage-title">মহালয়া</h2>
    <p class="stage-subtitle">জাগরণের শুরু</p>
    <p class="stage-instruction">প্রদীপটি জ্বালিয়ে পুরনো রেডিওটির কাছে নিয়ে যান</p>
  `;

  // Scene Container
  const room = document.createElement('div');
  room.className = 'mahalaya-room';
  room.id = 'mahalaya-room';

  // Window Scenery showing dawn/night
  const windowScenery = document.createElement('div');
  windowScenery.className = 'window-scenery';
  windowScenery.innerHTML = `
    <div class="window-bars">
      <div class="window-bar"></div>
      <div class="window-bar"></div>
      <div class="window-bar"></div>
    </div>
  `;
  room.appendChild(windowScenery);

  // Lamp / Diya Element
  const diyaItem = document.createElement('div');
  diyaItem.className = 'room-item diya-wrapper';
  diyaItem.id = 'mahalaya-diya';
  diyaItem.setAttribute('draggable', 'true');
  diyaItem.setAttribute('tabindex', '0');
  diyaItem.setAttribute('role', 'button');
  diyaItem.setAttribute('aria-label', 'Clay Diya / Lamp. Click or drag to radio');
  diyaItem.innerHTML = `
    <div class="diya-flame"></div>
    ${svgIcons.diya}
    <span style="font-size: 0.75rem; color: var(--color-gold);">মাটির প্রদীপ</span>
  `;

  // Old Radio Element
  const radioItem = document.createElement('div');
  radioItem.className = 'room-item radio-wrapper';
  radioItem.id = 'mahalaya-radio';
  radioItem.setAttribute('tabindex', '0');
  radioItem.setAttribute('role', 'region');
  radioItem.setAttribute('aria-label', 'Vintage Radio');
  radioItem.innerHTML = `
    ${svgIcons.radio}
    <span style="font-size: 0.75rem; color: var(--text-secondary);">পুরনো রেডিও</span>
  `;

  room.appendChild(diyaItem);
  room.appendChild(radioItem);

  // Bottom action / banner area
  const actionArea = document.createElement('div');
  actionArea.id = 'stage1-action-area';

  container.appendChild(header);
  container.appendChild(room);
  container.appendChild(actionArea);

  let isCompleted = false;

  function activateRadio() {
    if (isCompleted) return;
    isCompleted = true;

    // Room illuminates
    room.classList.add('illuminated');

    // Radio shows sound waves
    const soundwaves = document.createElement('div');
    soundwaves.className = 'radio-soundwaves';
    soundwaves.innerHTML = `
      <div class="soundwave-bar"></div>
      <div class="soundwave-bar"></div>
      <div class="soundwave-bar"></div>
      <div class="soundwave-bar"></div>
    `;
    radioItem.appendChild(soundwaves);

    // Diya moves to radio side
    diyaItem.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
    diyaItem.style.transform = 'scale(0.9)';
    radioItem.appendChild(diyaItem);

    // Play Mahalaya audio safely
    audioManager.playMahalaya();

    // Mark stage 1 completed
    gameState.completeStage(1);

    // Show completion banner
    actionArea.innerHTML = `
      <div class="stage-banner">
        <p class="stage-banner-text">আগমনী শুরু হয়েছে...</p>
        <p class="stage-banner-sub">মা আরও একটু কাছে...</p>
        <button class="btn-continue" id="stage1-continue-btn">
          <span>পরের ধাপ</span>
          ${svgIcons.arrowRight}
        </button>
      </div>
    `;

    const continueBtn = actionArea.querySelector('#stage1-continue-btn');
    continueBtn.addEventListener('click', () => {
      gameState.nextStage();
    });
  }

  // Support Drag and Drop
  diyaItem.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'diya');
    e.dataTransfer.effectAllowed = 'move';
  });

  radioItem.addEventListener('dragover', (e) => {
    e.preventDefault();
    radioItem.classList.add('drag-over');
  });

  radioItem.addEventListener('dragleave', () => {
    radioItem.classList.remove('drag-over');
  });

  radioItem.addEventListener('drop', (e) => {
    e.preventDefault();
    radioItem.classList.remove('drag-over');
    activateRadio();
  });

  // Support touch / click for mobile and accessibility
  let lampSelected = false;
  diyaItem.addEventListener('click', () => {
    if (isCompleted) return;
    lampSelected = true;
    diyaItem.style.transform = 'translateY(-8px) scale(1.1)';
    radioItem.classList.add('drag-over');
  });

  radioItem.addEventListener('click', () => {
    if (isCompleted) return;
    if (lampSelected) {
      activateRadio();
    } else {
      // Direct click also assists players if they tap the radio
      activateRadio();
    }
  });

  // Keyboard accessibility
  diyaItem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activateRadio();
    }
  });

  // If already completed in state
  const { completedStages } = gameState.getState();
  if (completedStages.includes(1)) {
    setTimeout(() => {
      activateRadio();
    }, 100);
  }

  return container;
}
