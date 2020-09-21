import {IComponent} from "../../EcsDraft/Container";
import {SpriteSheet} from "../../View/SpriteSheet";
import {Animator} from "../../View/Animator";

export class DrawComponent implements IComponent
{
  public image: Image;
  public spriteSheet: SpriteSheet;
  public animator: Animator;
}