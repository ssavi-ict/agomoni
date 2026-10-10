(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const ge="agomoni-game-state";class xe{constructor(){this.listeners=new Set,this.state=this.loadInitialState()}loadInitialState(){const e=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t={currentStage:1,completedStages:[],theme:e?"dark":"light",muted:!1};try{const o=localStorage.getItem(ge);if(o){const i=JSON.parse(o);return{...t,...i,currentStage:Math.max(1,Math.min(6,i.currentStage||1)),completedStages:Array.isArray(i.completedStages)?i.completedStages:[]}}}catch(o){console.warn("LocalStorage unavailable or corrupt. Using default state.",o)}return t}saveState(){try{localStorage.setItem(ge,JSON.stringify(this.state))}catch(e){console.warn("Failed to save game state to localStorage:",e)}}getState(){return{...this.state}}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){const e=this.getState();this.listeners.forEach(t=>{try{t(e)}catch(o){console.error("Error in state listener:",o)}})}setStage(e){e<1||e>6||(this.state.currentStage=e,this.saveState(),this.notify())}completeStage(e){this.state.completedStages.includes(e)||(this.state.completedStages=[...this.state.completedStages,e]),this.saveState(),this.notify()}nextStage(){this.state.currentStage<6&&(this.state.currentStage+=1,this.saveState(),this.notify())}setTheme(e){this.state.theme=e,this.saveState(),this.notify()}toggleTheme(){const e=this.state.theme==="dark"?"light":"dark";this.setTheme(e)}setMuted(e){this.state.muted=!!e,this.saveState(),this.notify()}toggleMuted(){this.setMuted(!this.state.muted)}resetGame(){this.state.currentStage=1,this.state.completedStages=[],this.state.restartCount=(this.state.restartCount||0)+1,this.saveState(),this.notify()}}const C=new xe,x={sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',volumeOn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>',volumeMuted:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>',arrowRight:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',diya:`
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
  `,radio:`
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
  `,palanquin:`
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
  `,horse:`
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
  `,elephant:`
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
  `,boat:`
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
  `,ganesha:`
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
  `,lakshmi:`
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
  `,durga:`
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
  `,saraswati:`
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
  `,kartikeya:`
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
  `,chakra:`
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="15" stroke="#f5b335" stroke-width="2.5"/>
      <circle cx="20" cy="20" r="5" fill="#f5b335"/>
      <line x1="20" y1="5" x2="20" y2="35" stroke="#f5b335" stroke-width="1.5"/>
      <line x1="5" y1="20" x2="35" y2="20" stroke="#f5b335" stroke-width="1.5"/>
      <line x1="9.4" y1="9.4" x2="30.6" y2="30.6" stroke="#f5b335" stroke-width="1.5"/>
      <line x1="9.4" y1="30.6" x2="30.6" y2="9.4" stroke="#f5b335" stroke-width="1.5"/>
    </svg>
  `,trident:`
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Trishula -->
      <line x1="20" y1="6" x2="20" y2="36" stroke="#d13030" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M12 12C12 20 20 22 20 22C20 22 28 20 28 12" stroke="#d13030" stroke-width="2" fill="none"/>
      <path d="M20 6L18 10H22L20 6Z" fill="#f5b335"/>
      <path d="M12 12L10 15H14L12 12Z" fill="#f5b335"/>
      <path d="M28 12L26 15H30L28 12Z" fill="#f5b335"/>
    </svg>
  `,sword:`
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Curved Kharga -->
      <path d="M14 34L26 18C28 14 31 10 33 6C29 8 26 12 24 16L12 32" stroke="#607d8b" stroke-width="2" fill="#cfd8dc"/>
      <line x1="10" y1="31" x2="16" y2="37" stroke="#f5b335" stroke-width="3"/>
      <circle cx="10" cy="35" r="2.5" fill="#f5b335"/>
    </svg>
  `,thunderbolt:`
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Vajra -->
      <line x1="8" y1="32" x2="32" y2="8" stroke="#f5b335" stroke-width="3"/>
      <path d="M6 34L12 28L14 30L8 36Z" fill="#e65100"/>
      <path d="M26 10L32 4L34 6L28 12Z" fill="#e65100"/>
      <circle cx="20" cy="20" r="4" fill="#ffb300"/>
    </svg>
  `,lotus:`
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Padma -->
      <path d="M20 10C16 16 12 24 20 28C28 24 24 16 20 10Z" fill="#f48fb1"/>
      <path d="M20 28C14 26 8 20 12 16C15 20 18 24 20 28Z" fill="#f06292"/>
      <path d="M20 28C26 26 32 20 28 16C25 20 22 24 20 28Z" fill="#f06292"/>
      <line x1="20" y1="28" x2="20" y2="36" stroke="#4caf50" stroke-width="2"/>
    </svg>
  `,conch:`
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Shankha -->
      <path d="M12 24C10 18 16 12 24 12C30 12 32 16 30 22C28 28 20 30 14 28" fill="#f5f5f5" stroke="#d5d5d5" stroke-width="2"/>
      <path d="M18 14C22 18 24 24 22 28" stroke="#e0e0e0" stroke-width="1.5"/>
      <circle cx="28" cy="18" r="2" fill="#f5b335"/>
    </svg>
  `,spear:`
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Spear / Shakti -->
      <line x1="6" y1="34" x2="30" y2="10" stroke="#795548" stroke-width="2.5"/>
      <path d="M28 8L36 4L32 12Z" fill="#d13030" stroke="#b71c1c"/>
    </svg>
  `,bow:`
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Dhanush -->
      <path d="M10 10C24 18 24 28 10 36" stroke="#8d5b2c" stroke-width="2.5" fill="none"/>
      <line x1="10" y1="10" x2="10" y2="36" stroke="#bdbdbd" stroke-width="1.5"/>
      <!-- Arrow -->
      <line x1="8" y1="23" x2="30" y2="23" stroke="#f5b335" stroke-width="1.5"/>
      <path d="M26 20L32 23L26 26Z" fill="#d13030"/>
    </svg>
  `,snake:`
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Sarpa (Nagpasha) -->
      <path d="M10 32C14 28 18 30 22 26C26 22 22 16 28 12C32 9 34 14 30 18" stroke="#2e7d32" stroke-width="3" stroke-linecap="round" fill="none"/>
      <circle cx="10" cy="32" r="2.5" fill="#1b5e20"/>
    </svg>
  `,axe:`
    <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Parashu -->
      <line x1="12" y1="36" x2="26" y2="8" stroke="#8d5b2c" stroke-width="2.5"/>
      <path d="M24 10C28 6 34 8 36 14C34 18 28 20 22 18" fill="#78909c" stroke="#455a64" stroke-width="1.5"/>
    </svg>
  `,dhak:`
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
  `,maaDurgaReveal:`
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
  `};function Ee(){const a=document.createElement("button");a.className="icon-btn",a.id="theme-toggle-btn",a.setAttribute("aria-label","Toggle night mode");function e(){const{theme:t}=C.getState();a.innerHTML=t==="dark"?x.sun:x.moon,a.title=t==="dark"?"Switch to Light Mode":"Switch to Night Mode"}return a.addEventListener("click",()=>{C.toggleTheme()}),C.subscribe(e),e(),a}function Te(){const a=document.createElement("button");a.className="icon-btn",a.id="audio-toggle-btn",a.setAttribute("aria-label","Toggle audio mute");function e(){const{muted:t}=C.getState();a.innerHTML=t?x.volumeMuted:x.volumeOn,a.title=t?"Unmute Audio":"Mute Audio"}return a.addEventListener("click",()=>{C.toggleMuted()}),C.subscribe(e),e(),a}const Se={};class Le{constructor(){this.audioContext=null,this.currentAudios=new Set,this.activeAudiosByKey=new Map,this.audioNodes=new Map,this.fadeTimers=new Map,this.basePath="./",this.basePath.endsWith("/")||(this.basePath+="/"),this.audioUrls={mahalaya:`${this.basePath}assets/audio/mahalaya.mp3`,diya:`${this.basePath}assets/audio/diya.mp3`,dhak:`${this.basePath}assets/audio/dhak.mp3`,conch:`${this.basePath}assets/audio/conch.mp3`,finalReveal:`${this.basePath}assets/audio/chandi_mangal.mp3`},C.subscribe(e=>{this.handleMuteChange(e.muted)})}getAudioContext(){if(!this.audioContext&&typeof window<"u"&&(window.AudioContext||window.webkitAudioContext)){const e=window.AudioContext||window.webkitAudioContext;this.audioContext=new e}return this.audioContext&&this.audioContext.state==="suspended"&&this.audioContext.resume().catch(()=>{}),this.audioContext}isMuted(){return C.getState().muted}handleMuteChange(e){this.currentAudios.forEach(t=>{t.muted=e})}createAudioGain(e){try{const t=this.getAudioContext();if(!(t!=null&&t.createMediaElementSource)||!t.createGain)return null;const o=t.createMediaElementSource(e),i=t.createGain();o.connect(i),i.connect(t.destination);const s={source:o,gain:i,volume:1};return this.audioNodes.set(e,s),s}catch(t){return console.info("Mahalaya audio fade is unavailable; using media volume controls.",(t==null?void 0:t.message)||t),null}}clearFade(e){const t=this.fadeTimers.get(e);t&&(t.timeoutId!==null&&clearTimeout(t.timeoutId),t.intervalId!==null&&clearInterval(t.intervalId),this.fadeTimers.delete(e))}cleanupAudio(e){this.clearFade(e),this.currentAudios.delete(e);const t=this.audioNodes.get(e);t&&(t.source.disconnect(),t.gain.disconnect(),this.audioNodes.delete(e));for(const[o,i]of this.activeAudiosByKey)i===e&&this.activeAudiosByKey.delete(o)}fadeTo(e,t,o=2e3,i=!1){const s=this.activeAudiosByKey.get(e);if(!s||s.paused||o<=0)return;const r=this.audioNodes.get(s),n=r?this.audioContext.currentTime:Date.now(),l=this.fadeTimers.get(s),h=l?Math.min((n-l.startTime)/l.duration,1):1,p=Math.min(Math.max(t,0),1),u=l?l.startVolume+(l.targetVolume-l.startVolume)*h:r?r.volume:s.volume;if(this.clearFade(s),r){const{gain:f}=r;f.gain.cancelScheduledValues(n),f.gain.setValueAtTime(u,n),f.gain.linearRampToValueAtTime(p,n+o/1e3);const k=setTimeout(()=>{this.fadeTimers.delete(s),r.volume=p,i&&this.stopAudio(s)},o);this.fadeTimers.set(s,{timeoutId:k,intervalId:null,startTime:n,duration:o/1e3,startVolume:u,targetVolume:p});return}const c=n,y=setInterval(()=>{const f=Math.min((Date.now()-c)/o,1);s.volume=u+(p-u)*f,f===1&&(this.clearFade(s),i&&this.stopAudio(s))},50);this.fadeTimers.set(s,{timeoutId:null,intervalId:y,startTime:c,duration:o,startVolume:u,targetVolume:p})}fadeOut(e,t=2e3){this.fadeTo(e,0,t,!0)}stopAudio(e){this.clearFade(e);try{e.pause(),e.currentTime=0}catch(t){console.info("Audio could not be stopped cleanly.",(t==null?void 0:t.message)||t)}this.cleanupAudio(e)}async playSound(e,t){if(this.isMuted())return null;const o=this.audioUrls[e];if(o){let i;try{i=new Audio(o),i.muted=this.isMuted(),this.currentAudios.add(i),this.activeAudiosByKey.set(e,i),e==="mahalaya"&&this.createAudioGain(i),i.onended=()=>{this.cleanupAudio(i)};const s=i.play();if(s!==void 0)return await s,i}catch(s){i&&this.cleanupAudio(i),console.info(`Audio file '${e}' not found or blocked. Playing graceful procedural audio fallback.`,(s==null?void 0:s.message)||s)}}if(t)try{t(this.getAudioContext())}catch(i){console.warn("Audio fallback synthesis failed gracefully:",i)}return null}playMahalaya(){return this.playSound("mahalaya",e=>{if(!e)return;const t=e.currentTime;[146.83,220,293.66,440].forEach((i,s)=>{const r=e.createOscillator(),n=e.createGain();r.type="sine",r.frequency.setValueAtTime(i,t+s*.15),n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(.08,t+1.2+s*.2),n.gain.exponentialRampToValueAtTime(1e-4,t+5.5),r.connect(n),n.connect(e.destination),r.start(t+s*.15),r.stop(t+6)})})}playDiya(){return this.playSound("diya",e=>{if(!e)return;const t=e.currentTime,o=Math.floor(e.sampleRate*.5),i=e.createBuffer(1,o,e.sampleRate),s=i.getChannelData(0);for(let c=0;c<o;c++)s[c]=Math.random()*2-1;const r=e.createBufferSource();r.buffer=i;const n=e.createBiquadFilter(),l=e.createGain();n.type="bandpass",n.Q.setValueAtTime(1.2,t),n.frequency.setValueAtTime(400,t),n.frequency.exponentialRampToValueAtTime(1800,t+.35),l.gain.setValueAtTime(0,t),l.gain.linearRampToValueAtTime(.07,t+.08),l.gain.exponentialRampToValueAtTime(1e-4,t+.45),r.connect(n),n.connect(l),l.connect(e.destination),r.start(t),r.stop(t+.5);const h=t+.12,p=880;[{ratio:1,amp:.12,decay:2.4},{ratio:2,amp:.07,decay:1.8},{ratio:2.76,amp:.05,decay:1.4},{ratio:5.4,amp:.03,decay:.9},{ratio:8.93,amp:.015,decay:.5}].forEach(({ratio:c,amp:y,decay:f})=>{const k=e.createOscillator(),b=e.createGain();k.type="sine",k.frequency.setValueAtTime(p*c,h),b.gain.setValueAtTime(0,h),b.gain.linearRampToValueAtTime(y,h+.01),b.gain.exponentialRampToValueAtTime(1e-4,h+f),k.connect(b),b.connect(e.destination),k.start(h),k.stop(h+f+.05)})})}playConch(){return this.playSound("conch",e=>{if(!e)return;const t=e.currentTime,o=415.3,i=2.6,s=e.createOscillator(),r=e.createOscillator(),n=e.createGain(),l=e.createBiquadFilter();l.type="bandpass",l.frequency.setValueAtTime(o*2,t),l.Q.setValueAtTime(3.5,t),s.type="sawtooth",r.type="triangle",s.frequency.setValueAtTime(o*.96,t),s.frequency.exponentialRampToValueAtTime(o,t+.5),s.frequency.exponentialRampToValueAtTime(o*1.01,t+1.8),s.frequency.exponentialRampToValueAtTime(o*.94,t+i),r.frequency.setValueAtTime(o*1.98,t),r.frequency.exponentialRampToValueAtTime(o*2.01,t+i),n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(.18,t+.4),n.gain.setValueAtTime(.18,t+i-.7),n.gain.exponentialRampToValueAtTime(1e-4,t+i),s.connect(l),r.connect(l),l.connect(n),n.connect(e.destination),s.start(t),r.start(t),s.stop(t+i),r.stop(t+i)})}playDhak(){return this.playSound("dhak",e=>{if(!e)return;const t=e.currentTime;[0,.22,.44,.65,.9,1.15,1.4].forEach((i,s)=>{const r=t+i,n=e.createOscillator(),l=e.createGain(),h=s%2===1;n.type=h?"square":"triangle",n.frequency.setValueAtTime(h?380:160,r),n.frequency.exponentialRampToValueAtTime(h?220:80,r+.12),l.gain.setValueAtTime(.25,r),l.gain.exponentialRampToValueAtTime(.001,r+.18),n.connect(l),l.connect(e.destination),n.start(r),n.stop(r+.2)})})}playDhakReveal(){return this.playSound("finalReveal",e=>{if(!e)return;const t=e.currentTime,o=[0,.1,.2,.28,.36,.44,.52,.6,.68,.76,.85,.95,1.05,1.15,1.25,1.4,1.6,1.8,2,2.3];o.forEach((r,n)=>{const l=t+r,h=e.createOscillator(),p=e.createGain(),u=n%2===1;h.type=u?"square":"triangle";const c=u?340:180;h.frequency.setValueAtTime(c,l),h.frequency.exponentialRampToValueAtTime(c*.5,l+.15);const y=Math.min(.35,.12+n/o.length*.25);p.gain.setValueAtTime(y,l),p.gain.exponentialRampToValueAtTime(.001,l+.2),h.connect(p),p.connect(e.destination),h.start(l),h.stop(l+.22)});const i=t+1.4;[523.25,659.25,783.99,1046.5].forEach(r=>{const n=e.createOscillator(),l=e.createGain();n.type="sine",n.frequency.setValueAtTime(r,i),l.gain.setValueAtTime(.12,i),l.gain.exponentialRampToValueAtTime(1e-4,i+3.5),n.connect(l),l.connect(e.destination),n.start(i),n.stop(i+3.8)})})}stopAll(){this.currentAudios.forEach(e=>{this.stopAudio(e)}),this.currentAudios.clear(),this.activeAudiosByKey.clear()}}const T=new Le;function Ae(){const a=document.createElement("button");return a.className="icon-btn",a.id="btn-header-restart",a.type="button",a.setAttribute("aria-label","Restart Journey"),a.title="যাত্রা পুনরায় শুরু করুন (Restart Journey)",a.innerHTML=`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <polyline points="3 3 3 9 9 9" />
    </svg>
  `,a.addEventListener("click",()=>{confirm("যাত্রা পুনরায় শুরু করবেন? (Restart the journey?)")&&(T.stopAll(),C.resetGame())}),a}function Me(){const a=document.createElement("header");a.className="theatre-header";const e=document.createElement("div");e.className="brand-section",e.innerHTML=`
    <h1 class="brand-title">
      <span class="bengali-title">আগমনী</span>
    </h1>
  `;const t=document.createElement("div");t.className="journey-progress",t.setAttribute("aria-label","Maa's Journey Progress");const o=document.createElement("span");o.className="journey-label",o.textContent="অগ্রগতি";const i=document.createElement("div");i.className="progress-dots";for(let l=1;l<=6;l++){const h=document.createElement("span");h.className="progress-dot",h.dataset.stage=l,i.appendChild(h)}t.appendChild(o),t.appendChild(i);const s=Ae(),r=document.createElement("div");r.className="header-controls",r.appendChild(s),r.appendChild(Te()),r.appendChild(Ee()),a.appendChild(e),a.appendChild(t),a.appendChild(r);function n(){const{currentStage:l,completedStages:h}=C.getState();i.querySelectorAll(".progress-dot").forEach((u,c)=>{const y=c+1;u.classList.remove("active","completed"),h.includes(y)?u.classList.add("completed"):y===l&&u.classList.add("active")})}return C.subscribe(n),n(),a}const Re="modulepreload",_e=function(a,e){return new URL(a,e).href},ye={},ve=function(e,t,o){let i=Promise.resolve();if(t&&t.length>0){let r=function(p){return Promise.all(p.map(u=>Promise.resolve(u).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};const n=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),h=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));i=r(t.map(p=>{if(p=_e(p,o),p in ye)return;ye[p]=!0;const u=p.endsWith(".css"),c=u?'[rel="stylesheet"]':"";if(!!o)for(let k=n.length-1;k>=0;k--){const b=n[k];if(b.href===p&&(!u||b.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${c}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":Re,u||(f.as="script"),f.crossOrigin="",f.href=p,h&&f.setAttribute("nonce",h),document.head.appendChild(f),u)return new Promise((k,b)=>{f.addEventListener("load",k),f.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${p}`)))})}))}function s(r){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=r,window.dispatchEvent(n),!n.defaultPrevented)throw r}return i.then(r=>{for(const n of r||[])n.status==="rejected"&&s(n.reason);return e().catch(s)})},Ie={VITE_FIREBASE_API_KEY:"",VITE_FIREBASE_APP_ID:"",VITE_FIREBASE_AUTH_DOMAIN:"",VITE_FIREBASE_DATABASE_URL:"https://cracktech-ext-default-rtdb.asia-southeast1.firebasedatabase.app/",VITE_FIREBASE_MEASUREMENT_ID:"",VITE_FIREBASE_MESSAGING_SENDER_ID:"",VITE_FIREBASE_PROJECT_ID:"",VITE_FIREBASE_STORAGE_BUCKET:""},I=Ie??{},D={apiKey:I.VITE_FIREBASE_API_KEY,authDomain:I.VITE_FIREBASE_AUTH_DOMAIN,databaseURL:I.VITE_FIREBASE_DATABASE_URL,projectId:I.VITE_FIREBASE_PROJECT_ID,storageBucket:I.VITE_FIREBASE_STORAGE_BUCKET,messagingSenderId:I.VITE_FIREBASE_MESSAGING_SENDER_ID,appId:I.VITE_FIREBASE_APP_ID,measurementId:I.VITE_FIREBASE_MEASUREMENT_ID};function oe(a){if(!a)return!1;try{const e=new URL(a);return e.protocol==="https:"&&(e.hostname.endsWith(".firebaseio.com")||e.hostname.endsWith(".firebasedatabase.app"))}catch{return!1}}let J,B=!1;const ee=new Set;function le(){return J||(J=Promise.all([ve(()=>import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"),[],import.meta.url),ve(()=>import("https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"),[],import.meta.url)]).then(([a,e])=>{const t=a.initializeApp(D);return{database:e.getDatabase(t),...e}}).catch(a=>{throw J=void 0,a})),J}class Be{async getVisitorCount(){throw new Error("getVisitorCount() must be implemented by concrete provider")}}class Ne extends Be{constructor(e="agomoni26"){super(),this.gameId=e}async incrementVisitorCount(){if(!D.databaseURL)return B||(console.error("Firebase visitor counter is disabled: configure VITE_FIREBASE_DATABASE_URL in the deployment environment."),B=!0),"000000";if(!oe(D.databaseURL))return B||(console.error("Firebase visitor counter is disabled: VITE_FIREBASE_DATABASE_URL must be a valid Firebase Realtime Database URL."),B=!0),"000000";try{const{database:e,ref:t,runTransaction:o}=await le(),i=t(e,`games/${this.gameId}/visitor_count`),s=await o(i,r=>typeof r=="number"&&Number.isFinite(r)?r+1:1);if(!s.committed)throw new Error("Firebase visitor counter transaction was not committed.");return String(s.snapshot.val()).padStart(6,"0")}catch(e){return console.error("Firebase visitor counter error:",e),"000000"}}recordStageLoad(){const e=this.incrementVisitorCount();return ee.add(e),e.finally(()=>ee.delete(e)),e}async getVisitorCount(){if(await Promise.all(ee),!D.databaseURL||!oe(D.databaseURL))return"000000";try{const{database:e,ref:t,get:o}=await le(),s=(await o(t(e,`games/${this.gameId}/visitor_count`))).val();return String(typeof s=="number"&&Number.isFinite(s)?s:0).padStart(6,"0")}catch(e){return console.error("Firebase visitor counter error:",e),"000000"}}async subscribeVisitorCount(e,t=()=>{}){if(!D.databaseURL)return B||(console.error("Firebase visitor counter is disabled: configure VITE_FIREBASE_DATABASE_URL in the deployment environment."),B=!0),e("000000"),()=>{};if(!oe(D.databaseURL))return B||(console.error("Firebase visitor counter is disabled: VITE_FIREBASE_DATABASE_URL must be a valid Firebase Realtime Database URL."),B=!0),e("000000"),()=>{};await Promise.all(ee);const{database:o,ref:i,onValue:s}=await le();return s(i(o,`games/${this.gameId}/visitor_count`),r=>{const n=r.val();e(String(typeof n=="number"&&Number.isFinite(n)?n:0).padStart(6,"0"))},r=>{console.error("Firebase visitor counter subscription error:",r),t(r)})}}const Ce=new Ne("agomoni26");function De(){const a=document.createElement("div");return a.className="visitor-counter",a.id="visitor-counter",a.textContent="দর্শনার্থী: 000000",Ce.subscribeVisitorCount(e=>{a.textContent=`দর্শনার্থী: ${e}`},()=>{a.textContent="দর্শনার্থী: 000000"}).catch(e=>{console.error("Unable to subscribe to visitor counter updates:",e),a.textContent="দর্শনার্থী: 000000"}),a}function Ve(){const a=document.createElement("footer");a.className="theatre-footer";const e=document.createElement("div");e.className="footer-credit",e.innerHTML='<span class="footer-credit-line"><span class="footer-credit-title">Agomoni</span><span class="footer-credit-byline">by</span><a href="https://www.facebook.com/ssavi.cou" target="_blank" rel="noopener noreferrer">Avik Sarkar</a></span>';const t=De();return a.appendChild(e),a.appendChild(t),a}function $e({onStart:a}={}){if(document.getElementById("intro-overlay"))return;const e=document.createElement("div");e.id="intro-overlay",e.className="intro-overlay",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-labelledby","intro-title"),e.setAttribute("aria-describedby","intro-desc"),e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("intro-open");const t=e.querySelector("#intro-start-btn");t.focus(),e.addEventListener("keydown",o=>{o.key==="Tab"&&(o.preventDefault(),t.focus())}),t.addEventListener("click",()=>{e.classList.contains("closing")||(e.classList.add("closing"),document.body.classList.remove("intro-open"),typeof a=="function"&&a(),setTimeout(()=>e.remove(),450))})}const M=88,O=108,ne=95.6,se=96.6,He=(ne+se)/2,qe=700,we=.1,te=a=>a>=ne&&a<=se,Pe=a=>a<ne?ne-a:a>se?a-se:0;function Fe(){const a=document.createElement("div");a.className="stage-container";const e=document.createElement("div");e.className="stage-header-block",e.innerHTML=`
    <h3 class="stage-title">পিতৃপক্ষের অবসান ... দেবীপক্ষের সূচনা</h3>
    <br/>
    <p class="stage-instruction">রেডিওর কাঁটা ৯৬ মেগাহার্টজের কাছাকাছি ... মহালয়ার পুণ্য লগ্নে বীরেন্দ্রকৃষ্ণ ভদ্রের গলায় ... মহিষাসুরমর্দ্দিনী</p>
  `;const t=document.createElement("div");t.className="mahalaya-room",t.id="mahalaya-room";const o=document.createElement("div");o.className="window-scenery",o.innerHTML=`
    <div class="window-bars">
      <div class="window-bar"></div>
      <div class="window-bar"></div>
      <div class="window-bar"></div>
    </div>
  `,t.appendChild(o);const i=document.createElement("div");i.className="room-item diya-wrapper",i.id="mahalaya-diya",i.setAttribute("aria-hidden","true"),i.innerHTML=`
    <div class="diya-flame"></div>
    ${x.diya}
    <span style="font-size: 0.75rem; color: var(--color-gold);">মাটির প্রদীপ</span>
  `;const s=document.createElement("div");s.className="room-item radio-wrapper radio-tuner",s.id="mahalaya-radio",s.innerHTML=`
    ${x.radio}
    <div class="tuner">
      <div class="tuner-readout">
        <span class="tuner-freq" id="tuner-freq">--</span>
        <span class="tuner-unit">MHz</span>
      </div>
      <div class="tuner-dial" id="tuner-dial"
           role="slider" tabindex="0"
           aria-label="Radio frequency"
           aria-valuemin="${M}" aria-valuemax="${O}"
           aria-valuenow="${M}">
        <div class="tuner-ticks"></div>
        <div class="tuner-needle" id="tuner-needle"><div class="tuner-knob"></div></div>
      </div>
      <div class="tuner-scale">
        <span>${M}</span><span>${(M+O)/2}</span><span>${O}</span>
      </div>
      <p class="tuner-hint" id="tuner-hint">শুধু ঘ্যাঁ-ঘ্যাঁ শব্দ... কাঁটাটি টেনে দেখুন</p>
    </div>
  `,t.appendChild(s);const r=document.createElement("div");r.id="stage1-action-area",a.appendChild(e),a.appendChild(t),a.appendChild(r);const n=s.querySelector("#tuner-dial"),l=s.querySelector("#tuner-needle"),h=s.querySelector("#tuner-freq"),p=s.querySelector("#tuner-hint"),u=s.querySelector(".tuner-ticks");for(let v=0;v<=20;v++){const d=document.createElement("i");d.className=v%5===0?"tick tick-major":"tick",u.appendChild(d)}let c=!1,y=M+Math.random()*3,f=null,k=!1,b=null,S=null;function R(){if(!b)try{const v=window.AudioContext||window.webkitAudioContext;if(!v)return;b=new v;const d=b.createBuffer(1,b.sampleRate*2,b.sampleRate),m=d.getChannelData(0);for(let w=0;w<m.length;w++)m[w]=Math.random()*2-1;const g=b.createBufferSource();g.buffer=d,g.loop=!0,S=b.createGain(),S.gain.value=0,g.connect(S).connect(b.destination),g.start()}catch{b=null}}function L(){if(b)try{S.gain.setTargetAtTime(0,b.currentTime,.1);const v=b;b=null,setTimeout(()=>v.close(),400)}catch{}}function Q(v){return Math.max(0,1-Pe(v)/6)}function V(){const v=(y-M)/(O-M)*100;l.style.left=v+"%",h.textContent=y.toFixed(1),n.setAttribute("aria-valuenow",y.toFixed(1));const d=Q(y);t.style.setProperty("--tune-glow",d.toFixed(2)),S&&b&&S.gain.setTargetAtTime(.12*(1-d*d),b.currentTime,.05),d>.93?p.textContent="প্রায় পেয়ে গেছেন... স্থির থাকুন":d>.6?p.textContent="দূর থেকে সুর ভেসে আসছে...":d>.3?p.textContent="ক্ষীণ একটা কণ্ঠস্বর... আরও কাছে":p.textContent="শুধু ঘ্যাঁ-ঘ্যাঁ শব্দ... কাঁটাটি টেনে দেখুন"}function ie(){c||(te(y)&&!f?f=setTimeout(()=>{f=null,te(y)&&j()},qe):!te(y)&&f&&(clearTimeout(f),f=null))}function $(v){y=Math.round(Math.min(O,Math.max(M,v))*10)/10,V(),ie()}function W(v){const d=n.getBoundingClientRect(),m=(v.clientX-d.left)/d.width;return M+Math.min(1,Math.max(0,m))*(O-M)}function j(v=!1){if(c)return;c=!0,clearTimeout(f),L(),te(y)||(y=He),V(),n.setAttribute("aria-disabled","true"),p.textContent="মহালয়া বাজছে...",t.classList.add("illuminated"),s.classList.add("tuned");const d=document.createElement("div");d.className="radio-soundwaves",d.innerHTML=`
      <div class="soundwave-bar"></div>
      <div class="soundwave-bar"></div>
      <div class="soundwave-bar"></div>
      <div class="soundwave-bar"></div>
    `,s.appendChild(d),T.playMahalaya(),C.completeStage(1),setTimeout(()=>{r.innerHTML=`
      <div class="stage-banner">
        <p class="stage-banner-sub">কৈলাস থেকে মর্ত্যে মায়ের আগমন যাত্রায় আপনাকে স্বাগতম</p>
        <p class="stage-banner-sub">আশা করছি শেষ পর্যন্ত উপভোগ করবেন</p>
        <button class="btn-continue" id="stage1-continue-btn">
          ${x.arrowRight}
        </button>
      </div>
    `,r.querySelector("#stage1-continue-btn").addEventListener("click",()=>{C.nextStage()})},v?0:2e3)}n.addEventListener("pointerdown",v=>{c||(k=!0,n.setPointerCapture(v.pointerId),R(),b&&b.state==="suspended"&&b.resume(),$(W(v)))}),n.addEventListener("pointermove",v=>{!k||c||$(W(v))});const U=v=>{k=!1,n.hasPointerCapture(v.pointerId)&&n.releasePointerCapture(v.pointerId)};n.addEventListener("pointerup",U),n.addEventListener("pointercancel",U),n.addEventListener("keydown",v=>{if(c)return;let d=0;if(v.key==="ArrowRight"||v.key==="ArrowUp")d=we;else if(v.key==="ArrowLeft"||v.key==="ArrowDown")d=-we;else if(v.key==="PageUp")d=1;else if(v.key==="PageDown")d=-1;else return;v.preventDefault(),R(),$(y+d)});const Z=new MutationObserver(()=>{document.body.contains(a)||(L(),clearTimeout(f),Z.disconnect())});Z.observe(document.body,{childList:!0,subtree:!0}),V();const{completedStages:z}=C.getState();return z.includes(1)&&setTimeout(()=>j(!0),100),a}const Oe={},ce="./",ae=ce.endsWith("/")?ce:ce+"/",Ge=[{id:"palanquin",name:"Palanquin",bengali:"পালকি",image:`${ae}assets/images/palanquin.png`},{id:"horse",name:"Horse",bengali:"ঘোড়া",image:`${ae}assets/images/horse.png`,isCorrect:!0},{id:"elephant",name:"Elephant",bengali:"হাতি",image:`${ae}assets/images/elephant.png`},{id:"boat",name:"Boat",bengali:"নৌকা",image:`${ae}assets/images/boat.png`}];function je(){const a=document.createElement("div");a.className="stage-container";const e=document.createElement("div");e.className="stage-header-block",e.innerHTML=`
    <h3 class="stage-title">১৪৩২ বঙ্গাব্দ</h3>
    <br/>
    <p class="stage-instruction">মায়ের মর্ত্যগামী বাহন প্রস্তুত ... <u>লাগাম টা টেনে ধরলেই</u> চলতে শুরু করবে</p>
  `;const t=document.createElement("div");t.className="transport-grid";const o=document.createElement("div");o.className="feedback-msg",o.id="transport-feedback";const i=document.createElement("div");i.id="stage2-action-area",a.appendChild(e),a.appendChild(t),a.appendChild(o),a.appendChild(i);let s=!1;Ge.forEach(n=>{const l=document.createElement("button");l.className="transport-card",l.id=`transport-${n.id}`,l.setAttribute("role","button"),l.setAttribute("aria-label",`Select ${n.name} (${n.bengali})`),l.innerHTML=`
      <img src="${n.image}" alt="${n.name}" class="transport-img" />
      <span class="transport-name">${n.name}</span>
      <span class="transport-bengali">${n.bengali}</span>
    `,l.addEventListener("click",()=>{if(!s)if(n.isCorrect){s=!0,l.classList.add("selected-correct"),o.textContent="ঘোড়সওয়ার মা ধাবমান আলোর মতো এগিয়ে আসছেন...";const h=l.querySelector(".transport-img");h&&(h.style.transition="transform 0.8s ease-in-out",h.style.transform="translateX(14px) scale(1.12)"),C.completeStage(2),setTimeout(()=>{i.innerHTML=`
            <div class="stage-banner">
              <p class="stage-banner-text">ছত্র ভঙ্গ স্তুরঙ্গমে</p>
              <p class="stage-banner-sub">অশ্বারোহী মা ... আপনাকে সামনের দিনগুলোতে নিজ এবং প্রিয়জনদের প্রতি যত্নশীল হবার পরামর্শ দিচ্ছেন</p>
              <button class="btn-continue" id="stage2-continue-btn">
                ${x.arrowRight}
              </button>
            </div>
          `,i.querySelector("#stage2-continue-btn").addEventListener("click",()=>{C.nextStage()})},2e3)}else l.classList.add("selected-wrong"),o.textContent=`${n.bengali} শান্ত... তবে এবার মা আসছেন দ্রুত অশ্বে।`,setTimeout(()=>{l.classList.remove("selected-wrong")},1500)}),t.appendChild(l)});const{completedStages:r}=C.getState();return r.includes(2)&&setTimeout(()=>{const n=t.querySelector("#transport-horse");n&&n.click()},100),a}const Ue={},de="./",K=de.endsWith("/")?de:de+"/",G=[{id:"ganesha",name:"Lord Ganesha",bengali:"গণেশ",image:`${K}assets/images/ganesha.png`},{id:"lakshmi",name:"Ma Lokkhi",bengali:"লক্ষ্মী",image:`${K}assets/images/lakshmi.png`},{id:"durga",name:"Ma Durga",bengali:"দুর্গা",image:`${K}assets/images/durga.png`},{id:"saraswati",name:"Ma Saraswati",bengali:"সরস্বতী",image:`${K}assets/images/saraswati.png`},{id:"kartikeya",name:"Lord Kartikey",bengali:"কার্তিক",image:`${K}assets/images/kartikeya.png`}],be=["ganesha","lakshmi","durga","saraswati","kartikeya"];function Ze(){const a=document.createElement("div");a.className="stage-container";const e=document.createElement("div");e.className="stage-header-block",e.innerHTML=`
    <h3 class="stage-title">মা মানেই পরিবার</h3>
    <br/>
    <p class="stage-instruction">আর পরিবার মানেই তো সেই চিরচেনা মুখগুলো ... সবাইকে তাদের স্ব স্ব স্থানে রাখতে হবে তো!</p>
  `;const t=document.createElement("div");t.className="deities-container";const o=document.createElement("div");o.className="deities-track";const i=document.createElement("p");i.className="reorder-hint",i.textContent="প্রতিমা স্পর্শ বা ক্লিক করে স্থান অদলবদল (swap) করুন";const s=document.createElement("div");s.id="stage3-action-area",t.appendChild(o),t.appendChild(i),a.appendChild(e),a.appendChild(t),a.appendChild(s);let r=[G[1],G[4],G[2],G[0],G[3]],n=null,l=!1;function h(){r.every((y,f)=>y.id===be[f])&&!l&&(l=!0,n=null,p(),C.completeStage(3),setTimeout(()=>{s.innerHTML=`
          <div class="stage-banner">
            <p class="stage-banner-text">সাধু... সাধু ...</p>
            <p class="stage-banner-sub">অসাধারণ করছেন ... এরপর যে দেবতাদের আশীর্বাদ প্রয়োজন হবে</p>
            <button class="btn-continue" id="stage3-continue-btn">
              ${x.arrowRight}
          </button>
        </div>
      `,s.querySelector("#stage3-continue-btn").addEventListener("click",()=>{C.nextStage()})},2e3))}function p(){o.innerHTML="",r.forEach((c,y)=>{const f=document.createElement("div");f.className=`deity-slot ${n===y?"selected":""} ${l?"locked":""}`,f.setAttribute("role","button"),f.setAttribute("tabindex","0"),f.setAttribute("aria-label",`${c.name} (${c.bengali}) at position ${y+1}`),f.innerHTML=`
        <span class="deity-order-badge">${y+1}</span>
        <img src="${c.image}" alt="${c.name}" class="deity-img" />
        <span class="deity-name">${c.bengali}</span>
      `,l||(f.addEventListener("click",()=>{if(n===null)n=y;else if(n===y)n=null;else{const k=r[n];r[n]=r[y],r[y]=k,n=null}p(),h()}),f.addEventListener("keydown",k=>{(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),f.click())})),o.appendChild(f)})}const{completedStages:u}=C.getState();return u.includes(3)?(r=be.map(c=>G.find(y=>y.id===c)),setTimeout(()=>{h()},100)):p(),a}function Ke(){const a=document.createElement("div");a.className="stage-container stage4-container";const e=["CHAKRA","TRIDENT","SWORD","THUNDERBOLT","LOTUS"],t=["CONCH","SPEAR","BOW","SNAKE","AXE"],o=Object.freeze([...e,...t]),i=Object.freeze({CHAKRA:"চক্র",TRIDENT:"ত্রিশূল",SWORD:"তরবারি",THUNDERBOLT:"বজ্র",LOTUS:"পদ্ম",CONCH:"শঙ্খ",SPEAR:"বর্শা",BOW:"ধনুক",SNAKE:"সাপ",AXE:"কুড়াল"}),s=d=>i[d]??d,r=document.createElement("div");r.className="stage-header-block",r.innerHTML=`
    <h3 class="stage-title">দশপ্রহরণধারিণী</h3>
    <p id="stage4-status" class="stage-instruction" aria-live="polite">❓চিহ্নিত হাত দুটোতে কোন অস্ত্র দুটো দিই বলুন তো ... 🤔 আপনিই বরং ওই নিচে রাখা অস্ত্র গুলো থেকে পড়িয়ে দিন</p>
  `;const n=document.createElement("div");n.id="arena",n.innerHTML='<div id="hub">ॐ</div>';const l=document.createElement("div");l.id="tray",l.setAttribute("aria-label","Weapon chips");const h=document.createElement("div");h.className="bar",h.innerHTML=`
    <span>তেমন কিছু না ... <b id="stage4-misses">0</b> বার চেষ্টা করা যেতেই পারে!</span>
    <!--<button id="stage4-again" type="button">New attempt</button>-->
  `;const p=document.createElement("div");p.id="stage4-action-area",a.appendChild(r),a.appendChild(n),a.appendChild(l),a.appendChild(h),a.appendChild(p);const u=r.querySelector("#stage4-status"),c=h.querySelector("#stage4-misses"),y=n.querySelector("#hub");let f=[],k=new Set,b=new Set,S=0,R=!1,L=null;function Q(d){const m=d.slice();for(let g=m.length-1;g>0;g--){const w=Math.floor(Math.random()*(g+1));[m[g],m[w]]=[m[w],m[g]]}return m}function V(){f.forEach((d,m)=>{const g=m<5?0:1,_=(m%5-2)/2,A=.085*_*_,H=g===0?.2+A:.8-A,re=.5+_*.37;d.style.left=H*100+"%",d.style.top=re*100+"%"})}function ie(){R=!1,b=new Set,S=0,L=null,c.textContent="0",y.classList.remove("done"),l.classList.remove("done"),p.innerHTML="";const d=Q([...Array(10).keys()]);k=new Set(d.slice(0,2)),n.querySelectorAll(".slot").forEach(m=>m.remove()),f=o.map((m,g)=>{const w=document.createElement("div");return w.className="slot "+(k.has(g)?"missing":"sealed"),w.dataset.i=g,w.style.setProperty("--i",g),w.setAttribute("aria-label",k.has(g)?"Missing weapon position":"Sealed weapon position"),w.innerHTML='<span class="label"></span>',k.has(g)&&w.insertAdjacentText("afterbegin","?"),w.addEventListener("click",()=>{L&&U(L,w)}),n.appendChild(w),w}),V(),l.innerHTML="",Q(o).forEach(m=>{const g=document.createElement("div");g.className="chip",g.textContent=s(m),g.dataset.w=m,g.setAttribute("role","button"),g.setAttribute("tabindex","0"),g.addEventListener("pointerdown",w=>W(g,w)),g.addEventListener("contextmenu",w=>w.preventDefault()),g.addEventListener("keydown",w=>{(w.key==="Enter"||w.key===" ")&&(w.preventDefault(),$(g))}),l.appendChild(g)}),u.innerHTML="❓চিহ্নিত হাত দুটোতে কোন অস্ত্র দুটো দিই বলুন তো 🤔<br/>আপনিই বরং ওই নিচে রাখা অস্ত্র গুলো থেকে পড়িয়ে দিন"}function $(d){if(R||d.classList.contains("used"))return;const m=d.classList.contains("selected");l.querySelectorAll(".chip.selected").forEach(g=>g.classList.remove("selected")),L=m?null:d,L&&d.classList.add("selected")}function W(d,m){if(R||d.classList.contains("used")||m.pointerType==="mouse"&&m.button!==0)return;m.preventDefault();const g=m.pointerId,w=m.pointerType!=="mouse",_=w?10:6,A=w?56:0,H=m.clientX,re=m.clientY;let Y=!1,N=null,q=null;try{d.setPointerCapture(g)}catch{}function pe(E){if(E.pointerId!==g||(!Y&&Math.hypot(E.clientX-H,E.clientY-re)>_&&(Y=!0,N=d.cloneNode(!0),N.classList.add("ghost"),document.body.appendChild(N),d.classList.add("dragging")),!Y))return;const P=E.clientX,me=E.clientY-A;N.style.left=P+"px",N.style.top=me+"px";const F=j(P,me);q&&q!==F&&q.classList.remove("over"),q=F,F&&F.classList.contains("missing")&&!F.classList.contains("filled")&&F.classList.add("over")}function X(E){if(E.pointerId===g){window.removeEventListener("pointermove",pe),window.removeEventListener("pointerup",X),window.removeEventListener("pointercancel",X);try{d.releasePointerCapture(g)}catch{}if(q&&q.classList.remove("over"),d.classList.remove("dragging"),N&&N.remove(),E.type!=="pointercancel")if(Y){const P=j(E.clientX,E.clientY-A);P&&U(d,P)}else $(d)}}window.addEventListener("pointermove",pe),window.addEventListener("pointerup",X),window.addEventListener("pointercancel",X)}function j(d,m){let g=null,w=1/0;for(const _ of f){const A=_.getBoundingClientRect(),H=Math.hypot(d-(A.left+A.width/2),m-(A.top+A.height/2));H<w&&(g=_,w=H)}return g&&w<=g.getBoundingClientRect().width*.75?g:null}function U(d,m){if(R)return;const g=+m.dataset.i,w=d.dataset.w;if(!k.has(g)||b.has(g)||o[g]!==w)return Z(m);b.add(g),m.classList.add("filled"),m.classList.remove("over"),m.firstChild&&m.firstChild.nodeType===3&&m.removeChild(m.firstChild),m.querySelector(".label").textContent=s(w),d.classList.remove("selected"),d.classList.add("used"),L=null,b.size===k.size?z():u.textContent="দারুন! আর একটা মাত্র বাকি ..."}function Z(d){S++,c.textContent=S,d.classList.remove("shake"),d.offsetWidth,d.classList.add("shake"),setTimeout(()=>d.classList.remove("shake"),450),u.textContent="ওহ! এটা তো ঠিক হল না ... আবার চেষ্টা করুন"}function z(){R=!0,L=null,l.querySelectorAll(".chip.selected").forEach(d=>d.classList.remove("selected")),f.forEach((d,m)=>{d.querySelector(".label").textContent=s(o[m]),d.classList.remove("missing","sealed"),d.classList.add("revealed")}),y.classList.add("done"),l.classList.add("done");for(let d=0;d<3;d++)setTimeout(()=>{const m=document.createElement("div");m.className="ring",n.appendChild(m),setTimeout(()=>m.remove(),2300)},d*450);u.textContent="মা দশভুজার অলৌকিক আভা দশদিকে প্রকাশিত ... জয় মা দূর্গা",C.completeStage(4),setTimeout(()=>{p.innerHTML=`
        <div class="stage-banner">
          <p class="stage-banner-sub">ঢাকে কাঠি পড়লো বলে ... আগমনী আর বেশি দূরে নয়</p>
          <button class="btn-continue" id="stage4-continue-btn">
            ${x.arrowRight}
          </button>
        </div>
      `,p.querySelector("#stage4-continue-btn").addEventListener("click",()=>{C.nextStage()})},2e3)}window.addEventListener("resize",V),ie();const{completedStages:v}=C.getState();return v.includes(4)&&z(),a}const Qe={},ue="./",We=ue.endsWith("/")?ue:ue+"/",ze={diya:"pradip.png",dhak:"dhak.png",conch:"shankha.png"};function he(a){const e=encodeURIComponent(x[a]);return`<img class="puja-item-img" src="${We}assets/images/${ze[a]}"
               alt="" draggable="false" decoding="async"
               onerror="this.outerHTML=decodeURIComponent('${e}')">`}function Ye(a,e,t){const o=["০","১","২","৩","৪","৫","৬","৭","৮","৯"],i=c=>String(c).replace(/\d/g,y=>o[y]),s=e.querySelector(".stage5-completion-banner"),r=document.createElement("div");r.className="stage5-countdown-overlay",r.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="stage5-countdown-number",r.appendChild(n),t.appendChild(r);let l=a,h=null;const p=()=>{n.textContent=i(l),n.classList.remove("tick"),n.offsetWidth,n.classList.add("tick")},u=()=>{clearInterval(h),r.remove()};return p(),h=setInterval(()=>{if(s&&!document.body.contains(s)){u();return}l>1?(l-=1,p()):clearInterval(h)},1e3),u}function Xe(){const a=document.createElement("div");a.className="stage-container";const e=document.createElement("div");e.className="stage-header-block",e.innerHTML=`
    <h3 class="stage-title">আবাহন</h3>
    <br/>
    <p class="stage-instruction">শুরুটা আলোয়, তারপর ধ্বনি আর শেষে ঢ্যাং কুড়াকুড় ... </p>
  `;const t=document.createElement("div");t.className="puja-altar";const o=document.createElement("div");o.className="puja-item-card",o.id="puja-diya",o.setAttribute("role","button"),o.setAttribute("tabindex","0"),o.setAttribute("aria-label","Light the Sacred Diya"),o.innerHTML=`
    <div style="position: relative;">
      <div class="diya-flame" style="opacity: 0; transition: opacity 0.4s ease;" id="chaturthi-flame"></div>
      ${he("diya")}
    </div>
    <span class="puja-item-title">Diya</span>
    <span class="puja-item-bengali">মঙ্গল প্রদীপ</span>
  `;const i=document.createElement("div");i.className="puja-item-card",i.id="puja-dhak",i.setAttribute("role","button"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label","Sound the Festive Dhak"),i.innerHTML=`
    <div id="dhak-graphic-container">
      ${he("dhak")}
    </div>
    <span class="puja-item-title">Dhak</span>
    <span class="puja-item-bengali">ঢাক</span>
  `;const s=document.createElement("div");s.className="puja-item-card",s.id="puja-conch",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label","Blow the Sacred Conch (Shankha)"),s.innerHTML=`
    <div id="conch-graphic-container">
      ${he("conch")}
    </div>
    <span class="puja-item-title">Conch</span>
    <span class="puja-item-bengali">মঙ্গল শঙ্খ</span>
  `,[o,s,i].forEach(c=>{c.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),c.click())})}),t.appendChild(s),t.appendChild(o),t.appendChild(i);const r=document.createElement("div");r.className="feedback-msg",r.id="chaturthi-feedback";const n=document.createElement("div");n.id="stage5-action-area",a.appendChild(e),a.appendChild(t),a.appendChild(r),a.appendChild(n);let l=0,h=!1;function p(){h||(h=!0,r.textContent="মণ্ডপ আনন্দ ও ভক্তিতে ভরে উঠেছে...",t.style.boxShadow="var(--shadow-glow)",C.completeStage(5),setTimeout(()=>{n.innerHTML=`
        <div class="stage-banner stage5-completion-banner">
          <div class="stage5-durga-wrapper">
            <div class="stage5-durga-aura"></div>
            ${x.maaDurgaReveal}
          </div>
          <p class="stage-banner-text">জাগো দূর্গা</p>
          <p class="stage-banner-sub">অভয়া শক্তি বলপ্রদায়িনী তুমি জাগো...</p>
          <!-- <button class="btn-continue" id="stage5-continue-btn">
            ${x.arrowRight}
          </button> -->
          <p class="stage5-bodhon-note">আরে ... চললেন কোথায়? মায়ের বোধন টা যে এখনো বাকি ...</p>
        </div>
      `;const c=Ye(10,n,a);setTimeout(()=>{c(),T.stopAll(),C.nextStage()},1e4)},2e3))}o.addEventListener("click",()=>{if(h)return;const c=o.querySelector("#chaturthi-flame");c&&(c.style.opacity="1"),o.classList.add("activated"),l===0?(l=1,r.textContent="প্রদীপের আলোয় বেদী আলোকিত হলো...",T.fadeTo("mahalaya",.2,2e3),T.playDiya()):r.textContent="প্রদীপ প্রজ্বলিত।"}),s.addEventListener("click",()=>{if(h)return;s.classList.add("activated");const c=s.querySelector("#conch-graphic-container");c&&(c.style.transform="scale(1.15)",setTimeout(()=>{c.style.transform="scale(1)"},600)),l===1?(l=2,r.textContent="শঙ্খধ্বনিতে দেবীর আবাহন ধ্বনিত হলো...",T.fadeOut("mahalaya",2e3),T.playConch()):l===0?r.textContent="প্রথমে মণ্ডপে মঙ্গলপ্রদীপ প্রজ্জ্বলন করুন...":l===2&&(r.textContent="শঙ্খ ধ্বনিত হয়েছে, এবার ঢাকের মঙ্গলবাদন হোক...")}),i.addEventListener("click",()=>{if(h)return;i.classList.add("activated");const c=i.querySelector("#dhak-graphic-container");c&&(c.style.transform="scale(1.1) rotate(4deg)",setTimeout(()=>{c.style.transform="scale(1) rotate(0deg)"},400)),l===2?(r.textContent="ঢাকের বোলে বাতাসে আগমনীর শিহরণ...",T.playDhak(),p()):l===0?r.textContent="পূজার সূচনায় প্রথমে মঙ্গলদীপের পবিত্র আলো প্রয়োজন...":l===1&&(r.textContent="ঢাকের পূর্বে মঙ্গল শঙ্খধ্বনি হোক...")});const{completedStages:u}=C.getState();if(u.includes(5)){const c=o.querySelector("#chaturthi-flame");c&&(c.style.opacity="1"),o.classList.add("activated"),i.classList.add("activated"),s.classList.add("activated"),setTimeout(()=>{p()},100)}return a}const Je={},fe="./",ke=fe.endsWith("/")?fe:fe+"/";function et(){T.stopAll();const a=document.createElement("div");a.className="stage-container";const e=document.createElement("div");e.className="stage-header-block",e.innerHTML=`
    <h2 class="stage-title">উমার বোধন</h2>
  `;const t=document.createElement("div");t.className="bodhan-theatre",t.id="bodhan-theatre";const o=document.createElement("div");o.className="durga-artwork-container";const i=document.createElement("div");i.className="durga-aura";const s=document.createElement("div");s.className="durga-photo-frame",s.innerHTML=`
    <img src="${ke}assets/images/durga_final.png" alt="Maa Durga" class="bodhan-durga-photo" />
  `,o.appendChild(i),o.appendChild(s),t.appendChild(o);const r=document.createElement("div");r.id="bodhan-message-area",a.appendChild(e),a.appendChild(t),a.appendChild(r);let n=null;function l(u){h();const c=document.createElement("div");c.className="shiuli-layer",c.id="shiuli-layer",u.appendChild(c);const y=()=>{if(!c.isConnected)return h();if(c.childElementCount>40)return;const f=document.createElement("div");f.className="shiuli-flower",f.innerHTML=`<img src="${ke}assets/images/shiuli.png" width="100" height="100" alt="" decoding="async">`,f.style.left=`${40+Math.random()*60}%`,f.style.fontSize=`${14+Math.random()*14}px`,f.style.setProperty("--fall-distance",`${c.clientHeight+80}px`),f.style.setProperty("--fall-duration",`${6+Math.random()*4}s`),f.style.setProperty("--sway-mid",`${-20-Math.random()*50}px`),f.style.setProperty("--sway-end",`${-60-Math.random()*100}px`),f.style.setProperty("--rot-mid",`${60+Math.random()*120}deg`),f.style.setProperty("--rot-end",`${180+Math.random()*180}deg`),c.appendChild(f),f.addEventListener("animationend",()=>f.remove())};y(),n=setInterval(y,450)}function h(){var u;clearInterval(n),n=null,(u=document.getElementById("shiuli-layer"))==null||u.remove()}function p(){C.completeStage(6);const u=s.querySelector(".bodhan-durga-photo");u&&(u.style.opacity="0",u.style.filter="blur(10px) brightness(0.4)",u.style.transition="opacity 2s ease, filter 2.5s ease, transform 2.5s cubic-bezier(0.2, 0.8, 0.2, 1)",u.style.transform="scale(0.92)"),setTimeout(()=>{T.playDhakReveal(),i.classList.add("visible"),l(a)},800),setTimeout(()=>{u&&(u.style.opacity="0.5",u.style.filter="blur(4px) brightness(0.7)")},1600),setTimeout(()=>{u&&(u.style.opacity="1",u.style.filter="blur(0px) brightness(1.05)",u.style.transform="scale(1)"),s.classList.add("revealed")},3e3),setTimeout(()=>{r.innerHTML=`
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
      `;const c=r.querySelector("#btn-journey-restart");c&&c.addEventListener("click",()=>{h(),T.stopAll(),C.resetGame()})},7e3)}return setTimeout(()=>{p()},200),a}function tt(){const a=document.createElement("div");a.className="app-container";const e=document.createElement("main");e.className="theatre-window";const t=Me();e.appendChild(t);const o=document.createElement("section");o.className="theatre-stage-area",o.id="stage-viewport",e.appendChild(o);const i=Ve();a.appendChild(e),a.appendChild(i);let s=null,r=null;function n(u){u&&(Ce.recordStageLoad(),u.style.animation="fadeIn 0.4s ease forwards",o.appendChild(u))}function l(){$e({onStart:()=>{s===1&&(o.innerHTML="",n(Fe()))}})}function h(u,c=0){if(!(s===u&&r===c))switch(s=u,r=c,o.innerHTML="",u){case 2:n(je());break;case 3:n(Ze());break;case 4:n(Ke());break;case 5:n(Xe());break;case 6:n(et());break;case 1:default:l()}}function p(u){document.documentElement.setAttribute("data-theme",u.theme),h(u.currentStage,u.restartCount||0)}return C.subscribe(p),p(C.getState()),a}document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("app");a&&a.appendChild(tt())});
