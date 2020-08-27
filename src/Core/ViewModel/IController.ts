import {SpriteSheet} from "../View/SpriteSheet";
import {Animator} from "../View/Animator";

export interface IController
{
  update(
    dt: number,
    position: { x: number, y: number },
    sheet: SpriteSheet,
    animator: Animator
  ): void;
}