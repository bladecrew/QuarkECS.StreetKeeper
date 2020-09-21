import {IComponent} from "../../EcsDraft/Container";
import {SpriteSheet} from "../../View/SpriteSheet";
import {Animator} from "../../View/Animator";

export class DrawComponent implements IComponent
{
  constructor(
    public readonly image: Image,
    public readonly spriteSheet: SpriteSheet,
    public readonly animator: Animator
  )
  {}
}