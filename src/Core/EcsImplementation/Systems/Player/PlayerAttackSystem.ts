import {EcsEngine, IUpdateSystem, Query} from "../../../EcsDraft/Ecs";
import {AttackType, PlayerComponent} from "../../Components/PlayerComponent";
import {PositionComponent} from "../../Components/PositionComponent";
import {EnemyComponent} from "../../Components/EnemyComponent";

export class PlayerAttackSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let query = new Query(engine);
    let [_, player, playerPosition] = query.get(PlayerComponent, PositionComponent)[0];
    
    if (player.currentAttackType == AttackType.Idle)
      return;
    
    query.get(EnemyComponent, PositionComponent).forEach(
      ([entity, enemy, position]) =>
      {
        let isInRange = Math.abs(position.x - playerPosition.x) < enemy.attackRange;
        
        if(!isInRange)
          return;
        
        if(playerPosition.x < position.x && player.attackDirection == "right")
          kill();
        
        if(playerPosition.x > position.x && player.attackDirection == "left")
          kill();
        
        function kill()
        {
          engine.removeEntity(entity);
          player.score++;
        }
      });
  }
}