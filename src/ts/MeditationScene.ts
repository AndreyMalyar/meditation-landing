import { Character } from './Character.ts';
import { Circle } from './Circle.ts';

interface IDrawable {
  draw(ctx: CanvasRenderingContext2D): void;
  update(deltaTime: number): void;
}

export class MeditationScene {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  fps: number;
  timer: number;
  interval: number;
  character: Character;
  circleBg: Circle[];
  meditationObject: IDrawable[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.fps = 60;
    this.timer = 0;
    this.interval = 1000 / this.fps;

    this.character = new Character(this);
    this.circleBg = [];
    this.meditationObject = [];
  }
  render(ctx: CanvasRenderingContext2D, deltaTime: number) {
    if (this.timer > this.interval) {
      ctx.clearRect(0, 0, this.width, this.height);

      this.meditationObject = [...this.circleBg, this.character];

      this.meditationObject.forEach((object) => {
        object.draw(ctx);
        object.update(deltaTime);
      });

      this.timer = 0;
    }
    this.timer += deltaTime;
  }
  addCircle() {
    this.circleBg.push(new Circle(this));
  }
  init() {
    for (let i = 0; i < 8; i++) {
      this.addCircle();
    }
  }
}
