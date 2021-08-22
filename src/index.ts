import { Manager } from "./Manager";
import { TitleScene } from "./scenes/TitleScene";

Manager.initialize(640, 480, 0x000000)
Manager.changeScene(new TitleScene())
