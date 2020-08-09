import {Position} from "./Position";
import {DrawObject} from "./DrawObject";
import {SpriteSheet} from "../Framework/SpriteSheet";
import {Animator} from "../Framework/Animator";

export abstract class GameObject
{
  protected readonly position: Position = new Position(0, 0);
  
  protected constructor
  (
    protected readonly sheet: SpriteSheet,
    protected readonly animator: Animator
  )
  {
    this.position = new Position(0, 0);
  }
  
  public update(deltaTime: number): void
  {
    this.animator.update(deltaTime);
  }
  
  public abstract drawObject(): DrawObject;
}