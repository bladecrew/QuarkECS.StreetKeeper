import {AttackType, IPlayerComponent, PlayerComponent} from "../../Components/PlayerComponent";
import {PositionComponent} from "../../Components/PositionComponent";
import {EnemyComponent} from "../../Components/EnemyComponent";
import {GameConsole} from "../../../Tools/GameConsole";
import {IUpdateSystem} from "../../../../Libs/quark-ecs/System";
import {EcsEngine} from "../../../../Libs/quark-ecs/EcsEngine";
import {Query} from "../../../../Libs/quark-ecs/Query";
import {Entity} from "../../../../Libs/quark-ecs/Entity";
import {MidpointComponent} from "../../Components/MidpointComponent";

export class PlayerAttackSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let query = new Query(engine);
    let [player, playerMidpoint] = query.get(PlayerComponent, MidpointComponent)[0];
    
    if (player.currentAttackType == AttackType.Idle)
      return;
    
    for (let [enemy, midpoint, entity] of query.get(EnemyComponent, MidpointComponent))
    {
      if (Math.abs(midpoint.x - playerMidpoint.x) > enemy.damageDealingRange)
        continue;
      
      if (playerMidpoint.x <= midpoint.x && player.attackDirection == "right")
        this.kill(engine, entity, player);
      
      if (playerMidpoint.x >= midpoint.x && player.attackDirection == "left")
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