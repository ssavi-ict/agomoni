// Stage 5: Shukla Chaturthi ("Start the Puja")
import { gameState } from '../state/gameState.js';
import { audioManager } from '../audio/audioManager.js';
import { svgIcons } from '../assets/svgIcons.js';

const basePath = (import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : './';
const prefix = basePath.endsWith('/') ? basePath : basePath + '/';

const pujaImages = {
  diya: 'pradip.png',
  dhak: 'dhak.png',
  conch: 'shankha.png',
};

function pujaImg(key) {
  // onerror swaps in the old SVG if the file is missing or misnamed
  const fallback = encodeURIComponent(svgIcons[key]);
  return `<img class="puja-item-img" src="${prefix}assets/images/${pujaImages[key]}"
               alt="" draggable="false" decoding="async"
               onerror="this.outerHTML=decodeURIComponent('${fallback}')">`;
}

export function createChaturthiStage() {
  const container = document.createElement('div');
  container.className = 'stage-container';

  // Header — MUST be titled exactly "Start the Puja"
  const header = document.createElement('div');
  header.className = 'stage-header-block';
  header.innerHTML = `
    <h3 class="stage-title">আবাহন</h3>
    <br/>
    <p class="stage-instruction">শুরুটা আলোয়, তারপর ধ্বনি আর শেষে ঢ্যাং কুড়াকুড় ... </p>
  `;

  // Altar showing 3 items
  const altar = document.createElement('div');
  altar.className = 'puja-altar';

  // 1. Diya
  const diyaCard = document.createElement('div');
  diyaCard.className = 'puja-item-card';
  diyaCard.id = 'puja-diya';
  diyaCard.setAttribute('role', 'button');
  diyaCard.setAttribute('tabindex', '0');
  diyaCard.setAttribute('aria-label', 'Light the Sacred Diya');
  diyaCard.innerHTML = `
    <div style="position: relative;">
      <div class="diya-flame" style="opacity: 0; transition: opacity 0.4s ease;" id="chaturthi-flame"></div>
      ${pujaImg('diya')}
    </div>
    <span class="puja-item-title">Diya</span>
    <span class="puja-item-bengali">মঙ্গল প্রদীপ</span>
  `;

  // 2. Dhak
  const dhakCard = document.createElement('div');
  dhakCard.className = 'puja-item-card';
  dhakCard.id = 'puja-dhak';
  dhakCard.setAttribute('role', 'button');
  dhakCard.setAttribute('tabindex', '0');
  dhakCard.setAttribute('aria-label', 'Sound the Festive Dhak');
  dhakCard.innerHTML = `
    <div id="dhak-graphic-container">
      ${pujaImg('dhak')}
    </div>
    <span class="puja-item-title">Dhak</span>
    <span class="puja-item-bengali">ঢাক</span>
  `;

  // 3. Conch
  const conchCard = document.createElement('div');
  conchCard.className = 'puja-item-card';
  conchCard.id = 'puja-conch';
  conchCard.setAttribute('role', 'button');
  conchCard.setAttribute('tabindex', '0');
  conchCard.setAttribute('aria-label', 'Blow the Sacred Conch (Shankha)');
  conchCard.innerHTML = `
    <div id="conch-graphic-container">
      ${pujaImg('conch')}
    </div>
    <span class="puja-item-title">Conch</span>
    <span class="puja-item-bengali">মঙ্গল শঙ্খ</span>
  `;

  [diyaCard, conchCard, dhakCard].forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  altar.appendChild(conchCard);
  altar.appendChild(diyaCard);
  altar.appendChild(dhakCard);

  const feedbackArea = document.createElement('div');
  feedbackArea.className = 'feedback-msg';
  feedbackArea.id = 'chaturthi-feedback';

  const actionArea = document.createElement('div');
  actionArea.id = 'stage5-action-area';

  container.appendChild(header);
  container.appendChild(altar);
  container.appendChild(feedbackArea);
  container.appendChild(actionArea);

  /// Correct sequence discovery: Diya (step 0) -> Conch (step 1) -> Dhak (step 2)
  let currentStep = 0;
  let isCompleted = false;

  function onComplete() {
    if (isCompleted) return;
    isCompleted = true;

    feedbackArea.textContent = 'মণ্ডপ আনন্দ ও ভক্তিতে ভরে উঠেছে...';
    altar.style.boxShadow = 'var(--shadow-glow)';

    gameState.completeStage(5);

    setTimeout(() => {
      actionArea.innerHTML = `
        <div class="stage-banner stage5-completion-banner">
          <div class="stage5-durga-wrapper">
            <div class="stage5-durga-aura"></div>
            ${svgIcons.maaDurgaReveal}
          </div>
          <p class="stage-banner-text">জাগো দূর্গা</p>
          <p class="stage-banner-sub">অভয়া শক্তি বলপ্রদায়িনী তুমি জাগো...</p>
          <!-- <button class="btn-continue" id="stage5-continue-btn">
            ${svgIcons.arrowRight}
          </button> -->
          <p class="stage5-bodhon-note">
            আরে ... চললেন কোথায়? মায়ের বোধন টা যে এখনো বাকি ...
            <span class="stage5-bodhon-timer" id="stage5-bodhon-timer">১০</span>
          </p>
        </div>
      `;
      (function startBodhonCountdown(seconds) {
        const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        const toBengali = (n) => String(n).replace(/\d/g, (d) => bnDigits[d]);

        const timerEl = document.getElementById('stage5-bodhon-timer');
        if (!timerEl) return;

        let remaining = seconds;
        timerEl.textContent = toBengali(remaining);

        const intervalId = setInterval(() => {
          // Stop if the banner was removed (e.g. the auto-navigation already happened)
          if (!document.body.contains(timerEl) || remaining <= 1) {
            clearInterval(intervalId);
            if (remaining <= 1 && document.body.contains(timerEl)) {
              timerEl.textContent = toBengali(0);
            }
            return;
          }

          remaining -= 1;
          timerEl.textContent = toBengali(remaining);
        }, 1000);
      })(10);

      // actionArea.querySelector('#stage5-continue-btn').addEventListener('click', () => {
      //   audioManager.stopAll();
      //   gameState.nextStage();
      // });
      setTimeout(() => {
        audioManager.stopAll();
        gameState.nextStage();
      }, 10000);
    }, 2000);
  }

  // Diya interaction
  diyaCard.addEventListener('click', () => {
    if (isCompleted) return;
    audioManager.stopAll();
    const flame = diyaCard.querySelector('#chaturthi-flame');
    if (flame) flame.style.opacity = '1';
    diyaCard.classList.add('activated');

    if (currentStep === 0) {
      currentStep = 1;
      feedbackArea.textContent = 'প্রদীপের আলোয় বেদী আলোকিত হলো...';
      audioManager.playDiya();
    } else {
      // Re-lighting if already done or out of turn
      feedbackArea.textContent = 'প্রদীপ প্রজ্বলিত।';
    }
  });

  // Conch interaction (now step 1)
  conchCard.addEventListener('click', () => {
    if (isCompleted) return;
    conchCard.classList.add('activated');
    const graphic = conchCard.querySelector('#conch-graphic-container');
    if (graphic) {
      graphic.style.transform = 'scale(1.15)';
      setTimeout(() => { graphic.style.transform = 'scale(1)'; }, 600);
    }

    if (currentStep === 1) {
      currentStep = 2;
      feedbackArea.textContent = 'শঙ্খধ্বনিতে দেবীর আবাহন ধ্বনিত হলো...';
      audioManager.playConch();
    } else if (currentStep === 0) {
      feedbackArea.textContent = 'প্রথমে মণ্ডপে মঙ্গলপ্রদীপ প্রজ্জ্বলন করুন...';
    } else if (currentStep === 2) {
      // Conch already blown; guide toward the final step
      feedbackArea.textContent = 'শঙ্খ ধ্বনিত হয়েছে, এবার ঢাকের মঙ্গলবাদন হোক...';
    }
  });

  // Dhak interaction (now the final step 2)
  dhakCard.addEventListener('click', () => {
    if (isCompleted) return;
    dhakCard.classList.add('activated');
    const graphic = dhakCard.querySelector('#dhak-graphic-container');
    if (graphic) {
      graphic.style.transform = 'scale(1.1) rotate(4deg)';
      setTimeout(() => { graphic.style.transform = 'scale(1) rotate(0deg)'; }, 400);
    }

    if (currentStep === 2) {
      feedbackArea.textContent = 'ঢাকের বোলে বাতাসে আগমনীর শিহরণ...';
      // Play dhak sound and animate drum shake
      audioManager.playDhak();
      onComplete();
    } else if (currentStep === 0) {
      feedbackArea.textContent = 'পূজার সূচনায় প্রথমে মঙ্গলদীপের পবিত্র আলো প্রয়োজন...';
    } else if (currentStep === 1) {
      feedbackArea.textContent = 'ঢাকের পূর্বে মঙ্গল শঙ্খধ্বনি হোক...';
    }
  });

  // Check if stage 5 already completed in state
  const { completedStages } = gameState.getState();
  if (completedStages.includes(5)) {
    const flame = diyaCard.querySelector('#chaturthi-flame');
    if (flame) flame.style.opacity = '1';
    diyaCard.classList.add('activated');
    dhakCard.classList.add('activated');
    conchCard.classList.add('activated');
    setTimeout(() => {
      onComplete();
    }, 100);
  }

  return container;
}
