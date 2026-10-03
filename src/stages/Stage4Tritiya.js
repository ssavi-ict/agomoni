// Stage 4: Shukla Tritiya (শুক্লা তৃতীয়া — মায়ের অস্ত্র)
import { gameState } from '../state/gameState.js';
import { svgIcons } from '../assets/svgIcons.js';

const CANONICAL_WEAPONS = [
  // Left Arc (indices 0 to 4)
  { id: 'chakra', code: 'CHAKRA', bengali: 'চক্র', icon: svgIcons.chakra, arc: 'left' },
  { id: 'trident', code: 'TRIDENT', bengali: 'ত্রিশূল', icon: svgIcons.trident, arc: 'left' },
  { id: 'sword', code: 'SWORD', bengali: 'খড়্গ', icon: svgIcons.sword, arc: 'left' },
  { id: 'thunderbolt', code: 'THUNDERBOLT', bengali: 'বজ্র', icon: svgIcons.thunderbolt, arc: 'left' },
  { id: 'lotus', code: 'LOTUS', bengali: 'পদ্ম', icon: svgIcons.lotus, arc: 'left' },

  // Right Arc (indices 5 to 9)
  { id: 'conch', code: 'CONCH', bengali: 'শঙ্খ', icon: svgIcons.conch, arc: 'right' },
  { id: 'spear', code: 'SPEAR', bengali: 'শক্তি/বর্শা', icon: svgIcons.spear, arc: 'right' },
  { id: 'bow', code: 'BOW', bengali: 'ধনুর্বাণ', icon: svgIcons.bow, arc: 'right' },
  { id: 'snake', code: 'SNAKE', bengali: 'সর্প', icon: svgIcons.snake, arc: 'right' },
  { id: 'axe', code: 'AXE', bengali: 'কুঠার', icon: svgIcons.axe, arc: 'right' }
];

export function createTritiyaStage() {
  const container = document.createElement('div');
  container.className = 'stage-container';

  // Header
  const header = document.createElement('div');
  header.className = 'stage-header-block';
  header.innerHTML = `
    <h2 class="stage-title">শুক্লা তৃতীয়া</h2>
    <p class="stage-subtitle">মায়ের অস্ত্র</p>
    <p class="stage-instruction">দশপ্রহরণধারিণীর দশটি অস্ত্রের মধ্যে যে দুটি অনুপস্থিত (?) তা চিহ্নিত করুন</p>
  `;

  const board = document.createElement('div');
  board.className = 'weapons-board';

  const arcsWrapper = document.createElement('div');
  arcsWrapper.className = 'weapon-arcs-wrapper';

  const leftArcCol = document.createElement('div');
  leftArcCol.className = 'weapon-arc';
  leftArcCol.innerHTML = `<span class="arc-header">বাম হস্তের অস্ত্র (Left Arc)</span>`;
  const leftSlotsRow = document.createElement('div');
  leftSlotsRow.className = 'weapon-slots-row';
  leftArcCol.appendChild(leftSlotsRow);

  const rightArcCol = document.createElement('div');
  rightArcCol.className = 'weapon-arc';
  rightArcCol.innerHTML = `<span class="arc-header">ডান হস্তের অস্ত্র (Right Arc)</span>`;
  const rightSlotsRow = document.createElement('div');
  rightSlotsRow.className = 'weapon-slots-row';
  rightArcCol.appendChild(rightSlotsRow);

  arcsWrapper.appendChild(leftArcCol);
  arcsWrapper.appendChild(rightArcCol);

  // 10 Weapon Chips Pool
  const chipsPool = document.createElement('div');
  chipsPool.className = 'weapon-chips-pool';

  const feedbackArea = document.createElement('div');
  feedbackArea.className = 'feedback-msg';
  feedbackArea.id = 'tritiya-feedback';

  const actionArea = document.createElement('div');
  actionArea.id = 'stage4-action-area';

  board.appendChild(arcsWrapper);
  board.appendChild(chipsPool);
  board.appendChild(feedbackArea);

  container.appendChild(header);
  container.appendChild(board);
  container.appendChild(actionArea);

  // Pick exactly 2 random distinct indices among 0..9 for the missing positions
  const missingIndices = [];
  while (missingIndices.length < 2) {
    const r = Math.floor(Math.random() * 10);
    if (!missingIndices.includes(r)) {
      missingIndices.push(r);
    }
  }

  // Solved missing slots tracking: map missingIndex -> weaponCode placed
  const filledMissingSlots = {};
  let selectedChipCode = null;
  let isCompleted = false;

  function checkCompletion() {
    const allFilledCorrect = missingIndices.every(idx => {
      const canonical = CANONICAL_WEAPONS[idx];
      return filledMissingSlots[idx] === canonical.code;
    });

    if (allFilledCorrect && !isCompleted) {
      isCompleted = true;
      feedbackArea.textContent = 'দশভুজার সকল অস্ত্র তেজস্ক্রিয় জ্যোতিতে উদ্ভাসিত!';
      renderSlots();
      renderChips();

      gameState.completeStage(4);

      actionArea.innerHTML = `
        <div class="stage-banner">
          <p class="stage-banner-text">মায়ের শক্তি সম্পূর্ণ।</p>
          <p class="stage-banner-sub">মা আরও একটু কাছে...</p>
          <button class="btn-continue" id="stage4-continue-btn">
            <span>পরের ধাপ</span>
            ${svgIcons.arrowRight}
          </button>
        </div>
      `;

      actionArea.querySelector('#stage4-continue-btn').addEventListener('click', () => {
        gameState.nextStage();
      });
    }
  }

  function handleSlotClick(idx) {
    if (isCompleted || !missingIndices.includes(idx)) return;

    if (selectedChipCode) {
      const canonical = CANONICAL_WEAPONS[idx];
      if (selectedChipCode === canonical.code) {
        filledMissingSlots[idx] = selectedChipCode;
        feedbackArea.textContent = `সঠিক! ${canonical.code} প্রতিষ্ঠিত হয়েছে।`;
        selectedChipCode = null;
        renderSlots();
        renderChips();
        checkCompletion();
      } else {
        feedbackArea.textContent = 'এই স্থানে অস্ত্রটির রূপ ভিন্ন... অন্যটি নির্বাচন করুন।';
      }
    } else {
      feedbackArea.textContent = 'নিচের অস্ত্রপট্টিকা থেকে একটি নাম নির্বাচন করুন।';
    }
  }

  function renderSlots() {
    leftSlotsRow.innerHTML = '';
    rightSlotsRow.innerHTML = '';

    CANONICAL_WEAPONS.forEach((weapon, idx) => {
      const isMissing = missingIndices.includes(idx);
      const isSolved = isCompleted || filledMissingSlots[idx] === weapon.code;
      const slot = document.createElement('div');
      slot.className = `weapon-slot ${isMissing && !isSolved ? 'missing' : ''} ${isSolved ? 'solved' : ''}`;
      slot.setAttribute('data-index', idx);
      slot.setAttribute('role', 'button');
      slot.setAttribute('tabindex', isMissing ? '0' : '-1');

      if (isMissing && !isSolved) {
        slot.textContent = '?';
        slot.title = 'Missing Weapon Position. Tap to fill';
      } else {
        // Display weapon icon only, NEVER displaying weapon name text inside positions!
        slot.innerHTML = weapon.icon;
        slot.title = isCompleted ? weapon.code : 'Weapon Slot';
      }

      slot.addEventListener('click', () => handleSlotClick(idx));
      slot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSlotClick(idx);
        }
      });

      if (idx < 5) {
        leftSlotsRow.appendChild(slot);
      } else {
        rightSlotsRow.appendChild(slot);
      }
    });
  }

  function renderChips() {
    chipsPool.innerHTML = '';
    CANONICAL_WEAPONS.forEach(weapon => {
      const chip = document.createElement('button');
      const isUsed = Object.values(filledMissingSlots).includes(weapon.code);
      const isSelected = selectedChipCode === weapon.code;

      chip.className = `weapon-chip ${isSelected ? 'selected' : ''} ${isUsed ? 'used' : ''}`;
      chip.textContent = weapon.code;
      chip.setAttribute('aria-label', `Select weapon chip ${weapon.code}`);

      if (!isUsed && !isCompleted) {
        chip.addEventListener('click', () => {
          if (selectedChipCode === weapon.code) {
            selectedChipCode = null;
          } else {
            selectedChipCode = weapon.code;
          }
          renderChips();
        });
      }

      chipsPool.appendChild(chip);
    });
  }

  // Check if stage 4 was already completed in state
  const { completedStages } = gameState.getState();
  if (completedStages.includes(4)) {
    missingIndices.forEach(idx => {
      filledMissingSlots[idx] = CANONICAL_WEAPONS[idx].code;
    });
    setTimeout(() => {
      checkCompletion();
    }, 100);
  } else {
    renderSlots();
    renderChips();
  }

  return container;
}
