// Native Web Audio API Procedural Audio Generator for PulseFlow Studio

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isInitialized = false;
    
    // Active sound layers
    this.layers = {
      rain: { gain: null, node: null, vol: 0 },
      binaural: { gain: null, leftOsc: null, rightOsc: null, vol: 0 },
      waves: { gain: null, node: null, lfo: null, vol: 0 },
      campfire: { gain: null, node: null, vol: 0 },
      space: { gain: null, oscs: [], vol: 0 }
    };
  }

  init() {
    if (this.isInitialized) return;
    
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioCtx();
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
    
    this.isInitialized = true;
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMasterVolume(val) {
    if (!this.masterGain) return;
    this.masterGain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.05);
  }

  // --- 1. Rain Synthesizer ---
  startRain() {
    if (this.layers.rain.node) return;
    
    // Pink noise buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate rain acoustics
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(this.layers.rain.vol, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);

    whiteNoise.start();
    this.layers.rain.node = whiteNoise;
    this.layers.rain.gain = rainGain;
  }

  setRainVolume(vol) {
    this.init();
    this.resume();
    this.layers.rain.vol = vol;
    if (vol > 0 && !this.layers.rain.node) {
      this.startRain();
    }
    if (this.layers.rain.gain) {
      this.layers.rain.gain.gain.setTargetAtTime(vol * 0.8, this.ctx.currentTime, 0.1);
    }
  }

  // --- 2. 40Hz Gamma Binaural Beats (Focus Frequency) ---
  startBinaural() {
    if (this.layers.binaural.leftOsc) return;

    const merger = this.ctx.createChannelMerger(2);
    
    // Left channel: 200 Hz
    const leftOsc = this.ctx.createOscillator();
    leftOsc.type = 'sine';
    leftOsc.frequency.setValueAtTime(200, this.ctx.currentTime);

    // Right channel: 240 Hz (Difference = 40Hz Gamma Focus Frequency)
    const rightOsc = this.ctx.createOscillator();
    rightOsc.type = 'sine';
    rightOsc.frequency.setValueAtTime(240, this.ctx.currentTime);

    const binGain = this.ctx.createGain();
    binGain.gain.setValueAtTime(this.layers.binaural.vol, this.ctx.currentTime);

    leftOsc.connect(merger, 0, 0);
    rightOsc.connect(merger, 0, 1);
    merger.connect(binGain);
    binGain.connect(this.masterGain);

    leftOsc.start();
    rightOsc.start();

    this.layers.binaural.leftOsc = leftOsc;
    this.layers.binaural.rightOsc = rightOsc;
    this.layers.binaural.gain = binGain;
  }

  setBinauralVolume(vol) {
    this.init();
    this.resume();
    this.layers.binaural.vol = vol;
    if (vol > 0 && !this.layers.binaural.leftOsc) {
      this.startBinaural();
    }
    if (this.layers.binaural.gain) {
      this.layers.binaural.gain.gain.setTargetAtTime(vol * 0.4, this.ctx.currentTime, 0.1);
    }
  }

  // --- 3. Ocean Waves Synthesizer ---
  startWaves() {
    if (this.layers.waves.node) return;

    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    // LFO for wave modulation
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.12; // Wave cycle ~8 seconds
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 300;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const waveGain = this.ctx.createGain();
    waveGain.gain.setValueAtTime(this.layers.waves.vol, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(this.masterGain);

    noise.start();
    lfo.start();

    this.layers.waves.node = noise;
    this.layers.waves.lfo = lfo;
    this.layers.waves.gain = waveGain;
  }

  setWavesVolume(vol) {
    this.init();
    this.resume();
    this.layers.waves.vol = vol;
    if (vol > 0 && !this.layers.waves.node) {
      this.startWaves();
    }
    if (this.layers.waves.gain) {
      this.layers.waves.gain.gain.setTargetAtTime(vol * 0.7, this.ctx.currentTime, 0.1);
    }
  }

  // --- 4. Campfire Crackle ---
  startCampfire() {
    if (this.layers.campfire.node) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const isCrackle = Math.random() > 0.997;
      output[i] = isCrackle ? (Math.random() * 2 - 1) * 0.9 : (Math.random() * 0.05 - 0.025);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2500;
    filter.Q.value = 1.5;

    const fireGain = this.ctx.createGain();
    fireGain.gain.setValueAtTime(this.layers.campfire.vol, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(fireGain);
    fireGain.connect(this.masterGain);

    noise.start();

    this.layers.campfire.node = noise;
    this.layers.campfire.gain = fireGain;
  }

  setCampfireVolume(vol) {
    this.init();
    this.resume();
    this.layers.campfire.vol = vol;
    if (vol > 0 && !this.layers.campfire.node) {
      this.startCampfire();
    }
    if (this.layers.campfire.gain) {
      this.layers.campfire.gain.gain.setTargetAtTime(vol * 0.6, this.ctx.currentTime, 0.1);
    }
  }

  // --- 5. Space Ambient Drone ---
  startSpace() {
    if (this.layers.space.oscs.length > 0) return;

    const freqs = [110, 164.81, 220, 329.63]; // A minor 7th ambient chord
    const spaceGain = this.ctx.createGain();
    spaceGain.gain.setValueAtTime(this.layers.space.vol, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;

    const oscs = freqs.map((freq) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;

      const oscGain = this.ctx.createGain();
      oscGain.gain.value = 0.2;

      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      return osc;
    });

    filter.connect(spaceGain);
    spaceGain.connect(this.masterGain);

    this.layers.space.oscs = oscs;
    this.layers.space.gain = spaceGain;
  }

  setSpaceVolume(vol) {
    this.init();
    this.resume();
    this.layers.space.vol = vol;
    if (vol > 0 && this.layers.space.oscs.length === 0) {
      this.startSpace();
    }
    if (this.layers.space.gain) {
      this.layers.space.gain.gain.setTargetAtTime(vol * 0.5, this.ctx.currentTime, 0.1);
    }
  }

  // --- Notification Chime Bell ---
  playChime() {
    this.init();
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6

    chimeGain.gain.setValueAtTime(0.5, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    osc.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 2.5);
  }
}

export const audioEngine = new AudioEngine();
