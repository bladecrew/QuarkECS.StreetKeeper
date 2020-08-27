import {IController} from "../Core/ViewModel/IController";
import {SpriteSheet} from "../Core/View/SpriteSheet";
import {Animator} from "../Core/View/Animator";
import {Phys} from "../Core/Utils/Phys";
import {GameConsole} from "../Core/Tools/GameConsole";

export class PlayerMovementController implements IController
{
  private _isJumping = false;
  private _jumpAcceleration = 3;
  private _jumpTempAcceleration = 0;
  
  update(dt: number, position: { x: number; y: number }, sheet: SpriteSheet, animator: Animator): void
  {
    if (love.keyboard.isDown("left"))
      position.x -= 100 * dt;
    
    if (love.keyboard.isDown("right"))
      position.x += 100 * dt;
    
    if (love.keyboard.isDown("space"))
    {
      this._jumpTempAcceleration = this._jumpAcceleration;
      this._isJumping = true;
    }
    
    this.tryJump(dt, position);
  }
  
  private tryJump(dt: number, position: { x: number, y: number }): void
  {
    if (!this._isJumping)
      return;
    
    this._jumpTempAcceleration -= Phys.gravity * dt;
    
    if (this._jumpTempAcceleration < 0)
      this._isJumping = false;
    
    position.y -= this._jumpTempAcceleration;
    
    GameConsole.setValue("jump acceleration", this._jumpTempAcceleration);
  }
}