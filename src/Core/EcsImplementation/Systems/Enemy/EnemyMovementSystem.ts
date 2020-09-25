import {EcsEngine, IUpdateSystem, Query} from "../../../EcsDraft/Ecs";
import {EnemyComponent} from "../../Components/EnemyComponent";
import {PlayerComponent} from "../../Components/PlayerComponent";
import {PositionComponent} from "../../Components/PositionComponent";
import {DrawComponent} from "../../Components/DrawComponent";
import {GameRuntimeData} from "../../Data/GameRuntimeData";

export class EnemyMovementSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let delta = engine.getData(GameRuntimeData).deltaTime;
    let query = new Query(engine);
    let [player, playerPosition] = query.get(PlayerComponent, PositionComponent)[0];
    
    new Query(engine).get(EnemyComponent, PositionComponent, DrawComponent).forEach(
      ([enemy, position, draw]) =>
      {
        if (playerPosition.x > position.x)
        {
          lookRight();
          position.x += enemy.speed * delta;
        }
        else
        {
          lookLeft();
          position.x -= enemy.speed * delta;
        }
        
        function lookRight()
        {
          if (draw.scaleX != -1)
            return;
          
          draw.scaleX = 1;
          position.x -= 70;
          
        }
        
        function lookLeft()
        {
          if(draw.scaleX != 1)
            return;
          
          draw.scaleX = -1;
          position.x += 70;
        }
      }
    );
  }
  
}