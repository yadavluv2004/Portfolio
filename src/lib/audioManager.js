class AudioManager {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.bassNode = null;
    this.padNode = null;
    this.intervals = [];
  }

  init() {
    if (this.ctx) return;
    // Create Audio Context
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  play() {
    this.init();
    if (this.isPlaying) return;
    
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isPlaying = true;
    const ctx = this.ctx;

    // --- SYNTH PAD (Atmospheric Background) ---
    const padGain = ctx.createGain();
    padGain.gain.setValueAtTime(0.08, ctx.currentTime);
    padGain.connect(ctx.destination);

    const padOsc1 = ctx.createOscillator();
    const padOsc2 = ctx.createOscillator();
    padOsc1.type = "sawtooth";
    padOsc2.type = "triangle";

    // Play Am7 pad (A220, C261, E329, G392)
    padOsc1.frequency.setValueAtTime(220, ctx.currentTime);
    padOsc2.frequency.setValueAtTime(329, ctx.currentTime);

    // Filter to make it soft and warm
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    padOsc1.connect(filter);
    padOsc2.connect(filter);
    filter.connect(padGain);

    padOsc1.start();
    padOsc2.start();

    this.padNode = { padOsc1, padOsc2, padGain };

    // --- SYNTH BASSLINE LOOP ---
    const bassGain = ctx.createGain();
    bassGain.gain.setValueAtTime(0.12, ctx.currentTime);
    bassGain.connect(ctx.destination);

    // Bass notes sequence (A1 = 55Hz, C2 = 65.4Hz, G1 = 49Hz, F1 = 43.6Hz)
    const sequence = [
      55.0, 55.0, 55.0, 55.0, // A
      65.4, 65.4, 65.4, 65.4, // C
      49.0, 49.0, 49.0, 49.0, // G
      43.6, 43.6, 43.6, 43.6  // F
    ];

    let beat = 0;
    const tempo = 110; // BPM
    const beatDuration = 60 / tempo / 2; // Eighth notes

    const playBassNote = (time, freq) => {
      const osc = ctx.createOscillator();
      const oscSub = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = "sawtooth";
      oscSub.type = "triangle";

      osc.frequency.setValueAtTime(freq, time);
      oscSub.frequency.setValueAtTime(freq / 2, time); // Sub-bass octave below

      // Lowpass filter for punchy bass
      const bassFilter = ctx.createBiquadFilter();
      bassFilter.type = "lowpass";
      bassFilter.frequency.setValueAtTime(280, time);

      // Envelope: fast attack, quick decay
      noteGain.gain.setValueAtTime(0, time);
      noteGain.gain.linearRampToValueAtTime(0.95, time + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.01, time + beatDuration - 0.02);

      osc.connect(bassFilter);
      oscSub.connect(bassFilter);
      bassFilter.connect(noteGain);
      noteGain.connect(bassGain);

      osc.start(time);
      oscSub.start(time);
      osc.stop(time + beatDuration);
      oscSub.stop(time + beatDuration);
    };

    // Scheduler loop
    let nextNoteTime = ctx.currentTime;
    const scheduleNextNotes = () => {
      while (nextNoteTime < ctx.currentTime + 0.15) {
        const freq = sequence[beat % sequence.length];
        playBassNote(nextNoteTime, freq);
        nextNoteTime += beatDuration;
        beat++;
      }
    };

    const timerId = setInterval(scheduleNextNotes, 100);
    this.intervals.push(timerId);
    this.bassNode = { bassGain };
  }

  stop() {
    this.isPlaying = false;
    // Clear loop intervals
    this.intervals.forEach(clearInterval);
    this.intervals = [];

    // Stop and disconnect nodes
    if (this.padNode) {
      try {
        this.padNode.padOsc1.stop();
        this.padNode.padOsc2.stop();
      } catch (e) {}
      this.padNode.padGain.disconnect();
      this.padNode = null;
    }

    if (this.bassNode) {
      this.bassNode.bassGain.disconnect();
      this.bassNode = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }
}

export const audioManager = new AudioManager();
export default audioManager;
