import{initializeApp as pe}from"https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";import{getDatabase as fe,ref as me,runTransaction as ge,get as ye}from"https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const ce="agomoni-game-state";class we{constructor(){this.listeners=new Set,this.state=this.loadInitialState()}loadInitialState(){const e=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,a={currentStage:1,completedStages:[],theme:e?"dark":"light",muted:!1};try{const i=localStorage.getItem(ce);if(i){const n=JSON.parse(i);return{...a,...n,currentStage:Math.max(1,Math.min(6,n.currentStage||1)),completedStages:Array.isArray(n.completedStages)?n.completedStages:[]}}}catch(i){console.warn("LocalStorage unavailable or corrupt. Using default state.",i)}return a}saveState(){try{localStorage.setItem(ce,JSON.stringify(this.state))}catch(e){console.warn("Failed to save game state to localStorage:",e)}}getState(){return{...this.state}}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){const e=this.getState();this.listeners.forEach(a=>{try{a(e)}catch(i){console.error("Error in state listener:",i)}})}setStage(e){e<1||e>6||(this.state.currentStage=e,this.saveState(),this.notify())}completeStage(e){this.state.completedStages.includes(e)||(this.state.completedStages=[...this.state.completedStages,e]),this.saveState(),this.notify()}nextStage(){this.state.currentStage<6&&(this.state.currentStage+=1,this.saveState(),this.notify())}setTheme(e){this.state.theme=e,this.saveState(),this.notify()}toggleTheme(){const e=this.state.theme==="dark"?"light":"dark";this.setTheme(e)}setMuted(e){this.state.muted=!!e,this.saveState(),this.notify()}toggleMuted(){this.setMuted(!this.state.muted)}resetGame(){this.state.currentStage=1,this.state.completedStages=[],this.state.restartCount=(this.state.restartCount||0)+1,this.saveState(),this.notify()}}const k=new we,L={sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',volumeOn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>',volumeMuted:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>',arrowRight:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',diya:`
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
  `};function ve(){const t=document.createElement("button");t.className="icon-btn",t.id="theme-toggle-btn",t.setAttribute("aria-label","Toggle night mode");function e(){const{theme:a}=k.getState();t.innerHTML=a==="dark"?L.sun:L.moon,t.title=a==="dark"?"Switch to Light Mode":"Switch to Night Mode"}return t.addEventListener("click",()=>{k.toggleTheme()}),k.subscribe(e),e(),t}function be(){const t=document.createElement("button");t.className="icon-btn",t.id="audio-toggle-btn",t.setAttribute("aria-label","Toggle audio mute");function e(){const{muted:a}=k.getState();t.innerHTML=a?L.volumeMuted:L.volumeOn,t.title=a?"Unmute Audio":"Mute Audio"}return t.addEventListener("click",()=>{k.toggleMuted()}),k.subscribe(e),e(),t}const ke={};class Ce{constructor(){this.audioContext=null,this.currentAudios=new Set,this.basePath="./",this.basePath.endsWith("/")||(this.basePath+="/"),this.audioUrls={mahalaya:`${this.basePath}assets/audio/mahalaya.mp3`,diya:`${this.basePath}assets/audio/diya.mp3`,dhak:`${this.basePath}assets/audio/dhak.mp3`,conch:`${this.basePath}assets/audio/conch.mp3`,finalReveal:`${this.basePath}assets/audio/chandi_mangal.mp3`},k.subscribe(e=>{this.handleMuteChange(e.muted)})}getAudioContext(){if(!this.audioContext&&typeof window<"u"&&(window.AudioContext||window.webkitAudioContext)){const e=window.AudioContext||window.webkitAudioContext;this.audioContext=new e}return this.audioContext&&this.audioContext.state==="suspended"&&this.audioContext.resume().catch(()=>{}),this.audioContext}isMuted(){return k.getState().muted}handleMuteChange(e){this.currentAudios.forEach(a=>{a.muted=e})}async playSound(e,a){if(this.isMuted())return null;const i=this.audioUrls[e];if(i)try{const n=new Audio(i);n.muted=this.isMuted(),this.currentAudios.add(n),n.onended=()=>{this.currentAudios.delete(n)};const r=n.play();if(r!==void 0)return await r,n}catch(n){console.info(`Audio file '${e}' not found or blocked. Playing graceful procedural audio fallback.`,(n==null?void 0:n.message)||n)}if(a)try{a(this.getAudioContext())}catch(n){console.warn("Audio fallback synthesis failed gracefully:",n)}return null}playMahalaya(){return this.playSound("mahalaya",e=>{if(!e)return;const a=e.currentTime;[146.83,220,293.66,440].forEach((n,r)=>{const o=e.createOscillator(),s=e.createGain();o.type="sine",o.frequency.setValueAtTime(n,a+r*.15),s.gain.setValueAtTime(0,a),s.gain.linearRampToValueAtTime(.08,a+1.2+r*.2),s.gain.exponentialRampToValueAtTime(1e-4,a+5.5),o.connect(s),s.connect(e.destination),o.start(a+r*.15),o.stop(a+6)})})}playDiya(){return this.playSound("diya",e=>{if(!e)return;const a=e.currentTime,i=Math.floor(e.sampleRate*.5),n=e.createBuffer(1,i,e.sampleRate),r=n.getChannelData(0);for(let d=0;d<i;d++)r[d]=Math.random()*2-1;const o=e.createBufferSource();o.buffer=n;const s=e.createBiquadFilter(),l=e.createGain();s.type="bandpass",s.Q.setValueAtTime(1.2,a),s.frequency.setValueAtTime(400,a),s.frequency.exponentialRampToValueAtTime(1800,a+.35),l.gain.setValueAtTime(0,a),l.gain.linearRampToValueAtTime(.07,a+.08),l.gain.exponentialRampToValueAtTime(1e-4,a+.45),o.connect(s),s.connect(l),l.connect(e.destination),o.start(a),o.stop(a+.5);const u=a+.12,b=880;[{ratio:1,amp:.12,decay:2.4},{ratio:2,amp:.07,decay:1.8},{ratio:2.76,amp:.05,decay:1.4},{ratio:5.4,amp:.03,decay:.9},{ratio:8.93,amp:.015,decay:.5}].forEach(({ratio:d,amp:g,decay:m})=>{const C=e.createOscillator(),w=e.createGain();C.type="sine",C.frequency.setValueAtTime(b*d,u),w.gain.setValueAtTime(0,u),w.gain.linearRampToValueAtTime(g,u+.01),w.gain.exponentialRampToValueAtTime(1e-4,u+m),C.connect(w),w.connect(e.destination),C.start(u),C.stop(u+m+.05)})})}playConch(){return this.playSound("conch",e=>{if(!e)return;const a=e.currentTime,i=415.3,n=2.6,r=e.createOscillator(),o=e.createOscillator(),s=e.createGain(),l=e.createBiquadFilter();l.type="bandpass",l.frequency.setValueAtTime(i*2,a),l.Q.setValueAtTime(3.5,a),r.type="sawtooth",o.type="triangle",r.frequency.setValueAtTime(i*.96,a),r.frequency.exponentialRampToValueAtTime(i,a+.5),r.frequency.exponentialRampToValueAtTime(i*1.01,a+1.8),r.frequency.exponentialRampToValueAtTime(i*.94,a+n),o.frequency.setValueAtTime(i*1.98,a),o.frequency.exponentialRampToValueAtTime(i*2.01,a+n),s.gain.setValueAtTime(0,a),s.gain.linearRampToValueAtTime(.18,a+.4),s.gain.setValueAtTime(.18,a+n-.7),s.gain.exponentialRampToValueAtTime(1e-4,a+n),r.connect(l),o.connect(l),l.connect(s),s.connect(e.destination),r.start(a),o.start(a),r.stop(a+n),o.stop(a+n)})}playDhak(){return this.playSound("dhak",e=>{if(!e)return;const a=e.currentTime;[0,.22,.44,.65,.9,1.15,1.4].forEach((n,r)=>{const o=a+n,s=e.createOscillator(),l=e.createGain(),u=r%2===1;s.type=u?"square":"triangle",s.frequency.setValueAtTime(u?380:160,o),s.frequency.exponentialRampToValueAtTime(u?220:80,o+.12),l.gain.setValueAtTime(.25,o),l.gain.exponentialRampToValueAtTime(.001,o+.18),s.connect(l),l.connect(e.destination),s.start(o),s.stop(o+.2)})})}playDhakReveal(){return this.playSound("finalReveal",e=>{if(!e)return;const a=e.currentTime,i=[0,.1,.2,.28,.36,.44,.52,.6,.68,.76,.85,.95,1.05,1.15,1.25,1.4,1.6,1.8,2,2.3];i.forEach((o,s)=>{const l=a+o,u=e.createOscillator(),b=e.createGain(),p=s%2===1;u.type=p?"square":"triangle";const d=p?340:180;u.frequency.setValueAtTime(d,l),u.frequency.exponentialRampToValueAtTime(d*.5,l+.15);const g=Math.min(.35,.12+s/i.length*.25);b.gain.setValueAtTime(g,l),b.gain.exponentialRampToValueAtTime(.001,l+.2),u.connect(b),b.connect(e.destination),u.start(l),u.stop(l+.22)});const n=a+1.4;[523.25,659.25,783.99,1046.5].forEach(o=>{const s=e.createOscillator(),l=e.createGain();s.type="sine",s.frequency.setValueAtTime(o,n),l.gain.setValueAtTime(.12,n),l.gain.exponentialRampToValueAtTime(1e-4,n+3.5),s.connect(l),l.connect(e.destination),s.start(n),s.stop(n+3.8)})})}stopAll(){this.currentAudios.forEach(e=>{try{e.pause(),e.currentTime=0}catch{}}),this.currentAudios.clear()}}const R=new Ce;function xe(){const t=document.createElement("button");return t.className="icon-btn",t.id="btn-header-restart",t.type="button",t.setAttribute("aria-label","Restart Journey"),t.title="যাত্রা পুনরায় শুরু করুন (Restart Journey)",t.innerHTML=`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <polyline points="3 3 3 9 9 9" />
    </svg>
  `,t.addEventListener("click",()=>{confirm("যাত্রা পুনরায় শুরু করবেন? (Restart the journey?)")&&(R.stopAll(),k.resetGame())}),t}function Le(){const t=document.createElement("header");t.className="theatre-header";const e=document.createElement("div");e.className="brand-section",e.innerHTML=`
    <div class="brand-title">
      <span class="bengali-title">আগমনী</span>
    </div>
  `;const a=document.createElement("div");a.className="journey-progress",a.setAttribute("aria-label","Maa's Journey Progress");const i=document.createElement("span");i.className="journey-label",i.textContent="অগ্রগতি";const n=document.createElement("div");n.className="progress-dots";for(let l=1;l<=6;l++){const u=document.createElement("span");u.className="progress-dot",u.dataset.stage=l,n.appendChild(u)}a.appendChild(i),a.appendChild(n);const r=xe(),o=document.createElement("div");o.className="header-controls",o.appendChild(r),o.appendChild(be()),o.appendChild(ve()),t.appendChild(e),t.appendChild(a),t.appendChild(o);function s(){const{currentStage:l,completedStages:u}=k.getState();n.querySelectorAll(".progress-dot").forEach((p,d)=>{const g=d+1;p.classList.remove("active","completed"),u.includes(g)?p.classList.add("completed"):g===l&&p.classList.add("active")})}return k.subscribe(s),s(),t}const Te={apiKey:"",authDomain:"",databaseURL:"",projectId:"",storageBucket:"",messagingSenderId:"",appId:"",measurementId:""},Se=pe(Te),Me=fe(Se);class Ee{async getVisitorCount(){throw new Error("getVisitorCount() must be implemented by concrete provider")}}class Ae extends Ee{constructor(e="agomoni26"){super(),this.counterRef=me(Me,`games/${e}/visitor_count`),this.sessionKey=`visited_${e}`}async getVisitorCount(){try{if(sessionStorage.getItem(this.sessionKey)){const a=await ye(this.counterRef),i=a.exists()?a.val():0;return String(i).padStart(6,"0")}else{const a=await ge(this.counterRef,n=>(n||0)+1);sessionStorage.setItem(this.sessionKey,"true");const i=a.snapshot.val();return String(i).padStart(6,"0")}}catch(e){return console.error("Firebase visitor counter error:",e),"000000"}}}const Re=new Ae("agomoni26");function Ne(){const t=document.createElement("div");return t.className="visitor-counter",t.id="visitor-counter",t.textContent="Visitors: 000000",Re.getVisitorCount().then(e=>{t.textContent=`Visitors: ${e}`}).catch(()=>{t.textContent="Visitors: 000000"}),t}function He(){const t=document.createElement("footer");t.className="theatre-footer";const e=document.createElement("div");e.className="footer-credit",e.innerHTML="<span>Agomoni - by Avik Sarkar</span>";const a=Ne();return t.appendChild(e),t.appendChild(a),t}function $e({onStart:t}={}){if(document.getElementById("intro-overlay"))return;const e=document.createElement("div");e.id="intro-overlay",e.className="intro-overlay",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-labelledby","intro-title"),e.setAttribute("aria-describedby","intro-desc"),e.innerHTML=`
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
      <button type="button" class="intro-start-btn" id="intro-start-btn">শুরু ⮞</button>
    </div>
  `,document.body.appendChild(e),document.body.classList.add("intro-open");const a=e.querySelector("#intro-start-btn");a.focus(),e.addEventListener("keydown",i=>{i.key==="Tab"&&(i.preventDefault(),a.focus())}),a.addEventListener("click",()=>{e.classList.contains("closing")||(e.classList.add("closing"),document.body.classList.remove("intro-open"),typeof t=="function"&&t(),setTimeout(()=>e.remove(),450))})}const A=88,G=108,Y=95.6,J=96.6,qe=(Y+J)/2,Be=700,de=.1,U=t=>t>=Y&&t<=J,De=t=>t<Y?Y-t:t>J?t-J:0;function _e(){const t=document.createElement("div");t.className="stage-container";const e=document.createElement("div");e.className="stage-header-block",e.innerHTML=`
    <h3 class="stage-title">পিতৃপক্ষের অবসান ... দেবীপক্ষের সূচনা</h3>
    <br/>
    <p class="stage-instruction">রেডিওর কাঁটা ৯৬ মেগাহার্টজের কাছাকাছি ... মহালয়ার পুণ্য লগ্নে বীরেন্দ্রকৃষ্ণ ভদ্রের গলায় ... মহিষাসুরমর্দ্দিনী</p>
  `;const a=document.createElement("div");a.className="mahalaya-room",a.id="mahalaya-room";const i=document.createElement("div");i.className="window-scenery",i.innerHTML=`
    <div class="window-bars">
      <div class="window-bar"></div>
      <div class="window-bar"></div>
      <div class="window-bar"></div>
    </div>
  `,a.appendChild(i);const n=document.createElement("div");n.className="room-item diya-wrapper",n.id="mahalaya-diya",n.setAttribute("aria-hidden","true"),n.innerHTML=`
    <div class="diya-flame"></div>
    ${L.diya}
    <span style="font-size: 0.75rem; color: var(--color-gold);">মাটির প্রদীপ</span>
  `;const r=document.createElement("div");r.className="room-item radio-wrapper radio-tuner",r.id="mahalaya-radio",r.innerHTML=`
    ${L.radio}
    <div class="tuner">
      <div class="tuner-readout">
        <span class="tuner-freq" id="tuner-freq">--</span>
        <span class="tuner-unit">MHz</span>
      </div>
      <div class="tuner-dial" id="tuner-dial"
           role="slider" tabindex="0"
           aria-label="Radio frequency"
           aria-valuemin="${A}" aria-valuemax="${G}"
           aria-valuenow="${A}">
        <div class="tuner-ticks"></div>
        <div class="tuner-needle" id="tuner-needle"><div class="tuner-knob"></div></div>
      </div>
      <div class="tuner-scale">
        <span>${A}</span><span>${(A+G)/2}</span><span>${G}</span>
      </div>
      <p class="tuner-hint" id="tuner-hint">শুধু ঘ্যাঁ-ঘ্যাঁ শব্দ... কাঁটাটি টেনে দেখুন</p>
    </div>
  `,a.appendChild(r);const o=document.createElement("div");o.id="stage1-action-area",t.appendChild(e),t.appendChild(a),t.appendChild(o);const s=r.querySelector("#tuner-dial"),l=r.querySelector("#tuner-needle"),u=r.querySelector("#tuner-freq"),b=r.querySelector("#tuner-hint"),p=r.querySelector(".tuner-ticks");for(let y=0;y<=20;y++){const c=document.createElement("i");c.className=y%5===0?"tick tick-major":"tick",p.appendChild(c)}let d=!1,g=A+Math.random()*3,m=null,C=!1,w=null,x=null;function M(){if(!w)try{const y=window.AudioContext||window.webkitAudioContext;if(!y)return;w=new y;const c=w.createBuffer(1,w.sampleRate*2,w.sampleRate),h=c.getChannelData(0);for(let v=0;v<h.length;v++)h[v]=Math.random()*2-1;const f=w.createBufferSource();f.buffer=c,f.loop=!0,x=w.createGain(),x.gain.value=0,f.connect(x).connect(w.destination),f.start()}catch{w=null}}function T(){if(w)try{x.gain.setTargetAtTime(0,w.currentTime,.1);const y=w;w=null,setTimeout(()=>y.close(),400)}catch{}}function $(y){return Math.max(0,1-De(y)/6)}function q(){const y=(g-A)/(G-A)*100;l.style.left=y+"%",u.textContent=g.toFixed(1),s.setAttribute("aria-valuenow",g.toFixed(1));const c=$(g);a.style.setProperty("--tune-glow",c.toFixed(2)),x&&w&&x.gain.setTargetAtTime(.12*(1-c*c),w.currentTime,.05),c>.93?b.textContent="প্রায় পেয়ে গেছেন... স্থির থাকুন":c>.6?b.textContent="দূর থেকে সুর ভেসে আসছে...":c>.3?b.textContent="ক্ষীণ একটা কণ্ঠস্বর... আরও কাছে":b.textContent="শুধু ঘ্যাঁ-ঘ্যাঁ শব্দ... কাঁটাটি টেনে দেখুন"}function ee(){d||(U(g)&&!m?m=setTimeout(()=>{m=null,U(g)&&O()},Be):!U(g)&&m&&(clearTimeout(m),m=null))}function B(y){g=Math.round(Math.min(G,Math.max(A,y))*10)/10,q(),ee()}function Q(y){const c=s.getBoundingClientRect(),h=(y.clientX-c.left)/c.width;return A+Math.min(1,Math.max(0,h))*(G-A)}function O(y=!1){if(d)return;d=!0,clearTimeout(m),T(),U(g)||(g=qe),q(),s.setAttribute("aria-disabled","true"),b.textContent="মহালয়া বাজছে...",a.classList.add("illuminated"),r.classList.add("tuned");const c=document.createElement("div");c.className="radio-soundwaves",c.innerHTML=`
      <div class="soundwave-bar"></div>
      <div class="soundwave-bar"></div>
      <div class="soundwave-bar"></div>
      <div class="soundwave-bar"></div>
    `,r.appendChild(c),R.playMahalaya(),k.completeStage(1),setTimeout(()=>{o.innerHTML=`
      <div class="stage-banner">
        <p class="stage-banner-sub">কৈলাস থেকে মর্ত্যে মায়ের আগমন যাত্রায় আপনাকে স্বাগতম</p>
        <p class="stage-banner-sub">আশা করছি শেষ পর্যন্ত উপভোগ করবেন</p>
        <button class="btn-continue" id="stage1-continue-btn">
          ${L.arrowRight}
        </button>
      </div>
    `,o.querySelector("#stage1-continue-btn").addEventListener("click",()=>{k.nextStage()})},y?0:2e3)}s.addEventListener("pointerdown",y=>{d||(C=!0,s.setPointerCapture(y.pointerId),M(),w&&w.state==="suspended"&&w.resume(),B(Q(y)))}),s.addEventListener("pointermove",y=>{!C||d||B(Q(y))});const j=y=>{C=!1,s.hasPointerCapture(y.pointerId)&&s.releasePointerCapture(y.pointerId)};s.addEventListener("pointerup",j),s.addEventListener("pointercancel",j),s.addEventListener("keydown",y=>{if(d)return;let c=0;if(y.key==="ArrowRight"||y.key==="ArrowUp")c=de;else if(y.key==="ArrowLeft"||y.key==="ArrowDown")c=-de;else if(y.key==="PageUp")c=1;else if(y.key==="PageDown")c=-1;else return;y.preventDefault(),M(),B(g+c)});const Z=new MutationObserver(()=>{document.body.contains(t)||(T(),clearTimeout(m),Z.disconnect())});Z.observe(document.body,{childList:!0,subtree:!0}),q();const{completedStages:W}=k.getState();return W.includes(1)&&setTimeout(()=>O(!0),100),t}const Ve={},ae="./",X=ae.endsWith("/")?ae:ae+"/",Pe=[{id:"palanquin",name:"Palanquin",bengali:"পালকি",image:`${X}assets/images/palanquin.png`},{id:"horse",name:"Horse",bengali:"ঘোড়া",image:`${X}assets/images/horse.png`,isCorrect:!0},{id:"elephant",name:"Elephant",bengali:"হাতি",image:`${X}assets/images/elephant.png`},{id:"boat",name:"Boat",bengali:"নৌকা",image:`${X}assets/images/boat.png`}];function Ge(){const t=document.createElement("div");t.className="stage-container";const e=document.createElement("div");e.className="stage-header-block",e.innerHTML=`
    <h3 class="stage-title">১৪৩২ বঙ্গাব্দ</h3>
    <br/>
    <p class="stage-instruction">মায়ের মর্ত্যগামী বাহন প্রস্তুত ... <u>লাগাম টা টেনে ধরলেই</u> চলতে শুরু করবে</p>
  `;const a=document.createElement("div");a.className="transport-grid";const i=document.createElement("div");i.className="feedback-msg",i.id="transport-feedback";const n=document.createElement("div");n.id="stage2-action-area",t.appendChild(e),t.appendChild(a),t.appendChild(i),t.appendChild(n);let r=!1;Pe.forEach(s=>{const l=document.createElement("button");l.className="transport-card",l.id=`transport-${s.id}`,l.setAttribute("role","button"),l.setAttribute("aria-label",`Select ${s.name} (${s.bengali})`),l.innerHTML=`
      <img src="${s.image}" alt="${s.name}" class="transport-img" />
      <span class="transport-name">${s.name}</span>
      <span class="transport-bengali">${s.bengali}</span>
    `,l.addEventListener("click",()=>{if(!r)if(s.isCorrect){r=!0,l.classList.add("selected-correct"),i.textContent="ঘোড়সওয়ার মা ধাবমান আলোর মতো এগিয়ে আসছেন...";const u=l.querySelector(".transport-img");u&&(u.style.transition="transform 0.8s ease-in-out",u.style.transform="translateX(14px) scale(1.12)"),k.completeStage(2),setTimeout(()=>{n.innerHTML=`
            <div class="stage-banner">
              <p class="stage-banner-text">ছত্র ভঙ্গ স্তুরঙ্গমে</p>
              <p class="stage-banner-sub">অশ্বারোহী মা ... আপনাকে সামনের দিনগুলোতে নিজ এবং প্রিয়জনদের প্রতি যত্নশীল হবার পরামর্শ দিচ্ছেন</p>
              <button class="btn-continue" id="stage2-continue-btn">
                ${L.arrowRight}
              </button>
            </div>
          `,n.querySelector("#stage2-continue-btn").addEventListener("click",()=>{k.nextStage()})},2e3)}else l.classList.add("selected-wrong"),i.textContent=`${s.bengali} শান্ত... তবে এবার মা আসছেন দ্রুত অশ্বে।`,setTimeout(()=>{l.classList.remove("selected-wrong")},1500)}),a.appendChild(l)});const{completedStages:o}=k.getState();return o.includes(2)&&setTimeout(()=>{const s=a.querySelector("#transport-horse");s&&s.click()},100),t}const Ie={},ne="./",F=ne.endsWith("/")?ne:ne+"/",I=[{id:"ganesha",name:"Lord Ganesha",bengali:"গণেশ",image:`${F}assets/images/ganesha.png`},{id:"lakshmi",name:"Ma Lokkhi",bengali:"লক্ষ্মী",image:`${F}assets/images/lakshmi.png`},{id:"durga",name:"Ma Durga",bengali:"দুর্গা",image:`${F}assets/images/durga.png`},{id:"saraswati",name:"Ma Saraswati",bengali:"সরস্বতী",image:`${F}assets/images/saraswati.png`},{id:"kartikeya",name:"Lord Kartikey",bengali:"কার্তিক",image:`${F}assets/images/kartikeya.png`}],ue=["ganesha","lakshmi","durga","saraswati","kartikeya"];function Oe(){const t=document.createElement("div");t.className="stage-container";const e=document.createElement("div");e.className="stage-header-block",e.innerHTML=`
    <h3 class="stage-title">মা মানেই পরিবার</h3>
    <br/>
    <p class="stage-instruction">আর পরিবার মানেই তো সেই চিরচেনা মুখগুলো ... সবাইকে তাদের স্ব স্ব স্থানে রাখতে হবে তো!</p>
  `;const a=document.createElement("div");a.className="deities-container";const i=document.createElement("div");i.className="deities-track";const n=document.createElement("p");n.className="reorder-hint",n.textContent="প্রতিমা স্পর্শ বা ক্লিক করে স্থান অদলবদল (swap) করুন";const r=document.createElement("div");r.id="stage3-action-area",a.appendChild(i),a.appendChild(n),t.appendChild(e),t.appendChild(a),t.appendChild(r);let o=[I[1],I[4],I[2],I[0],I[3]],s=null,l=!1;function u(){o.every((g,m)=>g.id===ue[m])&&!l&&(l=!0,s=null,b(),k.completeStage(3),setTimeout(()=>{r.innerHTML=`
          <div class="stage-banner">
            <p class="stage-banner-text">সাধু... সাধু ...</p>
            <p class="stage-banner-sub">অসাধারণ করছেন ... এরপর যে দেবতাদের আশীর্বাদ প্রয়োজন হবে</p>
            <button class="btn-continue" id="stage3-continue-btn">
              ${L.arrowRight}
          </button>
        </div>
      `,r.querySelector("#stage3-continue-btn").addEventListener("click",()=>{k.nextStage()})},2e3))}function b(){i.innerHTML="",o.forEach((d,g)=>{const m=document.createElement("div");m.className=`deity-slot ${s===g?"selected":""} ${l?"locked":""}`,m.setAttribute("role","button"),m.setAttribute("tabindex","0"),m.setAttribute("aria-label",`${d.name} (${d.bengali}) at position ${g+1}`),m.innerHTML=`
        <span class="deity-order-badge">${g+1}</span>
        <img src="${d.image}" alt="${d.name}" class="deity-img" />
        <span class="deity-name">${d.bengali}</span>
      `,l||(m.addEventListener("click",()=>{if(s===null)s=g;else if(s===g)s=null;else{const C=o[s];o[s]=o[g],o[g]=C,s=null}b(),u()}),m.addEventListener("keydown",C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),m.click())})),i.appendChild(m)})}const{completedStages:p}=k.getState();return p.includes(3)?(o=ue.map(d=>I.find(g=>g.id===d)),setTimeout(()=>{u()},100)):b(),t}function je(){const t=document.createElement("div");t.className="stage-container stage4-container";const e=["CHAKRA","TRIDENT","SWORD","THUNDERBOLT","LOTUS"],a=["CONCH","SPEAR","BOW","SNAKE","AXE"],i=Object.freeze([...e,...a]),n=Object.freeze({CHAKRA:"চক্র",TRIDENT:"ত্রিশূল",SWORD:"তরবারি",THUNDERBOLT:"বজ্র",LOTUS:"পদ্ম",CONCH:"শঙ্খ",SPEAR:"বর্শা",BOW:"ধনুক",SNAKE:"সাপ",AXE:"কুড়াল"}),r=c=>n[c]??c,o=document.createElement("div");o.className="stage-header-block",o.innerHTML=`
    <h3 class="stage-title">দশপ্রহরণধারিণী</h3>
    <p id="stage4-status" class="stage-instruction" aria-live="polite">❓চিহ্নিত হাত দুটোতে কোন অস্ত্র দুটো দিই বলুন তো ... 🤔 আপনিই বরং ওই নিচে রাখা অস্ত্র গুলো থেকে পড়িয়ে দিন</p>
  `;const s=document.createElement("div");s.id="arena",s.innerHTML='<div id="hub">ॐ</div>';const l=document.createElement("div");l.id="tray",l.setAttribute("aria-label","Weapon chips");const u=document.createElement("div");u.className="bar",u.innerHTML=`
    <span>তেমন কিছু না ... <b id="stage4-misses">0</b> বার চেষ্টা করা যেতেই পারে!</span>
    <!--<button id="stage4-again" type="button">New attempt</button>-->
  `;const b=document.createElement("div");b.id="stage4-action-area",t.appendChild(o),t.appendChild(s),t.appendChild(l),t.appendChild(u),t.appendChild(b);const p=o.querySelector("#stage4-status"),d=u.querySelector("#stage4-misses"),g=s.querySelector("#hub");let m=[],C=new Set,w=new Set,x=0,M=!1,T=null;function $(c){const h=c.slice();for(let f=h.length-1;f>0;f--){const v=Math.floor(Math.random()*(f+1));[h[f],h[v]]=[h[v],h[f]]}return h}function q(){m.forEach((c,h)=>{const f=h<5?0:1,N=(h%5-2)/2,E=.085*N*N,D=f===0?.2+E:.8-E,te=.5+N*.37;c.style.left=D*100+"%",c.style.top=te*100+"%"})}function ee(){M=!1,w=new Set,x=0,T=null,d.textContent="0",g.classList.remove("done"),l.classList.remove("done"),b.innerHTML="";const c=$([...Array(10).keys()]);C=new Set(c.slice(0,2)),s.querySelectorAll(".slot").forEach(h=>h.remove()),m=i.map((h,f)=>{const v=document.createElement("div");return v.className="slot "+(C.has(f)?"missing":"sealed"),v.dataset.i=f,v.style.setProperty("--i",f),v.setAttribute("aria-label",C.has(f)?"Missing weapon position":"Sealed weapon position"),v.innerHTML='<span class="label"></span>',C.has(f)&&v.insertAdjacentText("afterbegin","?"),v.addEventListener("click",()=>{T&&j(T,v)}),s.appendChild(v),v}),q(),l.innerHTML="",$(i).forEach(h=>{const f=document.createElement("div");f.className="chip",f.textContent=r(h),f.dataset.w=h,f.setAttribute("role","button"),f.setAttribute("tabindex","0"),f.addEventListener("pointerdown",v=>Q(f,v)),f.addEventListener("contextmenu",v=>v.preventDefault()),f.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),B(f))}),l.appendChild(f)}),p.innerHTML="❓চিহ্নিত হাত দুটোতে কোন অস্ত্র দুটো দিই বলুন তো 🤔<br/>আপনিই বরং ওই নিচে রাখা অস্ত্র গুলো থেকে পড়িয়ে দিন"}function B(c){if(M||c.classList.contains("used"))return;const h=c.classList.contains("selected");l.querySelectorAll(".chip.selected").forEach(f=>f.classList.remove("selected")),T=h?null:c,T&&c.classList.add("selected")}function Q(c,h){if(M||c.classList.contains("used")||h.pointerType==="mouse"&&h.button!==0)return;h.preventDefault();const f=h.pointerId,v=h.pointerType!=="mouse",N=v?10:6,E=v?56:0,D=h.clientX,te=h.clientY;let K=!1,H=null,_=null;try{c.setPointerCapture(f)}catch{}function oe(S){if(S.pointerId!==f||(!K&&Math.hypot(S.clientX-D,S.clientY-te)>N&&(K=!0,H=c.cloneNode(!0),H.classList.add("ghost"),document.body.appendChild(H),c.classList.add("dragging")),!K))return;const V=S.clientX,le=S.clientY-E;H.style.left=V+"px",H.style.top=le+"px";const P=O(V,le);_&&_!==P&&_.classList.remove("over"),_=P,P&&P.classList.contains("missing")&&!P.classList.contains("filled")&&P.classList.add("over")}function z(S){if(S.pointerId===f){window.removeEventListener("pointermove",oe),window.removeEventListener("pointerup",z),window.removeEventListener("pointercancel",z);try{c.releasePointerCapture(f)}catch{}if(_&&_.classList.remove("over"),c.classList.remove("dragging"),H&&H.remove(),S.type!=="pointercancel")if(K){const V=O(S.clientX,S.clientY-E);V&&j(c,V)}else B(c)}}window.addEventListener("pointermove",oe),window.addEventListener("pointerup",z),window.addEventListener("pointercancel",z)}function O(c,h){let f=null,v=1/0;for(const N of m){const E=N.getBoundingClientRect(),D=Math.hypot(c-(E.left+E.width/2),h-(E.top+E.height/2));D<v&&(f=N,v=D)}return f&&v<=f.getBoundingClientRect().width*.75?f:null}function j(c,h){if(M)return;const f=+h.dataset.i,v=c.dataset.w;if(!C.has(f)||w.has(f)||i[f]!==v)return Z(h);w.add(f),h.classList.add("filled"),h.classList.remove("over"),h.firstChild&&h.firstChild.nodeType===3&&h.removeChild(h.firstChild),h.querySelector(".label").textContent=r(v),c.classList.remove("selected"),c.classList.add("used"),T=null,w.size===C.size?W():p.textContent="দারুন! আর একটা মাত্র বাকি ..."}function Z(c){x++,d.textContent=x,c.classList.remove("shake"),c.offsetWidth,c.classList.add("shake"),setTimeout(()=>c.classList.remove("shake"),450),p.textContent="ওহ! এটা তো ঠিক হল না ... আবার চেষ্টা করুন"}function W(){M=!0,T=null,l.querySelectorAll(".chip.selected").forEach(c=>c.classList.remove("selected")),m.forEach((c,h)=>{c.querySelector(".label").textContent=r(i[h]),c.classList.remove("missing","sealed"),c.classList.add("revealed")}),g.classList.add("done"),l.classList.add("done");for(let c=0;c<3;c++)setTimeout(()=>{const h=document.createElement("div");h.className="ring",s.appendChild(h),setTimeout(()=>h.remove(),2300)},c*450);p.textContent="মা দশভুজার অলৌকিক আভা দশদিকে প্রকাশিত ... জয় মা দূর্গা",k.completeStage(4),setTimeout(()=>{b.innerHTML=`
        <div class="stage-banner">
          <p class="stage-banner-sub">ঢাকে কাঠি পড়লো বলে ... আগমনী আর বেশি দূরে নয়</p>
          <button class="btn-continue" id="stage4-continue-btn">
            ${L.arrowRight}
          </button>
        </div>
      `,b.querySelector("#stage4-continue-btn").addEventListener("click",()=>{k.nextStage()})},2e3)}window.addEventListener("resize",q),ee();const{completedStages:y}=k.getState();return y.includes(4)&&W(),t}const Ze={},se="./",Fe=se.endsWith("/")?se:se+"/",Qe={diya:"pradip.png",dhak:"dhak.png",conch:"shankha.png"};function ie(t){const e=encodeURIComponent(L[t]);return`<img class="puja-item-img" src="${Fe}assets/images/${Qe[t]}"
               alt="" draggable="false" decoding="async"
               onerror="this.outerHTML=decodeURIComponent('${e}')">`}function We(){const t=document.createElement("div");t.className="stage-container";const e=document.createElement("div");e.className="stage-header-block",e.innerHTML=`
    <h3 class="stage-title">আবাহন</h3>
    <br/>
    <p class="stage-instruction">শুরুটা আলোয়, তারপর ধ্বনি আর শেষে ঢ্যাং কুড়াকুড় ... </p>
  `;const a=document.createElement("div");a.className="puja-altar";const i=document.createElement("div");i.className="puja-item-card",i.id="puja-diya",i.setAttribute("role","button"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label","Light the Sacred Diya"),i.innerHTML=`
    <div style="position: relative;">
      <div class="diya-flame" style="opacity: 0; transition: opacity 0.4s ease;" id="chaturthi-flame"></div>
      ${ie("diya")}
    </div>
    <span class="puja-item-title">Diya</span>
    <span class="puja-item-bengali">মঙ্গল প্রদীপ</span>
  `;const n=document.createElement("div");n.className="puja-item-card",n.id="puja-dhak",n.setAttribute("role","button"),n.setAttribute("tabindex","0"),n.setAttribute("aria-label","Sound the Festive Dhak"),n.innerHTML=`
    <div id="dhak-graphic-container">
      ${ie("dhak")}
    </div>
    <span class="puja-item-title">Dhak</span>
    <span class="puja-item-bengali">ঢাক</span>
  `;const r=document.createElement("div");r.className="puja-item-card",r.id="puja-conch",r.setAttribute("role","button"),r.setAttribute("tabindex","0"),r.setAttribute("aria-label","Blow the Sacred Conch (Shankha)"),r.innerHTML=`
    <div id="conch-graphic-container">
      ${ie("conch")}
    </div>
    <span class="puja-item-title">Conch</span>
    <span class="puja-item-bengali">মঙ্গল শঙ্খ</span>
  `,[i,r,n].forEach(d=>{d.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),d.click())})}),a.appendChild(r),a.appendChild(i),a.appendChild(n);const o=document.createElement("div");o.className="feedback-msg",o.id="chaturthi-feedback";const s=document.createElement("div");s.id="stage5-action-area",t.appendChild(e),t.appendChild(a),t.appendChild(o),t.appendChild(s);let l=0,u=!1;function b(){u||(u=!0,o.textContent="মণ্ডপ আনন্দ ও ভক্তিতে ভরে উঠেছে...",a.style.boxShadow="var(--shadow-glow)",k.completeStage(5),setTimeout(()=>{s.innerHTML=`
        <div class="stage-banner stage5-completion-banner">
          <div class="stage5-durga-wrapper">
            <div class="stage5-durga-aura"></div>
            ${L.maaDurgaReveal}
          </div>
          <p class="stage-banner-text">জাগো দূর্গা</p>
          <p class="stage-banner-sub">অভয়া শক্তি বলপ্রদায়িনী তুমি জাগো...</p>
          <!-- <button class="btn-continue" id="stage5-continue-btn">
            ${L.arrowRight}
          </button> -->
          <p class="stage5-bodhon-note">
            আরে ... চললেন কোথায়? মায়ের বোধন টা যে এখনো বাকি ...
            <span class="stage5-bodhon-timer" id="stage5-bodhon-timer">১০</span>
          </p>
        </div>
      `,(function(g){const m=["০","১","২","৩","৪","৫","৬","৭","৮","৯"],C=T=>String(T).replace(/\d/g,$=>m[$]),w=document.getElementById("stage5-bodhon-timer");if(!w)return;let x=g;w.textContent=C(x);const M=setInterval(()=>{if(!document.body.contains(w)||x<=1){clearInterval(M),x<=1&&document.body.contains(w)&&(w.textContent=C(0));return}x-=1,w.textContent=C(x)},1e3)})(10),setTimeout(()=>{R.stopAll(),k.nextStage()},1e4)},2e3))}i.addEventListener("click",()=>{if(u)return;R.stopAll();const d=i.querySelector("#chaturthi-flame");d&&(d.style.opacity="1"),i.classList.add("activated"),l===0?(l=1,o.textContent="প্রদীপের আলোয় বেদী আলোকিত হলো...",R.playDiya()):o.textContent="প্রদীপ প্রজ্বলিত।"}),r.addEventListener("click",()=>{if(u)return;r.classList.add("activated");const d=r.querySelector("#conch-graphic-container");d&&(d.style.transform="scale(1.15)",setTimeout(()=>{d.style.transform="scale(1)"},600)),l===1?(l=2,o.textContent="শঙ্খধ্বনিতে দেবীর আবাহন ধ্বনিত হলো...",R.playConch()):l===0?o.textContent="প্রথমে মণ্ডপে মঙ্গলপ্রদীপ প্রজ্জ্বলন করুন...":l===2&&(o.textContent="শঙ্খ ধ্বনিত হয়েছে, এবার ঢাকের মঙ্গলবাদন হোক...")}),n.addEventListener("click",()=>{if(u)return;n.classList.add("activated");const d=n.querySelector("#dhak-graphic-container");d&&(d.style.transform="scale(1.1) rotate(4deg)",setTimeout(()=>{d.style.transform="scale(1) rotate(0deg)"},400)),l===2?(o.textContent="ঢাকের বোলে বাতাসে আগমনীর শিহরণ...",R.playDhak(),b()):l===0?o.textContent="পূজার সূচনায় প্রথমে মঙ্গলদীপের পবিত্র আলো প্রয়োজন...":l===1&&(o.textContent="ঢাকের পূর্বে মঙ্গল শঙ্খধ্বনি হোক...")});const{completedStages:p}=k.getState();if(p.includes(5)){const d=i.querySelector("#chaturthi-flame");d&&(d.style.opacity="1"),i.classList.add("activated"),n.classList.add("activated"),r.classList.add("activated"),setTimeout(()=>{b()},100)}return t}const Ke={},re="./",he=re.endsWith("/")?re:re+"/";function ze(){R.stopAll();const t=document.createElement("div");t.className="stage-container";const e=document.createElement("div");e.className="stage-header-block",e.innerHTML=`
    <h2 class="stage-title">উমার বোধন</h2>
  `;const a=document.createElement("div");a.className="bodhan-theatre",a.id="bodhan-theatre";const i=document.createElement("div");i.className="durga-artwork-container";const n=document.createElement("div");n.className="durga-aura";const r=document.createElement("div");r.className="durga-photo-frame",r.innerHTML=`
    <img src="${he}assets/images/durga_final.png" alt="Maa Durga" class="bodhan-durga-photo" />
  `,i.appendChild(n),i.appendChild(r),a.appendChild(i);const o=document.createElement("div");o.id="bodhan-message-area",t.appendChild(e),t.appendChild(a),t.appendChild(o);let s=null;function l(p){u();const d=document.createElement("div");d.className="shiuli-layer",d.id="shiuli-layer",p.appendChild(d);const g=()=>{if(!d.isConnected)return u();if(d.childElementCount>40)return;const m=document.createElement("div");m.className="shiuli-flower",m.innerHTML=`<img src="${he}assets/images/shiuli.png" width="100" height="100" alt="" decoding="async">`,m.style.left=`${40+Math.random()*60}%`,m.style.fontSize=`${14+Math.random()*14}px`,m.style.setProperty("--fall-distance",`${d.clientHeight+80}px`),m.style.setProperty("--fall-duration",`${6+Math.random()*4}s`),m.style.setProperty("--sway-mid",`${-20-Math.random()*50}px`),m.style.setProperty("--sway-end",`${-60-Math.random()*100}px`),m.style.setProperty("--rot-mid",`${60+Math.random()*120}deg`),m.style.setProperty("--rot-end",`${180+Math.random()*180}deg`),d.appendChild(m),m.addEventListener("animationend",()=>m.remove())};g(),s=setInterval(g,450)}function u(){var p;clearInterval(s),s=null,(p=document.getElementById("shiuli-layer"))==null||p.remove()}function b(){k.completeStage(6);const p=r.querySelector(".bodhan-durga-photo");p&&(p.style.opacity="0",p.style.filter="blur(10px) brightness(0.4)",p.style.transition="opacity 2s ease, filter 2.5s ease, transform 2.5s cubic-bezier(0.2, 0.8, 0.2, 1)",p.style.transform="scale(0.92)"),setTimeout(()=>{R.playDhakReveal(),n.classList.add("visible"),l(t)},800),setTimeout(()=>{p&&(p.style.opacity="0.5",p.style.filter="blur(4px) brightness(0.7)")},1600),setTimeout(()=>{p&&(p.style.opacity="1",p.style.filter="blur(0px) brightness(1.05)",p.style.transform="scale(1)"),r.classList.add("revealed")},3e3),setTimeout(()=>{o.innerHTML=`
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
          <p style="font-size: 0.80rem; font-style: italic;">কৃতজ্ঞতা: <a href="https://www.youtube.com/watch?v=YQyo8QeoYhc">মহালয়া, বীরেন্দ্র কৃষ্ণ ভদ্র</a> | <a href="https://www.youtube.com/watch?v=J_NGbPOsNhI">চন্ডীমঙ্গল, গপ্পো মীরের ঠেক</a></p>
        </div>
      `;const d=o.querySelector("#btn-journey-restart");d&&d.addEventListener("click",()=>{u(),R.stopAll(),k.resetGame()})},7e3)}return setTimeout(()=>{b()},200),t}function Ue(){const t=document.createElement("div");t.className="app-container";const e=document.createElement("main");e.className="theatre-window";const a=Le();e.appendChild(a);const i=document.createElement("section");i.className="theatre-stage-area",i.id="stage-viewport",e.appendChild(i);const n=He();t.appendChild(e),t.appendChild(n);let r=null,o=null;function s(p){p&&(p.style.animation="fadeIn 0.4s ease forwards",i.appendChild(p))}function l(){$e({onStart:()=>{r===1&&(i.innerHTML="",s(_e()))}})}function u(p,d=0){if(!(r===p&&o===d))switch(r=p,o=d,i.innerHTML="",p){case 2:s(Ge());break;case 3:s(Oe());break;case 4:s(je());break;case 5:s(We());break;case 6:s(ze());break;case 1:default:l()}}function b(p){document.documentElement.setAttribute("data-theme",p.theme),u(p.currentStage,p.restartCount||0)}return k.subscribe(b),b(k.getState()),t}document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("app");t&&t.appendChild(Ue())});
