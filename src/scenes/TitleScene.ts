import { Container, Text, TextStyle } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { GameScene } from "./GameScene";

export class TitleScene extends Container implements IScene {
  constructor() {
    super();

    const text = new Text(
      "Life Game",
      new TextStyle({ fontFamily: "uzura.ttf", fontSize: 60, fill: 0xffffff })
    );
    text.position.set(Manager.width / 2, Manager.height / 2);
    text.anchor.set(0.5);
    this.addChild(text);
  }
  public update(framePassed: number): void {
    Manager.changeScene(new GameScene());
  }
  public onKeyDown(e: KeyboardEvent): void {
    switch (e.code) {
      case "Enter":
        Manager.changeScene(new GameScene());
        break;
    }
  }
}
