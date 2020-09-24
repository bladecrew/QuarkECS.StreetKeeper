import {EcsEngine, IUpdateSystem, Query} from "../../../EcsDraft/Ecs";
import {AttackType, PlayerComponent} from "../../Components/PlayerComponent";
import {PositionComponent} from "../../Components/PositionComponent";
import {EnemyComponent} from "../../Components/EnemyComponent";
import {GameConsole} from "../../../Tools/GameConsole";

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
        if(Math.abs(position.x - playerPosition.x) > enemy.damageDealingRange)
          return;
        
        if(playerPosition.x < position.x && player.attackDirection == "right")
          kill();
        
        if(playerPosition.x > position.x && player.attackDirection == "left")
          kill();
        
        function kill()
        {
          engine.removeEntity(entity);
          player.score++;
          GameConsole.setValue("Player score", player.score);
        }
      });
  }
}