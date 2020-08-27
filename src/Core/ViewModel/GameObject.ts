import {Position} from "./Position";
import {SpriteSheet} from "../View/SpriteSheet";
import {Animator} from "../View/Animator";

export abstract class GameObject
{
  public readonly draw = (): void =>
    love.graphics.draw(
      this.sheet.texture,
      this.animator.currentAnimation()!.currentFrame(),
      this.position.x,
      this.position.y
    );
  
  protected readonly position: Position = new Position(0, 0);
  
  protected constructor
  (
    protected readonly sheet: SpriteSheet,
    protected readonly animator: Animator
  )
  {
  }
  
  public update(deltaTime: number): void
  {
    this.animator.update(deltaTime);
    this.onUpdate();
  }
  
  //region Api
  
  protected onUpdate(): void {}
  
  //endregion
}