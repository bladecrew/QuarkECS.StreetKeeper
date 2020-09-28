import {IUpdateSystem} from "../../../../Libs/quark-ecs/System";
import {EcsEngine} from "../../../../Libs/quark-ecs/EcsEngine";
import {query} from "../../../../Libs/quark-ecs/Query";
import {SpriteSheet} from "../../../View/SpriteSheet";
import {Animation} from "../../../View/Animation";
import {EnemyComponent, EnemyDirection} from "../../Components/EnemyComponent";
import {DrawComponent} from "../../Components/DrawComponent";
import {Animator} from "../../../View/Animator";
import {IPositionComponent, PositionComponent} from "../../Components/PositionComponent";
import {Entity} from "../../../../Libs/quark-ecs/Entity";
import {MidpointComponent} from "../../Components/MidpointComponent";

export class EnemySpawnSystem implements IUpdateSystem
{
  private readonly enemyEntities: EnemyEntities = new EnemyEntities();
  
  update(engine: EcsEngine)
  {
    if (query(engine).get(EnemyComponent).length > 0)
      return;
    
    this.enemyEntities.entities().forEach(x => engine.addEntity(x));
  }
}

export class EnemyEntities
{
  private _currentWave: number = 0;
  
  public entities(): Entity[]
  {
    if (this._currentWave++ == 1)
    {
      let k1 = godzilla({x: -30, y: 180});
      let k2 = godzilla({x: -60, y: 180});
      let k3 = godzilla({x: 600, y: 180});
      let k4 = godzilla({x: 660, y: 180});
      let k5 = godzilla({x: 720, y: 180});
      
      return [k1, k2, k3, k4, k5];
    }
    
    return [];
  }
}

//region @Enemies

function godzilla(position: IPositionComponent): Entity
{
  let godzillaImage = love.graphics.newImage("res/images/monster.png");
  let godzillaSheet = new SpriteSheet(godzillaImage, 3, 5);
  let godzillaMovementAnimation = new Animation(
    [
      godzillaSheet.frame(1, 1),
      godzillaSheet.frame(1, 2),
      godzillaSheet.frame(1, 3),
      godzillaSheet.frame(1, 4),
      godzillaSheet.frame(2, 1),
      godzillaSheet.frame(2, 2),
      godzillaSheet.frame(2, 3),
      godzillaSheet.frame(2, 4)
    ],
    10,
    true
  );
  
  let godzillaAnimator = new Animator()
    .addAnimation("walk", godzillaMovementAnimation);
  
  godzillaAnimator.play("walk");
  
  let entity = new Entity();
  entity.set(EnemyComponent, {
    direction: EnemyDirection.Left,
    damage: 10,
    health: 100,
    speed: 20,
    damageDealingRange: 100,
    attackRange: 50,
    attackPeriod: 1
  });
  
  entity.set(PositionComponent, position);
  
  let [x, y, width, height] = godzillaAnimator.currentAnimation()!.currentFrame().getViewport();
  entity.set(MidpointComponent, {x: position.x + width / 2, y: position.y});
  
  entity.set(DrawComponent, {
    image: godzillaImage,
    spriteSheet: godzillaSheet,
    animator: godzillaAnimator,
    rotation: 0,
    scaleX: 1,
    scaleY: 1
  });
  
  return entity;
}

// endregion