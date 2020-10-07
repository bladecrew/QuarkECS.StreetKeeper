import {PlayerComponent} from "../../Components/PlayerComponent";
import {EnemyComponent} from "../../Components/EnemyComponent";
import {EnemyAttackTimeComponent} from "../../Components/EnemyAttackTimeComponent";
import {GameRuntimeData} from "../../Data/GameRuntimeData";
import {GameConsole} from "../../../Tools/GameConsole";
import {IUpdateSystem} from "../../../../Libs/quark-ecs/System";
import {EcsEngine} from "../../../../Libs/quark-ecs/EcsEngine";
import {query} from "../../../../Libs/quark-ecs/Query";
import {Entity} from "../../../../Libs/quark-ecs/Entity";
import {PlayerDamageComponent} from "../../Components/Events/Custom/PlayerDamageComponent";
import {MidpointComponent} from "../../Components/MidpointComponent";

export class EnemyAttackSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let $query = query(engine);
    let deltaTime = engine.getData(GameRuntimeData).deltaTime;
    let [player, playerMidpoint] = $query.get(PlayerComponent, MidpointComponent)[0];
    
    for (let [enemy, midpoint, entity] of $query.get(EnemyComponent, MidpointComponent))
    {
      if (Math.abs(midpoint.x - playerMidpoint.x) > enemy.attackRange)
        continue;
      
      if (!entity.has(EnemyAttackTimeComponent))
        entity.set(EnemyAttackTimeComponent, {lastAttackTime: enemy.attackPeriod});
      
      let enemyAttackTime = entity.get(EnemyAttackTimeComponent);
      
      enemyAttackTime.lastAttackTime += deltaTime;
      if (enemyAttackTime.lastAttackTime < enemy.attackPeriod)
        continue;
      
      enemyAttackTime.lastAttackTime = 0;
      player.health--;
      GameConsole.setValue("PlayerHealth", player.health);
      
      let eventEntity = new Entity();
      eventEntity.set(PlayerDamageComponent, {});
      engine.addEntity(eventEntity);
    }
  }
}