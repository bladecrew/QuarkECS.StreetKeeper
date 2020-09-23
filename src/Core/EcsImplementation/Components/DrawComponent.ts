import {SpriteSheet} from "../../View/SpriteSheet";
import {Animator} from "../../View/Animator";
import {component} from "../../EcsDraft/Ecs";

interface IDraw
{
  image: Image;
  spriteSheet: SpriteSheet;
  animator: Animator;
}

export const DrawComponent = component<IDraw>("DrawComponent");