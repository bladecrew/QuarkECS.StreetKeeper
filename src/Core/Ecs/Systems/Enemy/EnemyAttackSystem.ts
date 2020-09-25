import {PlayerComponent} from "../../Components/PlayerComponent";
import {PositionComponent} from "../../Components/PositionComponent";
import {EnemyComponent} from "../../Components/EnemyComponent";
import {EnemyAttackTimeComponent} from "../../Components/EnemyAttackTimeComponent";
import {GameRuntimeData} from "../../Data/GameRuntimeData";
import {GameConsole} from "../../../Tools/GameConsole";
import {EcsEngine, IUpdateSystem, query} from "@h3xb0y/quark-ecs";

export class EnemyAttackSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let $query = query(engine);
    let deltaTime = engine.getData(GameRuntimeData).deltaTime;
    let [player, playerPosition] = $query.get(PlayerComponent, PositionComponent)[0];
    
    for (let [enemy, position, entity] of $query.get(EnemyComponent, PositionComponent))
    {
      if (Math.abs(position.x - playerPosition.x) > enemy.damageDealingRange)
        return;
      
      if (!entity.has(EnemyAttackTimeComponent))
      {
        entity.set(EnemyAttackTimeComponent, {lastAttackTime: 0});
        return;
      }
      
      let enemyAttackTime = entity.get(EnemyAttackTimeComponent);
      
      enemyAttackTime.lastAttackTime += deltaTime;
      if (enemyAttackTime.lastAttackTime < enemy.attackPeriod)
        return;
      
      enemyAttackTime.lastAttackTime = 0;
      player.health--;
      GameConsole.setValue("PlayerHealth", player.health);
    }
  }
}