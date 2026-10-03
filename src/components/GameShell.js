// Main Game Shell Orchestrator
import { gameState } from '../state/gameState.js';
import { createHeader } from './Header.js';
import { createFooter } from './Footer.js';
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

  function renderCurrentStage(stageNum) {
    if (currentRenderedStage === stageNum) return;
    currentRenderedStage = stageNum;

    stageArea.innerHTML = '';
    let stageNode = null;

    switch (stageNum) {
      case 1:
        stageNode = createMahalayaStage();
        break;
      case 2:
        stageNode = createPratipadStage();
        break;
      case 3:
        stageNode = createDwitiyaStage();
        break;
      case 4:
        stageNode = createTritiyaStage();
        break;
      case 5:
        stageNode = createChaturthiStage();
        break;
      case 6:
        stageNode = createPanchamiStage();
        break;
      default:
        stageNode = createMahalayaStage();
    }

    if (stageNode) {
      stageNode.style.animation = 'fadeIn 0.4s ease forwards';
      stageArea.appendChild(stageNode);
    }
  }

  function handleStateChange(state) {
    // Update theme attribute on root
    document.documentElement.setAttribute('data-theme', state.theme);

    // Render stage if changed
    renderCurrentStage(state.currentStage);
  }

  gameState.subscribe(handleStateChange);
  handleStateChange(gameState.getState());

  return container;
}
