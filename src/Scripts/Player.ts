import {GameObject} from "../Core/ViewModel/GameObject";
import {SpriteSheet} from "../Core/Framework/SpriteSheet";
import {Animator} from "../Core/Framework/Animator";

export class Player extends GameObject
{
  constructor
  (
    sheet: SpriteSheet,
    animator: Animator
  ) 
  {
    super(sheet, animator);
    
    this.position.x = 114;
    this.position.y = 190;
  }
}