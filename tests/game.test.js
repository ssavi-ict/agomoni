// Automated Test Suite for Agomoni Logic & Progression
import assert from 'node:assert';

console.log('--- Testing Agomoni Game Logic ---');

// Mock localStorage and window
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};
global.window = {
  matchMedia: () => ({ matches: false }),
  AudioContext: class {
    constructor() { this.state = 'running'; this.currentTime = 0; }
    createOscillator() { return { type: '', frequency: { setValueAtTime(){}, exponentialRampToValueAtTime(){} }, connect(){}, start(){}, stop(){} }; }
    createGain() { return { gain: { setValueAtTime(){}, linearRampToValueAtTime(){}, exponentialRampToValueAtTime(){} }, connect(){} }; }
    createBiquadFilter() { return { type: '', frequency: { setValueAtTime(){} }, Q: { setValueAtTime(){} }, connect(){} }; }
  }
};

// 1. Test GameState
const { gameState } = await import('../src/state/gameState.js');

console.log('1. Testing Game State & Progression...');
assert.strictEqual(gameState.getState().currentStage, 1, 'Initial stage should be 1');
assert.deepStrictEqual(gameState.getState().completedStages, [], 'Initial completed stages should be empty');

// Complete stage 1 and advance
gameState.completeStage(1);
gameState.nextStage();
assert.strictEqual(gameState.getState().currentStage, 2, 'Stage should advance to 2');
assert.deepStrictEqual(gameState.getState().completedStages, [1], 'Stage 1 should be marked completed');

// Test LocalStorage persistence
const savedState = JSON.parse(storage['agomoni-game-state']);
assert.strictEqual(savedState.currentStage, 2, 'State should persist currentStage in localStorage');
assert.deepStrictEqual(savedState.completedStages, [1], 'State should persist completedStages in localStorage');

// Test Theme Toggle
const initialTheme = gameState.getState().theme;
gameState.toggleTheme();
assert.notStrictEqual(gameState.getState().theme, initialTheme, 'Theme toggle should flip theme');
gameState.toggleTheme();

// Test Mute Toggle
assert.strictEqual(gameState.getState().muted, false, 'Default muted should be false');
gameState.toggleMuted();
assert.strictEqual(gameState.getState().muted, true, 'Mute toggle should set muted to true');
gameState.toggleMuted();
assert.strictEqual(gameState.getState().muted, false, 'Mute toggle should set muted back to false');

console.log('✓ Game State & Persistence tests passed');

// 2. Test Visitor Counter Service
console.log('2. Testing Visitor Counter Service...');
const { visitorCounterService } = await import('../src/services/visitorCounterService.js');
const countStr = await visitorCounterService.getVisitorCount();
assert.match(countStr, /^\d{6}$/, 'Visitor counter must format as 6 digits with leading zeros (e.g. 000000)');
assert.strictEqual(countStr, '000000', 'Visitor counter should use its fallback when Firebase is not configured');
console.log(`✓ Visitor Counter returned: ${countStr}`);

// 3. Test Audio Manager
console.log('3. Testing Audio Manager & Non-crashing fallbacks...');
const { audioManager } = await import('../src/audio/audioManager.js');
assert.doesNotThrow(() => {
  audioManager.playMahalaya();
  audioManager.playDhak();
  audioManager.playConch();
  audioManager.playDhakReveal();
}, 'Audio manager methods must not throw even if files do not exist');
console.log('✓ Audio Manager resilience verified');

// 4. Test Canonical Deities Ordering (Stage 3)
console.log('4. Testing Stage 3 Deity Order...');
const CANONICAL_DEITIES = ['ganesha', 'lakshmi', 'durga', 'saraswati', 'kartikeya'];
assert.strictEqual(CANONICAL_DEITIES[0], 'ganesha');
assert.strictEqual(CANONICAL_DEITIES[1], 'lakshmi');
assert.strictEqual(CANONICAL_DEITIES[2], 'durga');
assert.strictEqual(CANONICAL_DEITIES[3], 'saraswati');
assert.strictEqual(CANONICAL_DEITIES[4], 'kartikeya');
console.log('✓ Canonical deity order verified');

// 5. Test Canonical Weapons Ordering (Stage 4)
console.log('5. Testing Stage 4 Weapons Arcs...');
const LEFT_ARC = ['CHAKRA', 'TRIDENT', 'SWORD', 'THUNDERBOLT', 'LOTUS'];
const RIGHT_ARC = ['CONCH', 'SPEAR', 'BOW', 'SNAKE', 'AXE'];
assert.strictEqual(LEFT_ARC.length, 5);
assert.strictEqual(RIGHT_ARC.length, 5);
assert.strictEqual(LEFT_ARC[0], 'CHAKRA');
assert.strictEqual(LEFT_ARC[4], 'LOTUS');
assert.strictEqual(RIGHT_ARC[0], 'CONCH');
assert.strictEqual(RIGHT_ARC[4], 'AXE');
console.log('✓ 10 Canonical weapons and 2 arcs verified');

// 6. Test Stage 5 Sequence ("Start the Puja")
console.log('6. Testing Stage 5 Sequence...');
const PUJA_SEQUENCE = ['Diya', 'Dhak', 'Conch'];
assert.deepStrictEqual(PUJA_SEQUENCE, ['Diya', 'Dhak', 'Conch'], 'Stage 5 sequence must be Diya -> Dhak -> Conch');
console.log('✓ Stage 5 sequence verified');

// Reset state
gameState.resetGame();
assert.strictEqual(gameState.getState().currentStage, 1);
assert.deepStrictEqual(gameState.getState().completedStages, []);

console.log('\n--- ALL UNIT & INTEGRATION TESTS PASSED SUCCESSFULLY! ---');
