// Intro overlay: shown on first load / after restart, before the player reaches Stage 1.
export function showIntroOverlay({ onStart } = {}) {
  if (document.getElementById('intro-overlay')) return; // never stack two overlays

  const overlay = document.createElement('div');
  overlay.id = 'intro-overlay';
  overlay.className = 'intro-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'intro-title');
  overlay.setAttribute('aria-describedby', 'intro-desc');

  overlay.innerHTML = `
    <div class="intro-card">
      <p class="intro-eyebrow">দেবীপক্ষের সূচনা</p>
      <h2 class="intro-title" id="intro-title">আগমনী</h2>
      <div class="intro-divider" aria-hidden="true"></div>
      <p class="intro-desc" id="intro-desc">
        মা দুর্গার কৈলাস থেকে মর্ত্যে যাত্রায় স্বাগতম ... এই যাত্রায় মায়ের সঙ্গী হিসেবে প্রত্যেক টা ধাপে আপনার সাহায্য প্রয়োজন।
        <br/>
        <br/>ধাপে ধাপে এগিয়ে মায়ের আসার প্রতিটি মুহূর্ত ছুঁয়ে দেখুন।
        <br/>যাত্রা শুরু হবে মহালয়ার ভোরে — রেডিওর কাঁটা ঘুরিয়ে মহিষাসুরমর্দ্দিনী খুঁজে নিয়ে।
      </p>
      <p class="intro-hint">🔊 ভালো অভিজ্ঞতার জন্য শব্দ চালু রাখুন</p>
      <button type="button" class="intro-start-btn" id="intro-start-btn">শুরু <span class="intro-start-arrow" aria-hidden="true"></span></button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add('intro-open');

  const btn = overlay.querySelector('#intro-start-btn');
  btn.focus();

  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      btn.focus();
    }
  });

  btn.addEventListener('click', () => {
    if (overlay.classList.contains('closing')) return;
    overlay.classList.add('closing');
    document.body.classList.remove('intro-open');
    if (typeof onStart === 'function') onStart();
    setTimeout(() => overlay.remove(), 450);
  });
}