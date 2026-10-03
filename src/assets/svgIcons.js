// Rich SVG Artworks & Icons for Agomoni

export const svgIcons = {
  // Navigation & Controls
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  volumeOn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  volumeMuted: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,

  // Stage 1: Mahalaya Objects
  diya: `
    <svg viewBox="0 0 80 60" width="70" height="52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="diyaGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#fff5cc" />
          <stop offset="50%" stop-color="#ff9800" />
          <stop offset="100%" stop-color="#d13030" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Clay bowl -->
      <path d="M10 32C10 46 26 52 40 52C54 52 70 46 70 32C62 36 48 37 40 37C32 37 18 36 10 32Z" fill="#a04423" stroke="#682c16" stroke-width="2"/>
      <ellipse cx="40" cy="32" rx="30" ry="6" fill="#80351a"/>
      <!-- Oil inside -->
      <ellipse cx="40" cy="33" rx="25" ry="4" fill="#d97724"/>
      <!-- Cotton wick -->
      <path d="M38 34L40 24" stroke="#4a1508" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Flame -->
      <path class="diya-flame-svg" d="M40 8C43 14 47 18 47 24C47 29 43 32 40 32C37 32 33 29 33 24C33 18 37 14 40 8Z" fill="url(#diyaGlow)" filter="drop-shadow(0 0 8px #ff9800)"/>
    </svg>
  `,

  radio: `
    <svg viewBox="0 0 120 90" width="110" height="82" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Wooden vintage cabinet -->
      <rect x="10" y="20" width="100" height="64" rx="8" fill="#5c3822" stroke="#3d2314" stroke-width="3"/>
      <!-- Wood grain panel -->
      <rect x="16" y="26" width="88" height="52" rx="4" fill="#75482c"/>
      <!-- Speaker cloth grille -->
      <rect x="22" y="32" width="46" height="40" rx="3" fill="#2b1a10"/>
      <line x1="26" y1="36" x2="64" y2="36" stroke="#c49a6c" stroke-width="1.5" stroke-dasharray="3 3"/>
      <line x1="26" y1="44" x2="64" y2="44" stroke="#c49a6c" stroke-width="1.5" stroke-dasharray="3 3"/>
      <line x1="26" y1="52" x2="64" y2="52" stroke="#c49a6c" stroke-width="1.5" stroke-dasharray="3 3"/>
      <line x1="26" y1="60" x2="64" y2="60" stroke="#c49a6c" stroke-width="1.5" stroke-dasharray="3 3"/>
      <line x1="26" y1="68" x2="64" y2="68" stroke="#c49a6c" stroke-width="1.5" stroke-dasharray="3 3"/>
      <!-- Tuning dial window -->
      <rect x="74" y="32" width="24" height="18" rx="2" fill="#1b120c" stroke="#d5a864" stroke-width="1"/>
      <line x1="86" y1="34" x2="86" y2="48" stroke="#f53d3d" stroke-width="1.5"/>
      <text x="76" y="44" fill="#a48e71" font-size="6" font-family="monospace">MW</text>
      <!-- Vintage brass control knobs -->
      <circle cx="86" cy="58" r="6" fill="#c6954b" stroke="#7e5a26" stroke-width="1.5"/>
      <circle cx="86" cy="58" r="2" fill="#22150a"/>
      <!-- Antenna -->
      <line x1="22" y1="20" x2="12" y2="6" stroke="#9e9e9e" stroke-width="2" stroke-linecap="round"/>
      <circle cx="12" cy="6" r="2.5" fill="#c6954b"/>
    </svg>
  `,

  // Stage 2: Transports
  palanquin: `
    <svg viewBox="0 0 100 80" width="80" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Palanquin pole -->
      <line x1="5" y1="42" x2="95" y2="42" stroke="#8d5b2c" stroke-width="4" stroke-linecap="round"/>
      <!-- Carriage body -->
      <rect x="25" y="24" width="50" height="38" rx="4" fill="#a32020" stroke="#f5b335" stroke-width="1.5"/>
      <!-- Curved roof -->
      <path d="M20 24C30 14 70 14 80 24Z" fill="#f5b335" stroke="#c48a1b" stroke-width="1.5"/>
      <!-- Decorative Kalash top -->
      <circle cx="50" cy="12" r="3" fill="#f5b335"/>
      <!-- Window with curtain -->
      <rect x="36" y="32" width="28" height="20" rx="3" fill="#fcf6ea" stroke="#8d5b2c"/>
      <path d="M36 32Q50 42 64 32V38Q50 46 36 38Z" fill="#a32020"/>
    </svg>
  `,

  horse: `
    <svg viewBox="0 0 100 80" width="80" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Galloping divine white/gold steed -->
      <path d="M18 52C22 45 28 42 38 42H58C66 42 74 36 78 28C81 22 84 15 88 12C91 10 94 13 93 18C92 24 88 28 88 34C88 42 78 50 74 54C70 58 68 64 68 70H62L64 56H42L40 70H34L35 55C30 57 24 58 18 52Z" fill="#f7f2ea" stroke="#d5c8b2" stroke-width="2"/>
      <!-- Mane & Harness -->
      <path d="M80 16C82 22 79 30 75 36" stroke="#f5b335" stroke-width="3" stroke-linecap="round"/>
      <path d="M86 18L91 22" stroke="#a32020" stroke-width="1.5"/>
      <!-- Red festive saddle cloth -->
      <path d="M44 42C44 42 46 50 56 50C66 50 68 42 68 42Z" fill="#a32020" stroke="#f5b335" stroke-width="1"/>
      <circle cx="89" cy="16" r="1.5" fill="#22160d"/>
    </svg>
  `,

  elephant: `
    <svg viewBox="0 0 100 80" width="80" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Royal Elephant (Gaja) -->
      <path d="M22 68L24 50C24 38 34 26 50 26C65 26 78 35 80 48C81 56 82 64 80 70H72L74 54H54L52 70H44L46 54H32L30 68H22Z" fill="#69747c" stroke="#485259" stroke-width="2"/>
      <!-- Trunk & Ear -->
      <path d="M80 48C84 52 88 60 88 66C88 70 82 72 80 67C79 63 78 56 78 50" fill="none" stroke="#69747c" stroke-width="5" stroke-linecap="round"/>
      <!-- Ear -->
      <path d="M62 30C68 30 72 38 70 48C68 55 60 56 58 52" fill="#58636b"/>
      <!-- Gold Tilak / Ornaments -->
      <path d="M72 32Q76 38 72 44" stroke="#f5b335" stroke-width="2"/>
      <circle cx="75" cy="36" r="1.5" fill="#22160d"/>
    </svg>
  `,

  boat: `
    <svg viewBox="0 0 100 80" width="80" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Traditional Bengali wooden dinghy (Nowka / নৌকা) -->
      <path d="M10 44C25 58 75 58 90 44C78 50 60 52 50 52C40 52 22 50 10 44Z" fill="#5a3518" stroke="#3c220d" stroke-width="2"/>
      <!-- Boat shelter canopy (chhoi) -->
      <path d="M35 46C35 30 65 30 65 46" fill="#c49a6c" stroke="#8d6840" stroke-width="2"/>
      <line x1="42" y1="46" x2="42" y2="34" stroke="#8d6840"/>
      <line x1="50" y1="46" x2="50" y2="32" stroke="#8d6840"/>
      <line x1="58" y1="46" x2="58" y2="34" stroke="#8d6840"/>
      <!-- Gentle river wave ripples -->
      <path d="M5 60Q25 54 50 60Q75 66 95 60" stroke="#4fa3d1" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  // Stage 3: Deities
  ganesha: `
    <svg viewBox="0 0 80 90" width="60" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Ganesha -->
      <circle cx="40" cy="22" r="12" fill="#e8986c"/>
      <path d="M40 22C42 28 46 34 44 38C42 40 38 40 38 36" stroke="#c27349" stroke-width="4" stroke-linecap="round"/>
      <!-- Big ears -->
      <path d="M28 18C22 18 20 28 26 32" fill="#e8986c" stroke="#c27349"/>
      <path d="M52 18C58 18 60 28 54 32" fill="#e8986c" stroke="#c27349"/>
      <!-- Mukut (Crown) -->
      <path d="M32 12L40 4L48 12H32Z" fill="#f5b335" stroke="#b88118"/>
      <!-- Yellow Dhoti body -->
      <path d="M28 40C28 40 22 66 40 66C58 66 52 40 52 40Z" fill="#ffb300" stroke="#c48a00"/>
      <!-- Sweet Modak / Laddu in hand -->
      <circle cx="26" cy="46" r="3.5" fill="#f5b335"/>
    </svg>
  `,

  lakshmi: `
    <svg viewBox="0 0 80 90" width="60" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Devi Lakshmi -->
      <!-- Golden Crown -->
      <path d="M30 14L40 5L50 14H30Z" fill="#f5b335" stroke="#b88118"/>
      <!-- Face -->
      <circle cx="40" cy="22" r="10" fill="#fce5cd"/>
      <!-- Sindoor Bindi -->
      <circle cx="40" cy="19" r="1.5" fill="#d13030"/>
      <!-- Red Saree with golden border -->
      <path d="M26 36C26 36 22 68 40 68C58 68 54 36 54 36Z" fill="#a31d1d" stroke="#f5b335" stroke-width="1.5"/>
      <!-- Holding Pink Lotus -->
      <path d="M55 42C52 40 54 36 57 37C60 38 60 42 55 42Z" fill="#f48fb1"/>
      <!-- Golden Kalash base -->
      <ellipse cx="40" cy="74" rx="16" ry="5" fill="#f5b335"/>
    </svg>
  `,

  durga: `
    <svg viewBox="0 0 80 90" width="60" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Central Maa Durga -->
      <!-- Radiant High Mukut -->
      <path d="M26 16L40 2L54 16H26Z" fill="#f5b335" stroke="#c48a00" stroke-width="1.5"/>
      <circle cx="40" cy="2" r="2.5" fill="#d13030"/>
      <!-- Face & Trinayan -->
      <circle cx="40" cy="24" r="11" fill="#fce5cd"/>
      <path d="M36 24Q40 21 44 24Q40 27 36 24Z" fill="#d13030"/>
      <circle cx="40" cy="19" r="1.5" fill="#d13030"/>
      <!-- Majestic Red/Gold Robe -->
      <path d="M22 38C22 38 18 70 40 70C62 70 58 38 58 38Z" fill="#b71c1c" stroke="#f5b335" stroke-width="2"/>
      <!-- Lion mane glimpse at feet -->
      <path d="M30 74C35 70 45 70 50 74" stroke="#d59b2d" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `,

  saraswati: `
    <svg viewBox="0 0 80 90" width="60" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Devi Saraswati -->
      <!-- Silver/White Crown -->
      <path d="M30 14L40 5L50 14H30Z" fill="#f5b335" stroke="#b88118"/>
      <!-- Face -->
      <circle cx="40" cy="22" r="10" fill="#fce5cd"/>
      <!-- Pure White / Cream Saree with subtle yellow drape -->
      <path d="M26 36C26 36 22 68 40 68C58 68 54 36 54 36Z" fill="#faf7f0" stroke="#f5b335" stroke-width="1.5"/>
      <!-- Sacred Veena -->
      <line x1="28" y1="56" x2="52" y2="34" stroke="#8d5423" stroke-width="3" stroke-linecap="round"/>
      <circle cx="28" cy="56" r="4.5" fill="#a06029"/>
      <circle cx="52" cy="34" r="3" fill="#a06029"/>
      <!-- White Swan motif base -->
      <ellipse cx="40" cy="74" rx="16" ry="5" fill="#e0e0e0"/>
    </svg>
  `,

  kartikeya: `
    <svg viewBox="0 0 80 90" width="60" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Kartikeya (Devasenapati) -->
      <!-- Warrior Crown -->
      <path d="M30 14L40 5L50 14H30Z" fill="#f5b335" stroke="#b88118"/>
      <!-- Face -->
      <circle cx="40" cy="22" r="10" fill="#fce5cd"/>
      <!-- Royal Emerald / Blue Robes -->
      <path d="M26 36C26 36 22 68 40 68C58 68 54 36 54 36Z" fill="#1b5e20" stroke="#f5b335" stroke-width="1.5"/>
      <!-- Divine Bow & Arrow -->
      <path d="M25 32Q20 44 25 56" stroke="#f5b335" stroke-width="2" fill="none"/>
      <!-- Peacock feather at feet -->
      <path d="M40 70C44 66 52 68 55 74" stroke="#00897b" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `,

  // Stage 4: 10 Weapons
  chakra: `
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="15" stroke="#f5b335" stroke-width="2.5"/>
      <circle cx="20" cy="20" r="5" fill="#f5b335"/>
      <line x1="20" y1="5" x2="20" y2="35" stroke="#f5b335" stroke-width="1.5"/>
      <line x1="5" y1="20" x2="35" y2="20" stroke="#f5b335" stroke-width="1.5"/>
      <line x1="9.4" y1="9.4" x2="30.6" y2="30.6" stroke="#f5b335" stroke-width="1.5"/>
      <line x1="9.4" y1="30.6" x2="30.6" y2="9.4" stroke="#f5b335" stroke-width="1.5"/>
    </svg>
  `,
  trident: `
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Trishula -->
      <line x1="20" y1="6" x2="20" y2="36" stroke="#d13030" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M12 12C12 20 20 22 20 22C20 22 28 20 28 12" stroke="#d13030" stroke-width="2" fill="none"/>
      <path d="M20 6L18 10H22L20 6Z" fill="#f5b335"/>
      <path d="M12 12L10 15H14L12 12Z" fill="#f5b335"/>
      <path d="M28 12L26 15H30L28 12Z" fill="#f5b335"/>
    </svg>
  `,
  sword: `
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Curved Kharga -->
      <path d="M14 34L26 18C28 14 31 10 33 6C29 8 26 12 24 16L12 32" stroke="#607d8b" stroke-width="2" fill="#cfd8dc"/>
      <line x1="10" y1="31" x2="16" y2="37" stroke="#f5b335" stroke-width="3"/>
      <circle cx="10" cy="35" r="2.5" fill="#f5b335"/>
    </svg>
  `,
  thunderbolt: `
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Vajra -->
      <line x1="8" y1="32" x2="32" y2="8" stroke="#f5b335" stroke-width="3"/>
      <path d="M6 34L12 28L14 30L8 36Z" fill="#e65100"/>
      <path d="M26 10L32 4L34 6L28 12Z" fill="#e65100"/>
      <circle cx="20" cy="20" r="4" fill="#ffb300"/>
    </svg>
  `,
  lotus: `
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Padma -->
      <path d="M20 10C16 16 12 24 20 28C28 24 24 16 20 10Z" fill="#f48fb1"/>
      <path d="M20 28C14 26 8 20 12 16C15 20 18 24 20 28Z" fill="#f06292"/>
      <path d="M20 28C26 26 32 20 28 16C25 20 22 24 20 28Z" fill="#f06292"/>
      <line x1="20" y1="28" x2="20" y2="36" stroke="#4caf50" stroke-width="2"/>
    </svg>
  `,
  conch: `
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Shankha -->
      <path d="M12 24C10 18 16 12 24 12C30 12 32 16 30 22C28 28 20 30 14 28" fill="#f5f5f5" stroke="#d5d5d5" stroke-width="2"/>
      <path d="M18 14C22 18 24 24 22 28" stroke="#e0e0e0" stroke-width="1.5"/>
      <circle cx="28" cy="18" r="2" fill="#f5b335"/>
    </svg>
  `,
  spear: `
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Spear / Shakti -->
      <line x1="6" y1="34" x2="30" y2="10" stroke="#795548" stroke-width="2.5"/>
      <path d="M28 8L36 4L32 12Z" fill="#d13030" stroke="#b71c1c"/>
    </svg>
  `,
  bow: `
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Dhanush -->
      <path d="M10 10C24 18 24 28 10 36" stroke="#8d5b2c" stroke-width="2.5" fill="none"/>
      <line x1="10" y1="10" x2="10" y2="36" stroke="#bdbdbd" stroke-width="1.5"/>
      <!-- Arrow -->
      <line x1="8" y1="23" x2="30" y2="23" stroke="#f5b335" stroke-width="1.5"/>
      <path d="M26 20L32 23L26 26Z" fill="#d13030"/>
    </svg>
  `,
  snake: `
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Sarpa (Nagpasha) -->
      <path d="M10 32C14 28 18 30 22 26C26 22 22 16 28 12C32 9 34 14 30 18" stroke="#2e7d32" stroke-width="3" stroke-linecap="round" fill="none"/>
      <circle cx="10" cy="32" r="2.5" fill="#1b5e20"/>
    </svg>
  `,
  axe: `
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Parashu -->
      <line x1="12" y1="36" x2="26" y2="8" stroke="#8d5b2c" stroke-width="2.5"/>
      <path d="M24 10C28 6 34 8 36 14C34 18 28 20 22 18" fill="#78909c" stroke="#455a64" stroke-width="1.5"/>
    </svg>
  `,

  // Stage 5: Dhak & Puja items
  dhak: `
    <svg viewBox="0 0 90 80" width="80" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Traditional Dhak with feathers/kash -->
      <!-- Drum body -->
      <rect x="25" y="20" width="40" height="46" rx="6" fill="#a04018" stroke="#5a220a" stroke-width="2"/>
      <!-- Drum skins -->
      <ellipse cx="45" cy="20" rx="20" ry="6" fill="#f4ebd9" stroke="#5a220a" stroke-width="1.5"/>
      <ellipse cx="45" cy="66" rx="20" ry="6" fill="#f4ebd9" stroke="#5a220a" stroke-width="1.5"/>
      <!-- Rope tension lacings (zigzag) -->
      <path d="M25 22L45 66L65 22" stroke="#ebd2aa" stroke-width="1.5"/>
      <path d="M35 22L55 66" stroke="#ebd2aa" stroke-width="1.5"/>
      <!-- White Kash feather tufts tied on top -->
      <path d="M25 18C18 10 14 4 10 2" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <path d="M25 20C16 16 12 12 8 8" stroke="#f0f0f0" stroke-width="2" stroke-linecap="round"/>
      <!-- Drumsticks (Kathi) -->
      <line x1="68" y1="14" x2="52" y2="34" stroke="#d5a864" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="74" y1="20" x2="56" y2="38" stroke="#d5a864" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,

  // Stage 6: The Divine Bodhan Maa Durga Iconography
  maaDurgaReveal: `
    <svg viewBox="0 0 240 260" width="220" height="240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="divineGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#fff5cc" stop-opacity="0.8"/>
          <stop offset="60%" stop-color="#ffb300" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#d13030" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="goldCrown" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fff" />
          <stop offset="30%" stop-color="#ffd54f" />
          <stop offset="70%" stop-color="#f57f17" />
          <stop offset="100%" stop-color="#ffca28" />
        </linearGradient>
        <linearGradient id="skinTone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffebd4" />
          <stop offset="100%" stop-color="#fed6af" />
        </linearGradient>
      </defs>

      <!-- Back Chalchitra halo arc -->
      <path d="M20 180C20 70 65 20 120 20C175 20 220 70 220 180" stroke="#f5b335" stroke-width="4" stroke-dasharray="6 4" fill="none"/>
      <circle cx="120" cy="115" r="85" fill="url(#divineGlow)"/>

      <!-- Ornate Bengali Daaker Shaaj Mukut (Grand Golden Crown) -->
      <path d="M70 70L120 12L170 70C155 76 138 78 120 78C102 78 85 76 70 70Z" fill="url(#goldCrown)" stroke="#e65100" stroke-width="2"/>
      <!-- Mukut Jewels & Peak -->
      <circle cx="120" cy="12" r="5" fill="#d13030"/>
      <circle cx="120" cy="38" r="4" fill="#d13030"/>
      <circle cx="95" cy="52" r="3" fill="#d13030"/>
      <circle cx="145" cy="52" r="3" fill="#d13030"/>

      <!-- Maa Durga's Serene Divine Face -->
      <path class="durga-face-feature" d="M78 85C78 145 100 168 120 168C140 168 162 145 162 85H78Z" fill="url(#skinTone)" stroke="#e0a876" stroke-width="1"/>

      <!-- Golden Kaan-pasha (Large Ear Ornaments) -->
      <circle cx="70" cy="112" r="10" fill="url(#goldCrown)" stroke="#b78103"/>
      <circle cx="170" cy="112" r="10" fill="url(#goldCrown)" stroke="#b78103"/>

      <!-- Trinayan (The Sacred Three Divine Eyes) -->
      <!-- Left Eye -->
      <path class="durga-face-feature" d="M88 106Q102 96 112 108Q102 116 88 106Z" fill="#ffffff" stroke="#22160d" stroke-width="1.5"/>
      <ellipse class="durga-face-feature" cx="102" cy="106" rx="4.5" ry="4.5" fill="#1b120c"/>
      <path class="durga-face-feature" d="M84 98Q102 88 114 100" stroke="#1b120c" stroke-width="2" fill="none"/>

      <!-- Right Eye -->
      <path class="durga-face-feature" d="M152 106Q138 96 128 108Q138 116 152 106Z" fill="#ffffff" stroke="#22160d" stroke-width="1.5"/>
      <ellipse class="durga-face-feature" cx="138" cy="106" rx="4.5" ry="4.5" fill="#1b120c"/>
      <path class="durga-face-feature" d="M156 98Q138 88 126 100" stroke="#1b120c" stroke-width="2" fill="none"/>

      <!-- Third Eye on Forehead (Agni Trinayan) -->
      <path class="durga-face-feature" d="M120 72Q126 84 120 94Q114 84 120 72Z" fill="#d13030"/>
      <ellipse class="durga-face-feature" cx="120" cy="83" rx="1.8" ry="3" fill="#ffffff"/>

      <!-- Chandan Alpona dots on brow -->
      <circle class="durga-face-feature" cx="112" cy="80" r="1.2" fill="#ffffff"/>
      <circle class="durga-face-feature" cx="128" cy="80" r="1.2" fill="#ffffff"/>
      <circle class="durga-face-feature" cx="106" cy="84" r="1.2" fill="#ffffff"/>
      <circle class="durga-face-feature" cx="134" cy="84" r="1.2" fill="#ffffff"/>

      <!-- Divine Smile (Lips) -->
      <path class="durga-face-feature" d="M110 142Q120 148 130 142" stroke="#d13030" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path class="durga-face-feature" d="M113 143Q120 145 127 143" fill="#d13030"/>

      <!-- Sacred Nath (Traditional Golden Bengali Nose Ring) -->
      <circle class="durga-face-feature" cx="127" cy="128" r="9" stroke="url(#goldCrown)" stroke-width="1.8" fill="none"/>
      <path class="durga-face-feature" d="M135 125Q150 118 162 114" stroke="url(#goldCrown)" stroke-width="1.2" fill="none"/>

      <!-- Red Sindoor Border Drape & Ornaments -->
      <path d="M60 170C60 170 85 160 120 160C155 160 180 170 180 170V240H60V170Z" fill="#a01818" stroke="#f5b335" stroke-width="2"/>
      <!-- Grand Chik / Haar (Gold Necklaces) -->
      <path d="M90 176Q120 196 150 176" stroke="url(#goldCrown)" stroke-width="3" fill="none"/>
      <path d="M82 192Q120 216 158 192" stroke="url(#goldCrown)" stroke-width="3" fill="none"/>
    </svg>
  `
};
