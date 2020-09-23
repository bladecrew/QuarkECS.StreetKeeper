import {SpriteSheet} from "../Core/View/SpriteSheet";
import {Animator} from "../Core/View/Animator";
import {Phys} from "../Core/Utils/Phys";
import {GameConsole} from "../Core/Tools/GameConsole";

export class PlayerMovementController 
{
  private _isJumping = false;
  private _jumpAcceleration = 5;
  private _jumpTempAcceleration = 0;
  
  private _isFalling = false;
  private _fallAcceleration = 0.5;
  private _fallTempAcceleration = 0;
  
  update(dt: number, position: { x: number; y: number }, sheet: SpriteSheet, animator: Animator): void
  {
    if (love.keyboard.isDown("left"))
      position.x -= 100 * dt;
    
    if (love.keyboard.isDown("right"))
      position.x += 100 * dt;
    
    if (love.keyboard.isDown("space") && !this._isJumping && !this._isFalling)
    {
      this._jumpTempAcceleration = this._jumpAcceleration;
      this._isJumping = true;
    }
    
    this.tryJump(dt, position);
    this.tryFall(dt, position);
  
    GameConsole.setValue("position", `x :${Math.round(position.x)}, y :${Math.round(position.y)}`);
  }
  
  private tryJump(dt: number, position: { x: number, y: number }): void
  {
    if (!this._isJumping)
      return;
    
    this._jumpTempAcceleration -= Phys.gravity * dt;
    
    if (this._jumpTempAcceleration < 0)
    {
      this._isJumping = false;
      this._isFalling = true;
      this._fallTempAcceleration = this._fallAcceleration;
    }
    
    position.y -= this._jumpTempAcceleration;
    
    GameConsole.setValue("jump acceleration", this._jumpTempAcceleration);
  }
  
  private tryFall(dt: number, position: { x: number, y: number }): void
  {
    if(!this._isFalling)
      return;
  
    this._fallTempAcceleration += Phys.gravity * dt;
  
    GameConsole.setValue("fall acceleration", this._fallTempAcceleration);
    
    position.y += this._fallTempAcceleration;
    
    if(position.y < 190)
      return;
    
    position.y = 190;
    this._isFalling = false;
  }
}