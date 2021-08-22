import * as math from "mathjs";
import { Container, Graphics } from "pixi.js";
import { IScene, Manager } from "../Manager";

export class GameScene extends Container implements IScene {
  private cells: number[] | number[][] | math.Matrix;
  private cellSize: number;
  private graph: Graphics;
  private gridColor: number;
  private cellColor: number;
  private play: boolean;
  constructor() {
    super();
    this.cellSize = 10;
    this.gridColor = 0x444444;
    this.cellColor = 0x00ff00;
    this.play = true;
    this.graph = new Graphics();
    this.addChild(this.graph);
    this.initializeCells();
    this.drawGrid(this.graph);
  }
  private initializeCells(): void {
    this.cells = math.zeros(
      Manager.height / this.cellSize,
      Manager.width / this.cellSize
    );
    this.cells = math.map(this.cells, (value, index, matrix) =>
      Number(Math.random() > 0.7)
    );
  }
  private drawGrid(g: Graphics): void {
    g.clear();
    g.lineStyle(1, this.gridColor, 1);
    this.cells.forEach((value, index, matrix) => {
      g.drawRect(
        index[1] * this.cellSize,
        index[0] * this.cellSize,
        this.cellSize,
        this.cellSize
      );
      if (value > 0) {
        g.beginFill(this.cellColor);
        g.drawRect(
          index[1] * this.cellSize,
          index[0] * this.cellSize,
          this.cellSize,
          this.cellSize
        );
        g.endFill();
      }
    });
  }
  private updateCells(): void {
    this.cells = math.map(this.cells, (value, i, matrix) => {
      let ySlice = [i[0] - 1, i[0], i[0] + 1];
      let xSlice = [i[1] - 1, i[1], i[1] + 1];
      if (xSlice[0] < 0) {
        xSlice = xSlice.slice(1);
      }
      if (
        xSlice[xSlice.length - 1] >=
        math.subset(math.size(matrix), math.index(1))
      ) {
        xSlice = xSlice.slice(0, -1);
      }
      if (ySlice[0] < 0) {
        ySlice = ySlice.slice(1);
      }
      if (
        ySlice[ySlice.length - 1] >=
        math.subset(math.size(matrix), math.index(0))
      ) {
        ySlice = ySlice.slice(0, -1);
      }
      const neighbors =
        math.sum(math.subset(matrix, math.index(ySlice, xSlice))) - value;
      console.log(neighbors, value);
      if (neighbors === 3 || (neighbors === 2 && value === 1)) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  public update(framePassed: number): void {
    if (this.play) {
      this.updateCells();
      this.drawGrid(this.graph);
    }
  }
  public onKeyDown(e: KeyboardEvent): void {
    switch (e.code) {
      case "Enter":
        this.initializeCells();
        break;
      case "Space":
        this.play = !this.play;
        break;
    }
  }
}
