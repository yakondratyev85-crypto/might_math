export type SoundEvent = 'click' | 'correct' | 'wrong' | 'attack' | 'damage' | 'victory' | 'chest' | 'coin' | 'levelUp';

export type SoundSettings = {
  enabled: boolean;
  volume: number;
};

const frequencies: Record<SoundEvent, number[]> = {
  click: [420],
  correct: [660, 880],
  wrong: [220, 180],
  attack: [520, 760],
  damage: [180, 140],
  victory: [523, 659, 784],
  chest: [392, 523, 659],
  coin: [880, 988],
  levelUp: [523, 659, 784, 1046],
};

let audioContext: AudioContext | undefined;

const getAudioContext = () => {
  const AudioConstructor = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioConstructor) {
    return undefined;
  }
  audioContext = audioContext ?? new AudioConstructor();
  return audioContext;
};

export const playSound = (event: SoundEvent, settings: SoundSettings) => {
  if (!settings.enabled || settings.volume <= 0) {
    return;
  }
  const context = getAudioContext();
  if (!context) {
    return;
  }
  const volume = Math.min(1, Math.max(0, settings.volume / 100)) * 0.08;
  frequencies[event].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = event === 'wrong' || event === 'damage' ? 'triangle' : 'sine';
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    gain.connect(context.destination);
    const start = context.currentTime + index * 0.08;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
    oscillator.start(start);
    oscillator.stop(start + 0.14);
  });
};
