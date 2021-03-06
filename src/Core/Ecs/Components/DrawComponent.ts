import {SpriteSheet} from "../../View/SpriteSheet";
import {Animator} from "../../View/Animator";
import {component} from "../../../Libs/quark-ecs/Types";

export interface IDraw
{
  image: Image;
  spriteSheet: SpriteSheet;
  animator: Animator;
  rotation: number;
  scaleX: number;
  scaleY: number;
}

export const DrawComponent = component<IDraw>("DrawComponent");