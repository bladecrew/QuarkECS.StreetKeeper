import {Position} from "./Position";
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
  
  public draw(): void
  {
    love.graphics.draw(
      this.sheet.texture,
      this.animator.currentAnimation()!.currentFrame(),
      this.position.x,
      this.position.y
    );
  }
}