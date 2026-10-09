// Centralized Audio Manager for Agomoni
import { gameState } from '../state/gameState.js';

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.currentAudios = new Set();
    this.basePath = (import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : './';
    if (!this.basePath.endsWith('/')) {
      this.basePath += '/';
    }

    // Audio file paths relative to deployment base
    this.audioUrls = {
      mahalaya: `${this.basePath}assets/audio/mahalaya.mp3`,
      diya: `${this.basePath}assets/audio/diya.mp3`,
      dhak: `${this.basePath}assets/audio/dhak.mp3`,
      conch: `${this.basePath}assets/audio/conch.mp3`,
      finalReveal: `${this.basePath}assets/audio/chandi_mangal.mp3`
    };

    // Listen for state changes to mute/unmute active sounds
    gameState.subscribe(state => {
      this.handleMuteChange(state.muted);
    });
  }

  getAudioContext() {
    if (!this.audioContext && (typeof window !== 'undefined') && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => { });
    }
    return this.audioContext;
  }

  isMuted() {
    return gameState.getState().muted;
  }

  handleMuteChange(muted) {
    this.currentAudios.forEach(audio => {
      audio.muted = muted;
    });
  }

  async playSound(key, synthFallbackFn) {
    if (this.isMuted()) return null;

    const url = this.audioUrls[key];
    if (url) {
      try {
        const audio = new Audio(url);
        audio.muted = this.isMuted();
        this.currentAudios.add(audio);

        audio.onended = () => {
          this.currentAudios.delete(audio);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          return audio;
        }
      } catch (err) {
        // Legal audio asset not provided or network failure; continue gracefully without crashing
        console.info(`Audio file '${key}' not found or blocked. Playing graceful procedural audio fallback.`, err?.message || err);
      }
    }

    // Procedural synthesized fallback using Web Audio API
    if (synthFallbackFn) {
      try {
        synthFallbackFn(this.getAudioContext());
      } catch (synthErr) {
        console.warn('Audio fallback synthesis failed gracefully:', synthErr);
      }
    }
    return null;
  }

  playMahalaya() {
    return this.playSound('mahalaya', (ctx) => {
      if (!ctx) return;
      // Synthesize peaceful dawn tanpura / morning aura chord (D, A, D octave)
      const now = ctx.currentTime;
      const freqs = [146.83, 220.00, 293.66, 440.00];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 1.2 + idx * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.15);
        osc.stop(now + 6.0);
      });
    });
  }

  playDiya() {
    return this.playSound('diya', (ctx) => {
      if (!ctx) return;
      const now = ctx.currentTime;

      // --- Flame ignition: short filtered-noise whoosh ---
      const noiseLen = Math.floor(ctx.sampleRate * 0.5);
      const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      for (let i = 0; i < noiseLen; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuf;
      const nFilter = ctx.createBiquadFilter();
      const nGain = ctx.createGain();
      nFilter.type = 'bandpass';
      nFilter.Q.setValueAtTime(1.2, now);
      nFilter.frequency.setValueAtTime(400, now);
      nFilter.frequency.exponentialRampToValueAtTime(1800, now + 0.35);
      nGain.gain.setValueAtTime(0, now);
      nGain.gain.linearRampToValueAtTime(0.07, now + 0.08);
      nGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      noise.connect(nFilter);
      nFilter.connect(nGain);
      nGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.5);

      // --- Temple bell: inharmonic partials with long exponential decay ---
      const bellStart = now + 0.12;
      const baseFreq = 880; // A5
      const partials = [
        { ratio: 1.0, amp: 0.12, decay: 2.4 },
        { ratio: 2.0, amp: 0.07, decay: 1.8 },
        { ratio: 2.76, amp: 0.05, decay: 1.4 },
        { ratio: 5.4, amp: 0.03, decay: 0.9 },
        { ratio: 8.93, amp: 0.015, decay: 0.5 },
      ];
      partials.forEach(({ ratio, amp, decay }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * ratio, bellStart);
        g.gain.setValueAtTime(0, bellStart);
        g.gain.linearRampToValueAtTime(amp, bellStart + 0.01);       // sharp strike
        g.gain.exponentialRampToValueAtTime(0.0001, bellStart + decay);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(bellStart);
        osc.stop(bellStart + decay + 0.05);
      });
    });
  }

  playConch() {
    return this.playSound('conch', (ctx) => {
      if (!ctx) return;
      // Synthesize authentic sacred conch shell (Shankha) harmonic sweep
      const now = ctx.currentTime;
      const baseFreq = 415.3; // G#4
      const duration = 2.6;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(baseFreq * 2, now);
      filter.Q.setValueAtTime(3.5, now);

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      // Sacred pitch swell & breath envelope
      osc1.frequency.setValueAtTime(baseFreq * 0.96, now);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.5);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.01, now + 1.8);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.94, now + duration);

      osc2.frequency.setValueAtTime(baseFreq * 1.98, now);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2.01, now + duration);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.4);
      gain.gain.setValueAtTime(0.18, now + duration - 0.7);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    });
  }

  playDhak() {
    return this.playSound('dhak', (ctx) => {
      if (!ctx) return;
      // Synthesize rhythmic traditional Bengali Dhak pulse: "Dha-Kring, Dha-Kring, Dha!"
      const now = ctx.currentTime;
      const beats = [0, 0.22, 0.44, 0.65, 0.90, 1.15, 1.40];
      beats.forEach((timeOffset, i) => {
        const hitTime = now + timeOffset;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const isRim = (i % 2 === 1);

        osc.type = isRim ? 'square' : 'triangle';
        osc.frequency.setValueAtTime(isRim ? 380 : 160, hitTime);
        osc.frequency.exponentialRampToValueAtTime(isRim ? 220 : 80, hitTime + 0.12);

        gain.gain.setValueAtTime(0.25, hitTime);
        gain.gain.exponentialRampToValueAtTime(0.001, hitTime + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(hitTime);
        osc.stop(hitTime + 0.2);
      });
    });
  }

  playDhakReveal() {
    return this.playSound('finalReveal', (ctx) => {
      if (!ctx) return;
      // Grand celebratory Dhak crescendo & temple gong for Bodhan Maa Durga face reveal
      const now = ctx.currentTime;
      // Rapid rolling dhak strokes building to grand finale
      const rollOffsets = [
        0, 0.1, 0.2, 0.28, 0.36, 0.44, 0.52, 0.60, 0.68, 0.76,
        0.85, 0.95, 1.05, 1.15, 1.25, 1.4, 1.6, 1.8, 2.0, 2.3
      ];

      rollOffsets.forEach((offset, idx) => {
        const hitTime = now + offset;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const isHigh = idx % 2 === 1;

        osc.type = isHigh ? 'square' : 'triangle';
        const startFreq = isHigh ? 340 : 180;
        osc.frequency.setValueAtTime(startFreq, hitTime);
        osc.frequency.exponentialRampToValueAtTime(startFreq * 0.5, hitTime + 0.15);

        const volume = Math.min(0.35, 0.12 + (idx / rollOffsets.length) * 0.25);
        gain.gain.setValueAtTime(volume, hitTime);
        gain.gain.exponentialRampToValueAtTime(0.001, hitTime + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(hitTime);
        osc.stop(hitTime + 0.22);
      });

      // Majestic temple brass bell resonance at peak reveal (t=1.4s)
      const gongTime = now + 1.4;
      const gongFreqs = [523.25, 659.25, 783.99, 1046.5];
      gongFreqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, gongTime);
        gain.gain.setValueAtTime(0.12, gongTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, gongTime + 3.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(gongTime);
        osc.stop(gongTime + 3.8);
      });
    });
  }

  stopAll() {
    this.currentAudios.forEach(audio => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) { }
    });
    this.currentAudios.clear();
  }
}

export const audioManager = new AudioManager();
