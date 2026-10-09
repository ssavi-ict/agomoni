// Stage 6: Panchami / Bodhan (পঞ্চমী — বোধন)
import { gameState } from '../state/gameState.js';
import { audioManager } from '../audio/audioManager.js';

const basePath = (import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : './';
const prefix = basePath.endsWith('/') ? basePath : basePath + '/';

export function createPanchamiStage() {
  audioManager.stopAll();

  const container = document.createElement('div');
  container.className = 'stage-container';

  // Header
  const header = document.createElement('div');
  header.className = 'stage-header-block';
  header.innerHTML = `
    <h2 class="stage-title">উমার বোধন</h2>
  `;

  // Bodhan sacred stage theatre
  const theatre = document.createElement('div');
  theatre.className = 'bodhan-theatre';
  theatre.id = 'bodhan-theatre';

  // Ambient aura and Durga container
  const artworkWrapper = document.createElement('div');
  artworkWrapper.className = 'durga-artwork-container';

  const aura = document.createElement('div');
  aura.className = 'durga-aura';

  const durgaContainer = document.createElement('div');
  durgaContainer.className = 'durga-photo-frame';
  durgaContainer.innerHTML = `
    <img src="${prefix}assets/images/durga_final.png" alt="Maa Durga" class="bodhan-durga-photo" />
  `;

  artworkWrapper.appendChild(aura);
  artworkWrapper.appendChild(durgaContainer);
  theatre.appendChild(artworkWrapper);

  // Message & Final Card container
  const messageArea = document.createElement('div');
  messageArea.id = 'bodhan-message-area';

  container.appendChild(header);
  container.appendChild(theatre);
  container.appendChild(messageArea);

  // Drop shiuli flowers

  let shiuliTimer = null;

  function startShiuliShower(host) {
    stopShiuliShower(); // avoid duplicates

    const layer = document.createElement('div');
    layer.className = 'shiuli-layer';
    layer.id = 'shiuli-layer';
    host.appendChild(layer);

    const spawn = () => {
      // Stop automatically if the screen was removed from the DOM
      if (!layer.isConnected) return stopShiuliShower();
      // Safety cap so the DOM never fills up
      if (layer.childElementCount > 40) return;

      const f = document.createElement('div');
      f.className = 'shiuli-flower';
      f.innerHTML = `<img src="${prefix}assets/images/shiuli.png" width="100" height="100" alt="" decoding="async">`;

      // Spawn across the right ~60% of the app area; change to 0–100 for full width
      f.style.left = `${40 + Math.random() * 60}%`;
      f.style.fontSize = `${14 + Math.random() * 14}px`;
      f.style.setProperty('--fall-distance', `${layer.clientHeight + 80}px`);
      f.style.setProperty('--fall-duration', `${6 + Math.random() * 4}s`);
      f.style.setProperty('--sway-mid', `${-20 - Math.random() * 50}px`);
      f.style.setProperty('--sway-end', `${-60 - Math.random() * 100}px`);
      f.style.setProperty('--rot-mid', `${60 + Math.random() * 120}deg`);
      f.style.setProperty('--rot-end', `${180 + Math.random() * 180}deg`);

      layer.appendChild(f);
      f.addEventListener('animationend', () => f.remove());
    };

    spawn();
    shiuliTimer = setInterval(spawn, 450); // lower = denser
  }

  function stopShiuliShower() {
    clearInterval(shiuliTimer);
    shiuliTimer = null;
    document.getElementById('shiuli-layer')?.remove();
  }

  // Synchronized Bodhan Reveal Sequence
  function startRevealSequence() {
    gameState.completeStage(6);

    const durgaPhoto = durgaContainer.querySelector('.bodhan-durga-photo');
    if (durgaPhoto) {
      durgaPhoto.style.opacity = '0';
      durgaPhoto.style.filter = 'blur(10px) brightness(0.4)';
      durgaPhoto.style.transition = 'opacity 2s ease, filter 2.5s ease, transform 2.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
      durgaPhoto.style.transform = 'scale(0.92)';
    }

    // Step 1: Dark / Quiet (0ms - 800ms)

    // Step 2: Lights & Aura begin appearing (at 800ms)
    setTimeout(() => {
      // Play dhak reveal sound EXACTLY at this synchronized moment
      audioManager.playDhakReveal();
      aura.classList.add('visible');
      startShiuliShower(container);
    }, 800);

    // Step 3: Maa Durga silhouette slowly emerges (at 1600ms)
    setTimeout(() => {
      if (durgaPhoto) {
        durgaPhoto.style.opacity = '0.5';
        durgaPhoto.style.filter = 'blur(4px) brightness(0.7)';
      }
    }, 1600);

    // Step 4 & 5 & 6: EXACT FULL REVEAL SYNCHRONIZED WITH DHAK REVEAL AUDIO!
    // Face & image clarify at exactly 3000ms, and playDhakReveal() triggers at the exact same moment.
    setTimeout(() => {
      if (durgaPhoto) {
        durgaPhoto.style.opacity = '1';
        durgaPhoto.style.filter = 'blur(0px) brightness(1.05)';
        durgaPhoto.style.transform = 'scale(1)';
      }
      durgaContainer.classList.add('revealed');
    }, 3000);

    // Step 7 & 8: Final Emotional Card & Messages (at 4500ms)
    setTimeout(() => {
      messageArea.innerHTML = `
        <div class="final-card">
          <h3 class="final-heading"> জয় মা দূর্গা, দুর্গতিনাশিনী</h3>
          <p class="final-prose">মহালয়া থেকে বোধনের এই শুভক্ষণ পর্যন্ত আপনি ছিলেন মায়ের আগমন যাত্রার সঙ্গী।</p>
          <p class="final-prose">এই ছোট্ট আগমনী যাত্রায় সঙ্গে থাকার জন্য ধন্যবাদ।</p>
          <p class="final-prose">মায়ের আশীর্বাদে ভরে উঠুক আপনার ঘর, আপনার পরিবার, আপনার আগামী দিন।</p>
          <p class="final-prose">শুভ দুর্গাপূজা। ❤️</p>
          <button class="btn-restart" id="btn-journey-restart">
            <span>আরেকবার হবে নাকি (Restart)</span>
          </button>
          <hr style="width: 50%; margin: 1rem auto; border-color: var(--border-focus);">
          <p class="final-credits" style="font-size: 0.80rem; font-style: italic;">নমস্কার: <a href="https://www.youtube.com/watch?v=YQyo8QeoYhc">মহালয়া, বীরেন্দ্র কৃষ্ণ ভদ্র</a> | <a href="https://www.youtube.com/watch?v=J_NGbPOsNhI">চন্ডীমঙ্গল, গপ্পো মীরের ঠেক</a></p>
        </div>
      `;

      const restartBtn = messageArea.querySelector('#btn-journey-restart');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => {
          stopShiuliShower();
          audioManager.stopAll();
          gameState.resetGame();
        });
      }
    }, 7000);
  }

  // Trigger sequence upon mounting
  setTimeout(() => {
    startRevealSequence();
  }, 200);

  return container;
}
