import {EcsEngine, IUpdateSystem, query, Query} from "../../../EcsDraft/Ecs";
import {AttackType, PlayerComponent} from "../../Components/PlayerComponent";
import {DrawComponent} from "../../Components/DrawComponent";

export class PlayerAnimationSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    for (let [playerComponent, drawComponent] of query(engine).get(PlayerComponent, DrawComponent))
    {
      if (playerComponent.currentAttackType != AttackType.Idle)
      {
        let resetAttack = () => playerComponent.currentAttackType = AttackType.Idle;
        drawComponent.animator.play(playerComponent.currentAttackType, resetAttack);
      }
      else if (playerComponent.isWalking)
      {
        drawComponent.animator.play("walk");
      }
      else
      {
        drawComponent.animator.play("idle");
      }
    }
  }
  
}