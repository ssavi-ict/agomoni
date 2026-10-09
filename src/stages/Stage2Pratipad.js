// Stage 2: Shukla Pratipad (শুক্লা প্রতিপদ — মাকে নিয়ে আসা)
import { gameState } from '../state/gameState.js';
import { svgIcons } from '../assets/svgIcons.js';

const basePath = (import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : './';
const prefix = basePath.endsWith('/') ? basePath : basePath + '/';

const TRANSPORTS = [
  { id: 'palanquin', name: 'Palanquin', bengali: 'পালকি', image: `${prefix}assets/images/palanquin.png` },
  { id: 'horse', name: 'Horse', bengali: 'ঘোড়া', image: `${prefix}assets/images/horse.png`, isCorrect: true },
  { id: 'elephant', name: 'Elephant', bengali: 'হাতি', image: `${prefix}assets/images/elephant.png` },
  { id: 'boat', name: 'Boat', bengali: 'নৌকা', image: `${prefix}assets/images/boat.png` }
];

export function createPratipadStage() {
  const container = document.createElement('div');
  container.className = 'stage-container';

  // Header
  const header = document.createElement('div');
  header.className = 'stage-header-block';
  header.innerHTML = `
    <h3 class="stage-title">১৪৩২ বঙ্গাব্দ</h3>
    <br/>
    <p class="stage-instruction">মায়ের মর্ত্যগামী বাহন প্রস্তুত ... <u>লাগাম টা টেনে ধরলেই</u> চলতে শুরু করবে</p>
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
      <img src="${item.image}" alt="${item.name}" class="transport-img" />
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
        const horseImg = card.querySelector('.transport-img');
        if (horseImg) {
          horseImg.style.transition = 'transform 0.8s ease-in-out';
          horseImg.style.transform = 'translateX(14px) scale(1.12)';
        }

        gameState.completeStage(2);
        setTimeout(() => {
          actionArea.innerHTML = `
            <div class="stage-banner">
              <p class="stage-banner-text">ছত্র ভঙ্গ স্তুরঙ্গমে</p>
              <p class="stage-banner-sub">অশ্বারোহী মা ... আপনাকে সামনের দিনগুলোতে নিজ এবং প্রিয়জনদের প্রতি যত্নশীল হবার পরামর্শ দিচ্ছেন</p>
              <button class="btn-continue" id="stage2-continue-btn">
                ${svgIcons.arrowRight}
              </button>
            </div>
          `;

          actionArea.querySelector('#stage2-continue-btn').addEventListener('click', () => {
            gameState.nextStage();
          });
        }, 2000);
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
