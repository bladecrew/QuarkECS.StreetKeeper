import {EcsEngine, Entity, IUpdateSystem, query, Query} from "../../../EcsDraft/Ecs";
import {AttackType, IPlayerComponent, PlayerComponent} from "../../Components/PlayerComponent";
import {PositionComponent} from "../../Components/PositionComponent";
import {EnemyComponent} from "../../Components/EnemyComponent";
import {GameConsole} from "../../../Tools/GameConsole";

export class PlayerAttackSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let query = new Query(engine);
    let [player, playerPosition] = query.get(PlayerComponent, PositionComponent)[0];
    
    if (player.currentAttackType == AttackType.Idle)
      return;
    
    for (let [enemy, position, entity] of query.get(EnemyComponent, PositionComponent))
    {
      if (Math.abs(position.x - playerPosition.x) > enemy.damageDealingRange)
        continue;
      
      if (playerPosition.x < position.x && player.attackDirection == "right")
        kill(engine, entity, player);
      
      if (playerPosition.x > position.x && player.attackDirection == "left")
        kill(engine, entity, player);
    }
  }
}

const kill = (engine: EcsEngine, entity: Entity, player: IPlayerComponent) =>
{
  engine.removeEntity(entity);
  player.score++;
  GameConsole.setValue("Player score", player.score);
};