// Stage 4: Shukla Tritiya (শুক্লা তৃতীয়া — Weaponize Ma Durga)
import { gameState } from '../state/gameState.js';
import { svgIcons } from '../assets/svgIcons.js';

export function createTritiyaStage() {
  const container = document.createElement('div');
  container.className = 'stage-container stage4-container';

  // Canonical sequence — never randomized
  const LEFT = ['CHAKRA', 'TRIDENT', 'SWORD', 'THUNDERBOLT', 'LOTUS'];
  const RIGHT = ['CONCH', 'SPEAR', 'BOW', 'SNAKE', 'AXE'];
  const ALL = Object.freeze([...LEFT, ...RIGHT]);

  // Display only. Never used for comparison.
  const LABEL_BN = Object.freeze({
    CHAKRA: 'চক্র',
    TRIDENT: 'ত্রিশূল',
    SWORD: 'তরবারি',
    THUNDERBOLT: 'বজ্র',
    LOTUS: 'পদ্ম',
    CONCH: 'শঙ্খ',
    SPEAR: 'বর্শা',
    BOW: 'ধনুক',
    SNAKE: 'সাপ',
    AXE: 'কুড়াল',
  });
  const bn = key => LABEL_BN[key] ?? key; // falls back to the key if one is missing

  // Header
  const header = document.createElement('div');
  header.className = 'stage-header-block';
  header.innerHTML = `
    <h3 class="stage-title">দশপ্রহরণধারিণী</h3>
    <p id="stage4-status" class="stage-instruction" aria-live="polite">❓চিহ্নিত হাত দুটোতে কোন অস্ত্র দুটো দিই বলুন তো ... 🤔 আপনিই বরং ওই নিচে রাখা অস্ত্র গুলো থেকে পড়িয়ে দিন</p>
  `;

  // Arena with Hub
  const arena = document.createElement('div');
  arena.id = 'arena';
  arena.innerHTML = `<div id="hub">ॐ</div>`;

  // Chips Tray
  const tray = document.createElement('div');
  tray.id = 'tray';
  tray.setAttribute('aria-label', 'Weapon chips');

  // Bar with Misses and New Attempt
  const bar = document.createElement('div');
  bar.className = 'bar';
  bar.innerHTML = `
    <span>তেমন কিছু না ... <b id="stage4-misses">0</b> বার চেষ্টা করা যেতেই পারে!</span>
    <!--<button id="stage4-again" type="button">New attempt</button>-->
  `;

  // Action Area for Continue button upon completion
  const actionArea = document.createElement('div');
  actionArea.id = 'stage4-action-area';

  container.appendChild(header);
  container.appendChild(arena);
  container.appendChild(tray);
  container.appendChild(bar);
  container.appendChild(actionArea);

  const statusEl = header.querySelector('#stage4-status');
  const missesEl = bar.querySelector('#stage4-misses');
  const hub = arena.querySelector('#hub');
  // const againBtn = bar.querySelector('#stage4-again');

  let slots = [];          // slot elements, index = canonical position
  let missing = new Set(); // exactly 2 indices
  let filled = new Set();
  let misses = 0;
  let done = false;
  let selected = null;     // click-to-place fallback

  function shuffle(a) {
    const arr = a.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Two small arcs facing each other: ( ) shapes, 5 positions each.
  function layout() {
    slots.forEach((el, i) => {
      const side = i < 5 ? 0 : 1;
      const k = i % 5;
      const t = (k - 2) / 2;                       // -1 … 1
      const bulge = 0.085 * t * t;                 // ends curve toward the centre
      const x = side === 0 ? 0.20 + bulge : 0.80 - bulge;
      const y = 0.5 + t * 0.37;
      el.style.left = (x * 100) + '%';
      el.style.top = (y * 100) + '%';
    });
  }

  function newRound() {
    done = false;
    filled = new Set();
    misses = 0;
    selected = null;
    missesEl.textContent = '0';
    hub.classList.remove('done');
    tray.classList.remove('done');
    actionArea.innerHTML = '';

    // pick exactly 2 random missing positions
    const idx = shuffle([...Array(10).keys()]);
    missing = new Set(idx.slice(0, 2));

    arena.querySelectorAll('.slot').forEach(s => s.remove());
    slots = ALL.map((name, i) => {
      const el = document.createElement('div');
      el.className = 'slot ' + (missing.has(i) ? 'missing' : 'sealed');
      el.dataset.i = i;
      el.style.setProperty('--i', i);
      el.setAttribute('aria-label', missing.has(i) ? 'Missing weapon position' : 'Sealed weapon position');
      el.innerHTML = '<span class="label"></span>';
      if (missing.has(i)) el.insertAdjacentText('afterbegin', '?');
      el.addEventListener('click', () => { if (selected) attempt(selected, el); });
      arena.appendChild(el);
      return el;
    });
    layout();

    // all 10 chips (tray order is shuffled; the canonical sequence is untouched)
    tray.innerHTML = '';
    shuffle(ALL).forEach(name => {
      const c = document.createElement('div');
      c.className = 'chip';
      c.textContent = bn(name);
      c.dataset.w = name;
      c.setAttribute('role', 'button');
      c.setAttribute('tabindex', '0');
      c.addEventListener('pointerdown', e => startDrag(c, e));
      c.addEventListener('contextmenu', e => e.preventDefault());
      c.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectChip(c);
        }
      });
      tray.appendChild(c);
    });

    statusEl.innerHTML = '❓চিহ্নিত হাত দুটোতে কোন অস্ত্র দুটো দিই বলুন তো 🤔<br/>আপনিই বরং ওই নিচে রাখা অস্ত্র গুলো থেকে পড়িয়ে দিন';
  }

  function selectChip(c) {
    if (done || c.classList.contains('used')) return;
    const was = c.classList.contains('selected');
    tray.querySelectorAll('.chip.selected').forEach(chipEl => chipEl.classList.remove('selected'));
    selected = was ? null : c;
    if (selected) c.classList.add('selected');
  }

  /* ---------- drag handling (mouse + touch) ---------- */
  function startDrag(chip, e) {
    if (done || chip.classList.contains('used')) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();

    const pid = e.pointerId;
    const isTouch = e.pointerType !== 'mouse';
    const THRESHOLD = isTouch ? 10 : 6;
    const LIFT = isTouch ? 56 : 0;          // keep the ghost visible above the finger
    const sx = e.clientX, sy = e.clientY;
    let moved = false, ghost = null, over = null;

    try { chip.setPointerCapture(pid); } catch (_) { }

    function move(ev) {
      if (ev.pointerId !== pid) return;
      if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) > THRESHOLD) {
        moved = true;
        ghost = chip.cloneNode(true);
        ghost.classList.add('ghost');
        document.body.appendChild(ghost);
        chip.classList.add('dragging');
      }
      if (!moved) return;
      const gx = ev.clientX, gy = ev.clientY - LIFT;
      ghost.style.left = gx + 'px';
      ghost.style.top = gy + 'px';
      const s = slotAt(gx, gy);
      if (over && over !== s) over.classList.remove('over');
      over = s;
      if (s && s.classList.contains('missing') && !s.classList.contains('filled')) {
        s.classList.add('over');
      }
    }

    function end(ev) {
      if (ev.pointerId !== pid) return;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
      try { chip.releasePointerCapture(pid); } catch (_) { }
      if (over) over.classList.remove('over');
      chip.classList.remove('dragging');
      if (ghost) ghost.remove();

      if (ev.type === 'pointercancel') return;   // a cancelled touch is not a drop

      if (moved) {
        const s = slotAt(ev.clientX, ev.clientY - LIFT);
        if (s) attempt(chip, s);
      } else {
        selectChip(chip);                         // plain tap: select, then tap a ?
      }
    }

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
  }

  // Nearest slot within a forgiving radius (instead of an exact elementFromPoint hit)
  function slotAt(x, y) {
    let best = null, bestD = Infinity;
    for (const s of slots) {
      const r = s.getBoundingClientRect();
      const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
      if (d < bestD) { best = s; bestD = d; }
    }
    if (!best) return null;
    return bestD <= best.getBoundingClientRect().width * 0.75 ? best : null;
  }

  function attempt(chip, slot) {
    if (done) return;
    const i = +slot.dataset.i;
    const word = chip.dataset.w;
    if (!missing.has(i) || filled.has(i)) return wrong(slot);
    if (ALL[i] !== word) return wrong(slot);

    filled.add(i);
    slot.classList.add('filled');
    slot.classList.remove('over');
    if (slot.firstChild && slot.firstChild.nodeType === 3) {
      slot.removeChild(slot.firstChild); // drop the "?"
    }
    slot.querySelector('.label').textContent = bn(word);
    chip.classList.remove('selected');
    chip.classList.add('used');
    selected = null;

    if (filled.size === missing.size) {
      complete();
    } else {
      statusEl.textContent = 'দারুন! আর একটা মাত্র বাকি ...';
    }
  }

  function wrong(slot) {
    misses++;
    missesEl.textContent = misses;
    slot.classList.remove('shake');
    void slot.offsetWidth; // re-trigger animation
    slot.classList.add('shake');
    setTimeout(() => slot.classList.remove('shake'), 450);
    statusEl.textContent = 'ওহ! এটা তো ঠিক হল না ... আবার চেষ্টা করুন';
  }

  function complete() {
    done = true;
    selected = null;
    tray.querySelectorAll('.chip.selected').forEach(c => c.classList.remove('selected'));
    slots.forEach((el, i) => {
      el.querySelector('.label').textContent = bn(ALL[i]);
      el.classList.remove('missing', 'sealed');
      el.classList.add('revealed');
    });
    hub.classList.add('done');
    tray.classList.add('done');
    for (let r = 0; r < 3; r++) {
      setTimeout(() => {
        const ring = document.createElement('div');
        ring.className = 'ring';
        arena.appendChild(ring);
        setTimeout(() => ring.remove(), 2300);
      }, r * 450);
    }
    statusEl.textContent = 'মা দশভুজার অলৌকিক আভা দশদিকে প্রকাশিত ... জয় মা দূর্গা';

    // Agomoni Progression
    gameState.completeStage(4);

    setTimeout(() => {
      actionArea.innerHTML = `
        <div class="stage-banner">
          <p class="stage-banner-sub">ঢাকে কাঠি পড়লো বলে ... আগমনী আর বেশি দূরে নয়</p>
          <button class="btn-continue" id="stage4-continue-btn">
            ${svgIcons.arrowRight}
          </button>
        </div>
      `;

      actionArea.querySelector('#stage4-continue-btn').addEventListener('click', () => {
        gameState.nextStage();
      });
    }, 2000);
  }

  //againBtn.addEventListener('click', newRound);
  window.addEventListener('resize', layout);

  // Initialize
  newRound();

  // If already completed in state, show continue action area directly while allowing replay
  const { completedStages } = gameState.getState();
  if (completedStages.includes(4)) {
    // Reveal all directly
    complete();
  }

  return container;
}
