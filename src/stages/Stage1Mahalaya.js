// Stage 1: Mahalaya (মহালয়া — জাগরণের শুরু)
// Player drags the tuning needle across the radio dial until the Mahalaya broadcast comes in.
import { gameState } from '../state/gameState.js';
import { audioManager } from '../audio/audioManager.js';
import { svgIcons } from '../assets/svgIcons.js';
import { visitorCounterService } from '../services/visitorCounterService.js';

visitorCounterService.recordStageLoad();

const FREQ_MIN = 88.0;
const FREQ_MAX = 108.0;
const TARGET_MIN = 95.6;    // station range start
const TARGET_MAX = 96.6;    // station range end
const TARGET_CENTER = (TARGET_MIN + TARGET_MAX) / 2; // 96.1
const LOCK_HOLD_MS = 700;   // must hold the tuning this long
const KEY_STEP = 0.1;

const onStation = (f) => f >= TARGET_MIN && f <= TARGET_MAX;
const distanceToStation = (f) =>
  f < TARGET_MIN ? TARGET_MIN - f : f > TARGET_MAX ? f - TARGET_MAX : 0;

export function createMahalayaStage() {
  const container = document.createElement('div');
  container.className = 'stage-container';

  // Stage Header
  const header = document.createElement('div');
  header.className = 'stage-header-block';
  header.innerHTML = `
    <h3 class="stage-title">পিতৃপক্ষের অবসান ... দেবীপক্ষের সূচনা</h3>
    <br/>
    <p class="stage-instruction">রেডিওর কাঁটা ৯৬ মেগাহার্টজের কাছাকাছি ... মহালয়ার পুণ্য লগ্নে বীরেন্দ্রকৃষ্ণ ভদ্রের গলায় ... মহিষাসুরমর্দ্দিনী</p>
  `;

  // Scene
  const room = document.createElement('div');
  room.className = 'mahalaya-room';
  room.id = 'mahalaya-room';

  const windowScenery = document.createElement('div');
  windowScenery.className = 'window-scenery';
  windowScenery.innerHTML = `
    <div class="window-bars">
      <div class="window-bar"></div>
      <div class="window-bar"></div>
      <div class="window-bar"></div>
    </div>
  `;
  room.appendChild(windowScenery);

  // Decorative diya (already lit, no interaction needed)
  const diyaItem = document.createElement('div');
  diyaItem.className = 'room-item diya-wrapper';
  diyaItem.id = 'mahalaya-diya';
  diyaItem.setAttribute('aria-hidden', 'true');
  diyaItem.innerHTML = `
    <div class="diya-flame"></div>
    ${svgIcons.diya}
    <span style="font-size: 0.75rem; color: var(--color-gold);">মাটির প্রদীপ</span>
  `;

  // Radio with tuning dial
  const radioItem = document.createElement('div');
  radioItem.className = 'room-item radio-wrapper radio-tuner';
  radioItem.id = 'mahalaya-radio';
  radioItem.innerHTML = `
    ${svgIcons.radio}
    <div class="tuner">
      <div class="tuner-readout">
        <span class="tuner-freq" id="tuner-freq">--</span>
        <span class="tuner-unit">MHz</span>
      </div>
      <div class="tuner-dial" id="tuner-dial"
           role="slider" tabindex="0"
           aria-label="Radio frequency"
           aria-valuemin="${FREQ_MIN}" aria-valuemax="${FREQ_MAX}"
           aria-valuenow="${FREQ_MIN}">
        <div class="tuner-ticks"></div>
        <div class="tuner-needle" id="tuner-needle"><div class="tuner-knob"></div></div>
      </div>
      <div class="tuner-scale">
        <span>${FREQ_MIN}</span><span>${(FREQ_MIN + FREQ_MAX) / 2}</span><span>${FREQ_MAX}</span>
      </div>
      <p class="tuner-hint" id="tuner-hint">শুধু ঘ্যাঁ-ঘ্যাঁ শব্দ... কাঁটাটি টেনে দেখুন</p>
    </div>
  `;

  // room.appendChild(diyaItem);
  room.appendChild(radioItem);

  const actionArea = document.createElement('div');
  actionArea.id = 'stage1-action-area';

  container.appendChild(header);
  container.appendChild(room);
  container.appendChild(actionArea);

  const dial = radioItem.querySelector('#tuner-dial');
  const needle = radioItem.querySelector('#tuner-needle');
  const freqLabel = radioItem.querySelector('#tuner-freq');
  const hint = radioItem.querySelector('#tuner-hint');
  const ticks = radioItem.querySelector('.tuner-ticks');

  // Tick marks
  for (let i = 0; i <= 20; i++) {
    const t = document.createElement('i');
    t.className = i % 5 === 0 ? 'tick tick-major' : 'tick';
    ticks.appendChild(t);
  }

  let isCompleted = false;
  let freq = FREQ_MIN + Math.random() * 3; // start well away from the target
  let lockTimer = null;
  let dragging = false;

  // ---- Static noise (Web Audio, created lazily on first user gesture) ----
  let noiseCtx = null;
  let noiseGain = null;
  function startNoise() {
    if (noiseCtx) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      noiseCtx = new Ctx();
      const buffer = noiseCtx.createBuffer(1, noiseCtx.sampleRate * 2, noiseCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const src = noiseCtx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      noiseGain = noiseCtx.createGain();
      noiseGain.gain.value = 0;
      src.connect(noiseGain).connect(noiseCtx.destination);
      src.start();
    } catch (_) {
      noiseCtx = null;
    }
  }
  function stopNoise() {
    if (!noiseCtx) return;
    try {
      noiseGain.gain.setTargetAtTime(0, noiseCtx.currentTime, 0.1);
      const ctx = noiseCtx;
      noiseCtx = null;
      setTimeout(() => ctx.close(), 400);
    } catch (_) { /* ignore */ }
  }

  // closeness: 0 (far) → 1 (inside the station range)
  function closeness(f) {
    return Math.max(0, 1 - distanceToStation(f) / 6);
  }

  function render() {
    const pct = ((freq - FREQ_MIN) / (FREQ_MAX - FREQ_MIN)) * 100;
    needle.style.left = pct + '%';
    freqLabel.textContent = freq.toFixed(1);
    dial.setAttribute('aria-valuenow', freq.toFixed(1));

    const c = closeness(freq);
    room.style.setProperty('--tune-glow', c.toFixed(2));
    if (noiseGain && noiseCtx) {
      // static fades out as we approach the station
      noiseGain.gain.setTargetAtTime(0.12 * (1 - c * c), noiseCtx.currentTime, 0.05);
    }

    if (c > 0.93) hint.textContent = 'প্রায় পেয়ে গেছেন... স্থির থাকুন';
    else if (c > 0.6) hint.textContent = 'দূর থেকে সুর ভেসে আসছে...';
    else if (c > 0.3) hint.textContent = 'ক্ষীণ একটা কণ্ঠস্বর... আরও কাছে';
    else hint.textContent = 'শুধু ঘ্যাঁ-ঘ্যাঁ শব্দ... কাঁটাটি টেনে দেখুন';
  }

  function checkLock() {
    if (isCompleted) return;
    if (onStation(freq) && !lockTimer) {
      lockTimer = setTimeout(() => {
        lockTimer = null;
        if (onStation(freq)) activateRadio();
      }, LOCK_HOLD_MS);
    } else if (!onStation(freq) && lockTimer) {
      clearTimeout(lockTimer);
      lockTimer = null;
    }
  }

  function setFreq(f) {
    // round to 1 decimal so the readout always matches the range check
    freq = Math.round(Math.min(FREQ_MAX, Math.max(FREQ_MIN, f)) * 10) / 10;
    render();
    checkLock();
  }

  function freqFromPointer(e) {
    const rect = dial.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    return FREQ_MIN + Math.min(1, Math.max(0, ratio)) * (FREQ_MAX - FREQ_MIN);
  }

  function activateRadio(skipDelay = false) {
    if (isCompleted) return;
    isCompleted = true;
    clearTimeout(lockTimer);
    stopNoise();

    // Keep the needle where the player stopped; only snap if restoring saved state
    if (!onStation(freq)) freq = TARGET_CENTER;
    render();
    dial.setAttribute('aria-disabled', 'true');
    hint.textContent = 'মহালয়া বাজছে...';

    room.classList.add('illuminated');
    radioItem.classList.add('tuned');

    const soundwaves = document.createElement('div');
    soundwaves.className = 'radio-soundwaves';
    soundwaves.innerHTML = `
      <div class="soundwave-bar"></div>
      <div class="soundwave-bar"></div>
      <div class="soundwave-bar"></div>
      <div class="soundwave-bar"></div>
    `;
    radioItem.appendChild(soundwaves);

    audioManager.playMahalaya();
    gameState.completeStage(1);

    setTimeout(() => {
      actionArea.innerHTML = `
      <div class="stage-banner">
        <p class="stage-banner-sub">কৈলাস থেকে মর্ত্যে মায়ের আগমন যাত্রায় আপনাকে স্বাগতম</p>
        <p class="stage-banner-sub">আশা করছি শেষ পর্যন্ত উপভোগ করবেন</p>
        <button class="btn-continue" id="stage1-continue-btn">
          ${svgIcons.arrowRight}
        </button>
      </div>
    `;
      actionArea.querySelector('#stage1-continue-btn').addEventListener('click', () => {
        gameState.nextStage();
      });
    }, skipDelay ? 0 : 2000);
  }

  // ---- Dragging (mouse, touch, pen via Pointer Events) ----
  dial.addEventListener('pointerdown', (e) => {
    if (isCompleted) return;
    dragging = true;
    dial.setPointerCapture(e.pointerId);
    startNoise();
    if (noiseCtx && noiseCtx.state === 'suspended') noiseCtx.resume();
    setFreq(freqFromPointer(e));
  });

  dial.addEventListener('pointermove', (e) => {
    if (!dragging || isCompleted) return;
    setFreq(freqFromPointer(e));
  });

  const endDrag = (e) => {
    dragging = false;
    if (dial.hasPointerCapture(e.pointerId)) dial.releasePointerCapture(e.pointerId);
  };
  dial.addEventListener('pointerup', endDrag);
  dial.addEventListener('pointercancel', endDrag);

  // ---- Keyboard accessibility ----
  dial.addEventListener('keydown', (e) => {
    if (isCompleted) return;
    let step = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') step = KEY_STEP;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') step = -KEY_STEP;
    else if (e.key === 'PageUp') step = 1;
    else if (e.key === 'PageDown') step = -1;
    else return;
    e.preventDefault();
    startNoise();
    setFreq(freq + step);
  });

  // Make sure noise stops if the stage is removed from the DOM
  const observer = new MutationObserver(() => {
    if (!document.body.contains(container)) {
      stopNoise();
      clearTimeout(lockTimer);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  render();

  // If already completed in state, skip straight to the tuned result
  const { completedStages } = gameState.getState();
  if (completedStages.includes(1)) {
    setTimeout(() => activateRadio(true), 100);
  }

  return container;
}