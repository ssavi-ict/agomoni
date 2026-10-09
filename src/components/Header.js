// Theatre Header & Subtle Journey Progress Component
import { gameState } from '../state/gameState.js';
import { createThemeToggle } from './ThemeToggle.js';
import { createAudioToggle } from './AudioToggle.js';
import { createRestartButton } from './Restart.js';

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'theatre-header';

  // Left Brand Area
  const brandSection = document.createElement('div');
  brandSection.className = 'brand-section';
  brandSection.innerHTML = `
    <div class="brand-title">
      <span class="bengali-title">আগমনী</span>
    </div>
  `;

  // Center subtle Journey Progress: "Maa's Journey ● ● ● ○ ○ ○"
  const journeyProgress = document.createElement('div');
  journeyProgress.className = 'journey-progress';
  journeyProgress.setAttribute('aria-label', "Maa's Journey Progress");

  const label = document.createElement('span');
  label.className = 'journey-label';
  label.textContent = "অগ্রগতি";

  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'progress-dots';

  // 6 stages
  for (let i = 1; i <= 6; i++) {
    const dot = document.createElement('span');
    dot.className = 'progress-dot';
    dot.dataset.stage = i;
    dotsContainer.appendChild(dot);
  }

  journeyProgress.appendChild(label);
  journeyProgress.appendChild(dotsContainer);

  const restartBtn = createRestartButton();

  // Right Header Controls (Mute & Night Mode)
  const controls = document.createElement('div');
  controls.className = 'header-controls';
  controls.appendChild(restartBtn);
  controls.appendChild(createAudioToggle());
  controls.appendChild(createThemeToggle());

  header.appendChild(brandSection);
  header.appendChild(journeyProgress);
  header.appendChild(controls);

  // Sync dots with state
  function updateProgress() {
    const { currentStage, completedStages } = gameState.getState();
    const dots = dotsContainer.querySelectorAll('.progress-dot');
    dots.forEach((dot, index) => {
      const stageNum = index + 1;
      dot.classList.remove('active', 'completed');
      if (completedStages.includes(stageNum)) {
        dot.classList.add('completed');
      } else if (stageNum === currentStage) {
        dot.classList.add('active');
      }
    });
  }

  gameState.subscribe(updateProgress);
  updateProgress();

  return header;
}
