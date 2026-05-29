import { createElement, getSvgIcon } from './utils.ts';
import { tracks } from '../data/tracks.ts';

export class AudioVisualizer {
  private breathList = document.getElementById('breathList');
  private allPlayStopBtn = this.breathList?.querySelectorAll('.playStop');
  private currentParentEl: HTMLElement | null = null;
  private currentEl: HTMLElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private currentAudio: HTMLAudioElement;
  private audioContext: AudioContext | null = null;
  private bufferLength: number = 0;
  private dataArray: Uint8Array<ArrayBuffer> | null = null;
  private audioSource: MediaElementAudioSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;

  constructor() {
    this.currentAudio = createElement<HTMLAudioElement>('audio');

    this.breathList?.addEventListener('click', (evt) => {
      if (!(evt.target instanceof Element)) return;
      if (!evt.target.closest('.playStop')) return;

      this.currentParentEl = evt.target.closest('.breath__item');
      if (!this.currentParentEl) return;

      this.currentEl = this.currentParentEl.querySelector('.playStop');
      const newSrc = this.getTrack(this.currentEl);

      if (this.currentAudio.src.includes(newSrc) && newSrc !== '') {
        // тот же трек
        if (this.isPlaying) {
          this.stop();
        } else {
          this.play();
        }
      } else {
        // другой трек
        this.currentAudio.removeEventListener('ended', this.onAudioEnded);
        this.currentAudio.pause(); // останавливаем старый
        this.currentAudio.src = ''; // очищаем src
        this.reset();
        this.currentAudio = createElement<HTMLAudioElement>('audio');
        this.currentAudio.src = newSrc;
        this.currentAudio.addEventListener('ended', this.onAudioEnded);
        this.audioSource = null;

        this.initAudio();
        this.initCanvas(this.currentParentEl);
        if (this.canvas) this.currentParentEl.prepend(this.canvas);
        this.play();
      }
    });
  }

  draw(x: number, y: number, barHeight: number, barWidth: number) {
    if (!this.canvas || !this.ctx) return;

    this.ctx.fillStyle = '#78c39d';
    this.ctx.fillRect(x, y, barWidth, barHeight);
  }

  render() {
    if (
      !this.isPlaying ||
      !this.canvas ||
      !this.ctx ||
      !this.analyser ||
      !this.dataArray
    )
      return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.analyser.getByteFrequencyData(this.dataArray);
    const gap = 8;
    const barWidth = this.canvas.width / this.bufferLength - gap;
    let x = 0;
    let y = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      const barHeight = this.dataArray[i];
      y = this.canvas.height / 2 - barHeight / 2;
      this.draw(x + gap, y, barHeight, barWidth);
      x += barWidth + gap;
    }
  }

  private onAudioEnded = () => this.reset();

  private getTrack(currentEl: HTMLElement | null): string {
    const currentAudioTitle = currentEl?.dataset.title;
    const currentAudioSrc = tracks.find(
      (track) => track.title === currentAudioTitle
    );
    return currentAudioSrc?.src || '';
  }

  private initCanvas(currentParentEl: HTMLElement) {
    this.canvas = createElement<HTMLCanvasElement>(
      'canvas',
      'breath__item-canvas'
    );
    this.ctx = this.canvas.getContext('2d')!;

    this.canvas.width = currentParentEl?.clientWidth;
    this.canvas.height = currentParentEl?.clientHeight;
  }

  private initAudio() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.connect(this.audioContext.destination);
      this.analyser.fftSize = 64;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(
        this.bufferLength
      ) as Uint8Array<ArrayBuffer>;
    }
    this.audioSource?.disconnect();
    this.audioSource = this.audioContext.createMediaElementSource(
      this.currentAudio
    );
    this.audioSource.connect(this.analyser!);
  }

  private play() {
    this.currentAudio.play();
    this.isPlaying = true;
    const stop = getSvgIcon('stop');
    stop.classList.add('breath__item-icon');
    this.currentEl!.innerHTML = '';
    this.currentEl!.append(stop);
  }

  private stop() {
    this.currentAudio.pause();
    this.currentAudio.currentTime = 0;
    this.isPlaying = false;

    const play = getSvgIcon('play');
    play.classList.add('breath__item-icon');

    this.currentEl!.innerHTML = '';
    this.currentEl!.append(play);
  }

  private reset() {
    this.isPlaying = false;
    this.allPlayStopBtn?.forEach((btn) => {
      const play = getSvgIcon('play');
      play.classList.add('breath__item-icon');
      btn.innerHTML = '';
      btn.append(play);
    });
    this.breathList?.querySelector('canvas')?.remove();
  }
}
