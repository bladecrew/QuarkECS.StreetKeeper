import {AttackType, IPlayerComponent, PlayerComponent} from "../../Components/PlayerComponent";
import {PositionComponent} from "../../Components/PositionComponent";
import {EnemyComponent} from "../../Components/EnemyComponent";
import {GameConsole} from "../../../Tools/GameConsole";
import {IUpdateSystem} from "../../../../Libs/quark-ecs/System";
import {EcsEngine} from "../../../../Libs/quark-ecs/EcsEngine";
import {Query} from "../../../../Libs/quark-ecs/Query";
import {Entity} from "../../../../Libs/quark-ecs/Entity";

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
        this.kill(engine, entity, player);
      
      if (playerPosition.x > position.x && player.attackDirection == "left")
        this.kill(engine, entity, player);
    }
  }
  
  private kill(engine: EcsEngine, entity: Entity, player: IPlayerComponent): void
  {
    engine.removeEntity(entity);
    player.score++;
    GameConsole.setValue("Player score", player.score);
  };
}