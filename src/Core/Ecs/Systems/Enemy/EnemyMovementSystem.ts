import {EnemyComponent} from "../../Components/EnemyComponent";
import {PlayerComponent} from "../../Components/PlayerComponent";
import {IPositionComponent, PositionComponent} from "../../Components/PositionComponent";
import {DrawComponent, IDraw} from "../../Components/DrawComponent";
import {GameRuntimeData} from "../../Data/GameRuntimeData";
import {IUpdateSystem} from "../../../../Libs/quark-ecs/System";
import {EcsEngine} from "../../../../Libs/quark-ecs/EcsEngine";
import {query} from "../../../../Libs/quark-ecs/Query";
import {IMidpointComponent, MidpointComponent} from "../../Components/MidpointComponent";

export class EnemyMovementSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let delta = engine.getData(GameRuntimeData).deltaTime;
    let $query = query(engine);
    let [_, playerMidpoint] = $query.get(PlayerComponent, MidpointComponent)[0];
    
    for (let [enemy, position, draw, midpoint] of $query.get(EnemyComponent, PositionComponent, DrawComponent, MidpointComponent))
    {
      if (playerMidpoint.x > position.x)
      {
        this.lookRight(draw, position, midpoint);
        position.x += enemy.speed * delta;
        midpoint.x += enemy.speed * delta;
      }
      else
      {
        this.lookLeft(draw, position, midpoint);
        position.x -= enemy.speed * delta;
        midpoint.x -= enemy.speed * delta;
      }
    }
  }
  
  private lookRight(draw: IDraw, position: IPositionComponent, midpoint: IMidpointComponent)
  {
    if (draw.scaleX != -1)
      return;
    
    draw.scaleX = 1;
    position.x -= 70;
    let [x, y, width, height] = draw.animator.currentAnimation()!.currentFrame().getViewport();
    midpoint.x = position.x + width / 2;
  }
  
  private lookLeft(draw: IDraw, position: IPositionComponent, midpoint: IMidpointComponent)
  {
    if (draw.scaleX != 1)
      return;
    
    draw.scaleX = -1;
    position.x += 70;
    let [x, y, width, height] = draw.animator.currentAnimation()!.currentFrame().getViewport();
    midpoint.x = position.x - width / 2;
  }
}