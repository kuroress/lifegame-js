import * as math from "mathjs";
import { Container, DisplayObject, Graphics } from "pixi.js";
import { IScene, Manager } from "../Manager";

export class GameScene extends Container implements IScene {
  private cells: number[] | number[][] | math.Matrix;
  private cellSize: number;
  constructor() {
    super();
    this.cellSize = 10;
    this.initializeCells();
    this.addChild(this.drawGrid(0x444444));
  }
  private initializeCells(): void {
    this.cells = math.zeros(
      Manager.height / this.cellSize,
      Manager.width / this.cellSize
		);
		this.cells = math.subset(this.cells, math.index(2, 1), 1)
  }
  private drawGrid(color): DisplayObject {
    const g = new Graphics();
    g.lineStyle(1, color, 1);
    this.cells.forEach((value, index, matrix) => {
      g.drawRect(
        index[1] * this.cellSize,
        index[0] * this.cellSize,
        this.cellSize,
        this.cellSize
      );
      if (value > 0) {
        g.beginFill(0xffffff);
        g.drawRect(
          index[1] * this.cellSize,
          index[0] * this.cellSize,
          this.cellSize,
          this.cellSize
        );
        g.endFill();
      }
    });
    return g;
  }
  public update(framePassed: number): void {}
  public onKeyDown(e: KeyboardEvent): void {}
}
