import {EnemyComponent} from "../../Components/EnemyComponent";
import {PlayerComponent} from "../../Components/PlayerComponent";
import {IPositionComponent, PositionComponent} from "../../Components/PositionComponent";
import {DrawComponent, IDraw} from "../../Components/DrawComponent";
import {GameRuntimeData} from "../../Data/GameRuntimeData";
import {EcsEngine, IUpdateSystem, query} from "@h3xb0y/quark-ecs";

export class EnemyMovementSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let delta = engine.getData(GameRuntimeData).deltaTime;
    let $query = query(engine);
    let [_, playerPosition] = $query.get(PlayerComponent, PositionComponent)[0];
    
    for (let [enemy, position, draw] of $query.get(EnemyComponent, PositionComponent, DrawComponent))
    {
      if (playerPosition.x > position.x)
      {
        this.lookRight(draw, position);
        position.x += enemy.speed * delta;
      }
      else
      {
        this.lookLeft(draw, position);
        position.x -= enemy.speed * delta;
      }
    }
  }
  
  private lookRight(draw: IDraw, position: IPositionComponent)
  {
    if (draw.scaleX != -1)
      return;
    
    draw.scaleX = 1;
    position.x -= 70;
    
  }
  
  private lookLeft(draw: IDraw, position: IPositionComponent)
  {
    if (draw.scaleX != 1)
      return;
    
    draw.scaleX = -1;
    position.x += 70;
  }
}