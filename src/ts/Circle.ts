import { MeditationScene } from './MeditationScene.ts';

export class Circle {
  meditationScene: MeditationScene;
  radius: number;
  speed: number;
  x: number;
  y: number;
  spawnY: number;
  opacity: number;

  constructor(meditationScene: MeditationScene) {
    this.meditationScene = meditationScene;
    this.radius = Math.random() * 5 + 3;

    this.spawnY = this.meditationScene.height * 0.2;
    this.x =
      this.radius +
      Math.random() * (this.meditationScene.width - this.radius * 2);
    this.y =
      this.meditationScene.height - this.spawnY - Math.random() * this.spawnY;

    this.speed = Math.random() * 0.1 + 0.3;
    this.opacity = 1;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.fillStyle = '#1A7F72';
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  update(deltaTime: number): void {
    this.y -= this.speed * deltaTime * 0.05;

    if (this.y + this.radius < 0) {
      this.x =
        this.radius +
        Math.random() * (this.meditationScene.width - this.radius * 2);
      this.y =
        this.meditationScene.height - this.spawnY - Math.random() * this.spawnY;
      this.opacity = 1;
    }

    if (this.y < 60) {
      this.opacity = Math.max(0, this.y / 60);
    }
  }
}
