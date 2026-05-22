import { MeditationScene } from './MeditationScene.ts';

export class Character {
  meditationScene: MeditationScene;
  width: number;
  height: number;
  x: number;
  y: number;
  scale: number;
  scaleDirection: number;
  characterImg: HTMLImageElement;
  ellepseBg: HTMLImageElement;

  constructor(meditationScene: MeditationScene) {
    this.meditationScene = meditationScene;
    this.width = this.meditationScene.width * 0.77;
    this.height = this.meditationScene.height * 0.88;
    this.x = this.meditationScene.width / 2 - this.width / 2;
    this.y = this.meditationScene.height * 0.06;
    this.scale = 1;
    this.scaleDirection = 0.00004; // скорость пульсации

    this.characterImg = document.getElementById(
      'characterImg'
    ) as HTMLImageElement;
    this.ellepseBg = document.getElementById(
      'characterEllepse'
    ) as HTMLImageElement;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.ellipse(
      this.x + this.width / 2,
      this.height + this.meditationScene.height * 0.09,
      this.width / 2 + this.meditationScene.width * 0.03,
      5,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.drawImage(
      this.ellepseBg,
      this.x - (this.width * this.scale - this.width) / 2,
      this.y + 20 - (this.height * this.scale - this.height) / 2,
      this.width * this.scale,
      (this.height - 60) * this.scale
    );
    ctx.drawImage(this.characterImg, this.x, this.y, this.width, this.height);
  }
  update(deltaTime: number): void {
    this.scale += this.scaleDirection * deltaTime;
    if (this.scale > 1.05 || this.scale < 0.95) {
      this.scaleDirection *= -1;
    }
  }
}
