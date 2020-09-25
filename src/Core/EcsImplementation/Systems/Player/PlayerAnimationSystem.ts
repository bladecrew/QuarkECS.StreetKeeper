import {EcsEngine, IUpdateSystem, query, Query} from "../../../EcsDraft/Ecs";
import {AttackType, PlayerComponent} from "../../Components/PlayerComponent";
import {DrawComponent} from "../../Components/DrawComponent";

export class PlayerAnimationSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    for (let [player, draw] of query(engine).get(PlayerComponent, DrawComponent))
    {
      if (player.currentAttackType != AttackType.Idle)
      {
        let resetAttack = () => player.currentAttackType = AttackType.Idle;
        draw.animator.play(player.currentAttackType, resetAttack);
      }
      else if (player.isWalking)
      {
        draw.animator.play("walk");
      }
      else
      {
        draw.animator.play("idle");
      }
    }
  }
  
}