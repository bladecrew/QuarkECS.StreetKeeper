import {EcsEngine, Entity, IInitSystem} from "@h3xb0y/quark-ecs";
import {SpriteSheet} from "../../../View/SpriteSheet";
import {Animation} from "../../../View/Animation";
import {Animator} from "../../../View/Animator";
import {DrawComponent} from "../../Components/DrawComponent";
import {PositionComponent} from "../../Components/PositionComponent";
import {PlayerComponent} from "../../Components/PlayerComponent";

export class PlayerInitSystem implements IInitSystem
{
  init(engine: EcsEngine): void
  {
    let entity = new Entity();
    let playerImage = love.graphics.newImage("res/images/hero.png");
    
    let sheet = new SpriteSheet(playerImage, 14, 10);
    let idleAnimation = new Animation(
      [
        sheet.frame(1, 1),
        sheet.frame(1, 2),
        sheet.frame(1, 3),
        sheet.frame(1, 4),
      
      ],
      10,
      true
    );
    
    let attackAnimationSimple = new Animation(
      [
        sheet.frame(2, 1),
        sheet.frame(2, 2),
        sheet.frame(2, 3),
        sheet.frame(2, 4),
        sheet.frame(2, 5),
        sheet.frame(2, 6),
        sheet.frame(2, 7),
        sheet.frame(2, 8),
      ],
      15,
      true
    );
    
    let attackAnimationExtended = new Animation(
      [
        sheet.frame(11, 1),
        sheet.frame(11, 2),
        sheet.frame(11, 3),
        sheet.frame(11, 4),
        sheet.frame(11, 5),
        sheet.frame(11, 6),
        sheet.frame(11, 7),
      ],
      20,
      true
    );
    
    let walkAnimation = new Animation(
      [
        sheet.frame(1, 5),
        sheet.frame(1, 6),
        sheet.frame(1, 7),
        sheet.frame(1, 8),
      ],
      10,
      true
    );
    
    let animator = new Animator()
      .addAnimation("idle", idleAnimation)
      .addAnimation("simpleAttack", attackAnimationSimple)
      .addAnimation("extendedAttack", attackAnimationExtended)
      .addAnimation("walk", walkAnimation);
    
    animator.play("idle");
    
    entity.set(DrawComponent, {
      image: playerImage,
      spriteSheet: sheet,
      animator: animator,
      rotation: 0,
      scaleX: 1,
      scaleY: 1
    });
    entity.set(PositionComponent, {x: 114, y: 190});
    entity.set(PlayerComponent, {
      isWalking: false,
      currentAttackType: "idle",
      attackDirection: "left",
      score: 0,
      health: 3
    });
    
    engine.addEntity(entity);
  }
}