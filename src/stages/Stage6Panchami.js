// Stage 6: Panchami / Bodhan (পঞ্চমী — বোধন)
import { gameState } from '../state/gameState.js';
import { audioManager } from '../audio/audioManager.js';
import { svgIcons } from '../assets/svgIcons.js';

export function createPanchamiStage() {
  const container = document.createElement('div');
  container.className = 'stage-container';

  // Header
  const header = document.createElement('div');
  header.className = 'stage-header-block';
  header.innerHTML = `
    <h2 class="stage-title">পঞ্চমী</h2>
    <p class="stage-subtitle">বোধন</p>
  `;

  // Bodhan sacred stage theatre
  const theatre = document.createElement('div');
  theatre.className = 'bodhan-theatre';
  theatre.id = 'bodhan-theatre';

  // Ambient aura and Durga SVG container
  const artworkWrapper = document.createElement('div');
  artworkWrapper.className = 'durga-artwork-container';

  const aura = document.createElement('div');
  aura.className = 'durga-aura';

  const durgaContainer = document.createElement('div');
  durgaContainer.className = 'durga-svg';
  durgaContainer.innerHTML = svgIcons.maaDurgaReveal;

  artworkWrapper.appendChild(aura);
  artworkWrapper.appendChild(durgaContainer);
  theatre.appendChild(artworkWrapper);

  // Message & Final Card container
  const messageArea = document.createElement('div');
  messageArea.id = 'bodhan-message-area';

  container.appendChild(header);
  container.appendChild(theatre);
  container.appendChild(messageArea);

  // Synchronized Bodhan Reveal Sequence
  function startRevealSequence() {
    gameState.completeStage(6);

    // Initial state: face features hidden
    const faceFeatures = durgaContainer.querySelectorAll('.durga-face-feature');
    faceFeatures.forEach(el => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 1.2s ease-in-out';
    });

    // Step 1: Dark / Quiet (0ms - 800ms)

    // Step 2: Lights & Aura begin appearing (at 800ms)
    setTimeout(() => {
      aura.classList.add('visible');
    }, 800);

    // Step 3: Maa Durga silhouette / crown slowly becomes visible (at 1600ms)
    setTimeout(() => {
      durgaContainer.classList.add('revealed');
    }, 1600);

    // Step 4 & 5 & 6: EXACT FACE REVEAL SYNCHRONIZED WITH DHAK REVEAL AUDIO!
    // Face features fade in at exactly 3000ms, and playDhakReveal() triggers at the exact same moment.
    setTimeout(() => {
      // 1. Reveal face features
      faceFeatures.forEach(el => {
        el.style.opacity = '1';
      });

      // 2. Play dhak reveal sound EXACTLY at this synchronized moment
      audioManager.playDhakReveal();
    }, 3000);

    // Step 7 & 8: Final Emotional Card & Messages (at 4500ms)
    setTimeout(() => {
      messageArea.innerHTML = `
        <div class="final-card">
          <h3 class="final-heading">মা এসেছেন।</h3>
          <p class="final-prose">মহালয়া থেকে পঞ্চমী—

এই ছোট্ট আগমনী যাত্রায়
আমাদের সঙ্গে থাকার জন্য ধন্যবাদ।

প্রতিটি ধাপে আপনি মাকে
আরও একটু করে কাছে এনেছেন।

আজ, মা আমাদের ঘরে। ❤️

শুভ পঞ্চমী।
শুভ দুর্গাপূজা।</p>
          <button class="btn-restart" id="btn-journey-restart">
            <span>যাত্রা পুনরায় শুরু করুন (Restart Journey)</span>
          </button>
        </div>
      `;

      const restartBtn = messageArea.querySelector('#btn-journey-restart');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => {
          gameState.resetGame();
        });
      }
    }, 4500);
  }

  // Trigger sequence upon mounting
  setTimeout(() => {
    startRevealSequence();
  }, 200);

  return container;
}
