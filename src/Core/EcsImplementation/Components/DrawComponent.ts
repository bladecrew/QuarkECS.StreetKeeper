import {SpriteSheet} from "../../View/SpriteSheet";
import {Animator} from "../../View/Animator";
import {EcsComponent} from "../../EcsDraft/Ecs";

interface IDraw
{
  image: Image;
  spriteSheet: SpriteSheet;
  animator: Animator;
}

export const DrawComponent = EcsComponent<IDraw>("DrawComponent");