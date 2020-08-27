import {SpriteSheet} from "../View/SpriteSheet";
import {Animator} from "../View/Animator";
import {IController} from "./IController";

export abstract class GameObject
{
  protected readonly position = {x: 0, y: 0};
  protected readonly controllers: IController[] = [];
  
  protected constructor
  (
    protected readonly sheet: SpriteSheet,
    protected readonly animator: Animator
  )
  {
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
  
  public update(deltaTime: number): void
  {
    this.animator.update(deltaTime);
    this.controllers.forEach(c => c.update(deltaTime, this.position, this.sheet, this.animator));
    this.onUpdate(deltaTime);
  }
  
  public addController(controller: IController): void
  {
    this.controllers.push(controller);
  }
  
  //region Api
  
  protected onUpdate(dt: number): void {}
  
  //endregion
}