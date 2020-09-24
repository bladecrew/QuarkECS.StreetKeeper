import {EcsEngine, Entity, IInitSystem, IUpdateSystem, Query} from "../../../EcsDraft/Ecs";
import {SpriteSheet} from "../../../View/SpriteSheet";
import {Animation} from "../../../View/Animation";
import {EnemyComponent, EnemyDirection} from "../../Components/EnemyComponent";
import {DrawComponent} from "../../Components/DrawComponent";
import {Animator} from "../../../View/Animator";
import {IPositionComponent, PositionComponent} from "../../Components/PositionComponent";

export class EnemySpawnSystem implements IUpdateSystem
{
  private readonly enemyEntities: EnemyEntities = new EnemyEntities();
  
  update(engine: EcsEngine)
  {
    let entities = new Query(engine).get(EnemyComponent);
    if (entities.length > 0)
      return;
    
    this.enemyEntities.entities().forEach(x => engine.addEntity(x));
  }
}

export enum EnemyType
{
  Kaban
}

export class EnemyEntities
{
  private _currentWave: number = 0;
  
  public entities(): Entity[]
  {
    this._currentWave++;
    
    if (this._currentWave == 1)
    {
      let k1 = kaban({x: -30, y: 180});
      let k2 = kaban({x: -60, y: 180});
      let k3 = kaban({x: 600, y: 180});
      let k4 = kaban({x: 660, y: 180});
      let k5 = kaban({x: 720, y: 180});
      
      return [k1, k2, k3, k4, k5];
    }
    
    return [];
  }
}

//region @Enemies

function kaban(position: IPositionComponent): Entity
{
  let kabanImage = love.graphics.newImage("res/images/monster.png");
  let kabanSheet = new SpriteSheet(kabanImage, 3, 5);
  let kabanMovementAnimation = new Animation(
    [
      kabanSheet.frame(1, 1),
      kabanSheet.frame(1, 2),
      kabanSheet.frame(1, 3),
      kabanSheet.frame(1, 4),
      kabanSheet.frame(2, 1),
      kabanSheet.frame(2, 2),
      kabanSheet.frame(2, 3),
      kabanSheet.frame(2, 4)
    ],
    10,
    true
  );
  
  let kabanAnimator = new Animator()
    .addAnimation("walk", kabanMovementAnimation);
  
  let entity = new Entity();
  entity.set(EnemyComponent, {
    direction: EnemyDirection.Left,
    damage: 10,
    health: 100,
    speed: 20,
    attackRange: 150
  });
  
  entity.set(PositionComponent, position);
  
  entity.set(DrawComponent, {
    image: kabanImage,
    spriteSheet: kabanSheet,
    animator: kabanAnimator,
    rotation: 0,
    scaleX: -1,
    scaleY: 1
  });
  
  kabanAnimator.play("walk");
  
  return entity;
}

// endregion