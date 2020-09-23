import {EcsEngine, Entity, IInitSystem} from "../../../EcsDraft/Ecs";
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
      .addAnimation("idle", idleAnimation);
    
    animator.play("idle");
    
    entity.set(DrawComponent, {image: playerImage, spriteSheet: sheet, animator: animator});
    entity.set(PositionComponent, {x: 114, y: 150});
    entity.set(PlayerComponent, {
      isFalling: false,
      isJumping: false,
      jumpAcceleration: 0.5,
      jumpTempAcceleration: 0,
      fallAcceleration: 0.5,
      fallTempAcceleration: 0
    });
    
    engine.addEntity(entity);
  }
}