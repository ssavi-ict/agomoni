// Stage 3: Shukla Dwitiya (শুক্লা দ্বিতীয়া — মায়ের পরিবার)
import { gameState } from '../state/gameState.js';
import { svgIcons } from '../assets/svgIcons.js';

const DEITIES = [
  { id: 'ganesha', name: 'Ganesha', bengali: 'গণেশ', icon: svgIcons.ganesha },
  { id: 'lakshmi', name: 'Lakshmi', bengali: 'লক্ষ্মী', icon: svgIcons.lakshmi },
  { id: 'durga', name: 'Durga', bengali: 'দুর্গা', icon: svgIcons.durga },
  { id: 'saraswati', name: 'Saraswati', bengali: 'সরস্বতী', icon: svgIcons.saraswati },
  { id: 'kartikeya', name: 'Kartikeya', bengali: 'কার্তিক', icon: svgIcons.kartikeya }
];

const CORRECT_ORDER_IDS = ['ganesha', 'lakshmi', 'durga', 'saraswati', 'kartikeya'];

export function createDwitiyaStage() {
  const container = document.createElement('div');
  container.className = 'stage-container';

  // Header
  const header = document.createElement('div');
  header.className = 'stage-header-block';
  header.innerHTML = `
    <h2 class="stage-title">শুক্লা দ্বিতীয়া</h2>
    <p class="stage-subtitle">মায়ের পরিবার</p>
    <p class="stage-instruction">প্রতিমাগুলিকে সনাতন ক্রমে সাজান (গণেশ → লক্ষ্মী → দুর্গা → সরস্বতী → কার্তিক)</p>
  `;

  const deitiesContainer = document.createElement('div');
  deitiesContainer.className = 'deities-container';

  const track = document.createElement('div');
  track.className = 'deities-track';

  const hint = document.createElement('p');
  hint.className = 'reorder-hint';
  hint.textContent = 'প্রতিমা স্পর্শ বা ক্লিক করে স্থান অদলবদল (swap) করুন';

  const actionArea = document.createElement('div');
  actionArea.id = 'stage3-action-area';

  deitiesContainer.appendChild(track);
  deitiesContainer.appendChild(hint);

  container.appendChild(header);
  container.appendChild(deitiesContainer);
  container.appendChild(actionArea);

  // Initialize with an incorrect/shuffled order
  // Predefined non-matching permutation so it's guaranteed incorrect initially
  let currentOrder = [DEITIES[1], DEITIES[4], DEITIES[2], DEITIES[0], DEITIES[3]];
  let selectedIndex = null;
  let isCompleted = false;

  function checkOrder() {
    const isCorrect = currentOrder.every((d, i) => d.id === CORRECT_ORDER_IDS[i]);
    if (isCorrect && !isCompleted) {
      isCompleted = true;
      selectedIndex = null;
      renderTrack();

      gameState.completeStage(3);

      actionArea.innerHTML = `
        <div class="stage-banner">
          <p class="stage-banner-text">মায়ের আপনজনেরা প্রস্তুত।</p>
          <p class="stage-banner-sub">মা আরও একটু কাছে...</p>
          <button class="btn-continue" id="stage3-continue-btn">
            <span>পরের ধাপ</span>
            ${svgIcons.arrowRight}
          </button>
        </div>
      `;

      actionArea.querySelector('#stage3-continue-btn').addEventListener('click', () => {
        gameState.nextStage();
      });
    }
  }

  function renderTrack() {
    track.innerHTML = '';
    currentOrder.forEach((deity, idx) => {
      const slot = document.createElement('div');
      slot.className = `deity-slot ${selectedIndex === idx ? 'selected' : ''} ${isCompleted ? 'locked' : ''}`;
      slot.setAttribute('role', 'button');
      slot.setAttribute('tabindex', '0');
      slot.setAttribute('aria-label', `${deity.name} (${deity.bengali}) at position ${idx + 1}`);

      slot.innerHTML = `
        <span class="deity-order-badge">${idx + 1}</span>
        ${deity.icon}
        <span class="deity-name">${deity.bengali}</span>
      `;

      if (!isCompleted) {
        slot.addEventListener('click', () => {
          if (selectedIndex === null) {
            selectedIndex = idx;
          } else if (selectedIndex === idx) {
            selectedIndex = null;
          } else {
            // Swap items
            const temp = currentOrder[selectedIndex];
            currentOrder[selectedIndex] = currentOrder[idx];
            currentOrder[idx] = temp;
            selectedIndex = null;
          }
          renderTrack();
          checkOrder();
        });

        // Keyboard swap support
        slot.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            slot.click();
          }
        });
      }

      track.appendChild(slot);
    });
  }

  // Check if stage 3 already completed in state
  const { completedStages } = gameState.getState();
  if (completedStages.includes(3)) {
    currentOrder = CORRECT_ORDER_IDS.map(id => DEITIES.find(d => d.id === id));
    setTimeout(() => {
      checkOrder();
    }, 100);
  } else {
    renderTrack();
  }

  return container;
}
