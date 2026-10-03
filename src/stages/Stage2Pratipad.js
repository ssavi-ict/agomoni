// Stage 2: Shukla Pratipad (শুক্লা প্রতিপদ — মাকে নিয়ে আসা)
import { gameState } from '../state/gameState.js';
import { svgIcons } from '../assets/svgIcons.js';

const TRANSPORTS = [
  { id: 'palanquin', name: 'Palanquin', bengali: 'পালকি', icon: svgIcons.palanquin },
  { id: 'horse', name: 'Horse', bengali: 'ঘোড়া', icon: svgIcons.horse, isCorrect: true },
  { id: 'elephant', name: 'Elephant', bengali: 'হাতি', icon: svgIcons.elephant },
  { id: 'boat', name: 'Boat', bengali: 'নৌকা', icon: svgIcons.boat }
];

export function createPratipadStage() {
  const container = document.createElement('div');
  container.className = 'stage-container';

  // Header
  const header = document.createElement('div');
  header.className = 'stage-header-block';
  header.innerHTML = `
    <h2 class="stage-title">শুক্লা প্রতিপদ</h2>
    <p class="stage-subtitle">মাকে নিয়ে আসা</p>
    <p class="stage-instruction">মা কোন বাহনে কৈলাস থেকে মর্ত্যে যাত্রা শুরু করবেন?</p>
  `;

  // Grid of 4 transports
  const grid = document.createElement('div');
  grid.className = 'transport-grid';

  const feedbackArea = document.createElement('div');
  feedbackArea.className = 'feedback-msg';
  feedbackArea.id = 'transport-feedback';

  const actionArea = document.createElement('div');
  actionArea.id = 'stage2-action-area';

  container.appendChild(header);
  container.appendChild(grid);
  container.appendChild(feedbackArea);
  container.appendChild(actionArea);

  let isCompleted = false;

  TRANSPORTS.forEach(item => {
    const card = document.createElement('button');
    card.className = 'transport-card';
    card.id = `transport-${item.id}`;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Select ${item.name} (${item.bengali})`);
    card.innerHTML = `
      ${item.icon}
      <span class="transport-name">${item.name}</span>
      <span class="transport-bengali">${item.bengali}</span>
    `;

    card.addEventListener('click', () => {
      if (isCompleted) return;

      if (item.isCorrect) {
        // Horse is always correct
        isCompleted = true;
        card.classList.add('selected-correct');
        feedbackArea.textContent = 'ঘোড়সওয়ার মা ধাবমান আলোর মতো এগিয়ে আসছেন...';

        // Animate horse galloping forward
        const horseSvg = card.querySelector('svg');
        if (horseSvg) {
          horseSvg.style.transition = 'transform 0.8s ease-in-out';
          horseSvg.style.transform = 'translateX(14px) scale(1.1)';
        }

        gameState.completeStage(2);

        actionArea.innerHTML = `
          <div class="stage-banner">
            <p class="stage-banner-text">মায়ের যাত্রা শুরু হয়েছে।</p>
            <p class="stage-banner-sub">মা আরও একটু কাছে...</p>
            <button class="btn-continue" id="stage2-continue-btn">
              <span>পরের ধাপ</span>
              ${svgIcons.arrowRight}
            </button>
          </div>
        `;

        actionArea.querySelector('#stage2-continue-btn').addEventListener('click', () => {
          gameState.nextStage();
        });
      } else {
        // Gentle, respectful Bengali feedback. No harsh punishments.
        card.classList.add('selected-wrong');
        feedbackArea.textContent = `${item.bengali} শান্ত... তবে এবার মা আসছেন দ্রুত অশ্বে।`;
        setTimeout(() => {
          card.classList.remove('selected-wrong');
        }, 1500);
      }
    });

    grid.appendChild(card);
  });

  // If already completed in state
  const { completedStages } = gameState.getState();
  if (completedStages.includes(2)) {
    setTimeout(() => {
      const horseCard = grid.querySelector('#transport-horse');
      if (horseCard) {
        horseCard.click();
      }
    }, 100);
  }

  return container;
}
