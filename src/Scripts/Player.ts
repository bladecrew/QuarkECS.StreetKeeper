import {GameObject} from "../Core/ViewModel/GameObject";
import {SpriteSheet} from "../Core/View/SpriteSheet";
import {Animator} from "../Core/View/Animator";
import {Animation} from "../Core/View/Animation";
import {Phys} from "../Core/Utils/Phys";
import {GameConsole} from "../Core/Tools/GameConsole";

export class Player extends GameObject
{
  // region Jumping
  
  private _isJumping: boolean;
  private readonly _jumpAcceleration: number;
  public _jumpTempAcceleration: number;
  
  //endregion
  
  constructor()
  {
    let playerImage = love.graphics.newImage("res/images/idle.png");
    let sheet = new SpriteSheet(playerImage, 7, 7);
    let idleAnimation = new Animation(
      [
        sheet.frame(1, 1),
        sheet.frame(1, 2),
        sheet.frame(1, 3),
        sheet.frame(1, 4),
        sheet.frame(1, 5),
        sheet.frame(1, 6),
        sheet.frame(1, 5),
        sheet.frame(1, 4),
        sheet.frame(1, 3),
        sheet.frame(1, 2),
        sheet.frame(1, 1)
      ],
      6,
      true
    );
    let animator = new Animator()
      .addAnimation(
        "idle", idleAnimation
      );
    
    animator.play("idle");
    
    super(sheet, animator);
    
    this.position.x = 114;
    this.position.y = 190;
    
    this._isJumping = false;
    this._jumpAcceleration = 3;
    this._jumpTempAcceleration = 0;
  }
  
  protected onUpdate(dt: number)
  {
    if(love.keyboard.isDown('left'))
      this.position.x -= 100 * dt;
    
    if(love.keyboard.isDown('right'))
      this.position.x += 100 * dt;
    
    if(love.keyboard.isDown('space'))
    {
      this._jumpTempAcceleration = this._jumpAcceleration;
      this._isJumping = true;
    }
    
    this.tryJump(dt);
  }
  
  private tryJump(dt: number): void
  {
    if(!this._isJumping)
      return;
  
    this._jumpTempAcceleration -= Phys.gravity * dt;
    
    if(this._jumpTempAcceleration < 0)
      this._isJumping = false;
    
    this.position.y -= this._jumpTempAcceleration;
    
    GameConsole.drawValue("_jumpTempAcceleration", this._jumpTempAcceleration);
  }
}