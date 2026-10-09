// Main Game Shell Orchestrator
import { gameState } from '../state/gameState.js';
import { createHeader } from './Header.js';
import { createFooter } from './Footer.js';
import { showIntroOverlay } from '../stages/introOverlay.js';
import { createMahalayaStage } from '../stages/Stage1Mahalaya.js';
import { createPratipadStage } from '../stages/Stage2Pratipad.js';
import { createDwitiyaStage } from '../stages/Stage3Dwitiya.js';
import { createTritiyaStage } from '../stages/Stage4Tritiya.js';
import { createChaturthiStage } from '../stages/Stage5Chaturthi.js';
import { createPanchamiStage } from '../stages/Stage6Panchami.js';

export function createGameShell() {
  const container = document.createElement('div');
  container.className = 'app-container';

  // Theatre Window
  const theatre = document.createElement('main');
  theatre.className = 'theatre-window';

  // Header
  const header = createHeader();
  theatre.appendChild(header);

  // Dynamic Stage Container
  const stageArea = document.createElement('section');
  stageArea.className = 'theatre-stage-area';
  stageArea.id = 'stage-viewport';
  theatre.appendChild(stageArea);

  // Footer
  const footer = createFooter();

  container.appendChild(theatre);
  container.appendChild(footer);

  let currentRenderedStage = null;
  let lastRestartCount = null;

  function mountStage(stageNode) {
    if (!stageNode) return;
    stageNode.style.animation = 'fadeIn 0.4s ease forwards';
    stageArea.appendChild(stageNode);
  }

  // Stage 1 is only built once the player clicks "যাত্রা শুরু করুন" on the intro overlay.
  // The click is a real user gesture, so Stage 1's audio can play right away.
  function startStage1WithIntro() {
    showIntroOverlay({
      onStart: () => {
        // Ignore the click if the game moved on to another stage in the meantime
        if (currentRenderedStage !== 1) return;
        stageArea.innerHTML = '';
        mountStage(createMahalayaStage());
      },
    });
  }

  function renderCurrentStage(stageNum, restartCount = 0) {
    if (currentRenderedStage === stageNum && lastRestartCount === restartCount) return;
    currentRenderedStage = stageNum;
    lastRestartCount = restartCount;

    stageArea.innerHTML = '';

    switch (stageNum) {
      case 2:
        mountStage(createPratipadStage());
        break;
      case 3:
        mountStage(createDwitiyaStage());
        break;
      case 4:
        mountStage(createTritiyaStage());
        break;
      case 5:
        mountStage(createChaturthiStage());
        break;
      case 6:
        mountStage(createPanchamiStage());
        break;
      case 1:
      default:
        startStage1WithIntro();
    }
  }

  function handleStateChange(state) {
    // Update theme attribute on root
    document.documentElement.setAttribute('data-theme', state.theme);

    // Render stage if changed
    renderCurrentStage(state.currentStage, state.restartCount || 0);
  }

  gameState.subscribe(handleStateChange);
  handleStateChange(gameState.getState());

  return container;
}