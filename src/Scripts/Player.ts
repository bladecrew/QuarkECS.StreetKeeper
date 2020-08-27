import {GameObject} from "../Core/ViewModel/GameObject";
import {SpriteSheet} from "../Core/View/SpriteSheet";
import {Animator} from "../Core/View/Animator";
import {Animation} from "../Core/View/Animation";

export class Player extends GameObject
{
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
  }
}