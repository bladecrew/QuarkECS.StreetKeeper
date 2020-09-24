import {EcsEngine, IUpdateSystem, Query} from "../../../EcsDraft/Ecs";
import {AttackType, PlayerComponent} from "../../Components/PlayerComponent";
import {DrawComponent} from "../../Components/DrawComponent";

export class PlayerAnimationSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    new Query(engine).get(PlayerComponent, DrawComponent).forEach(
      ([entity, playerComponent, drawComponent]) => 
      {
        if(playerComponent.currentAttackType != AttackType.Idle)
        {
          let resetAttack = () => playerComponent.currentAttackType = AttackType.Idle;
          drawComponent.animator.play(playerComponent.currentAttackType, resetAttack);
        }
        else if(playerComponent.isWalking)
        {
          drawComponent.animator.play("walk");
        }
        else
        {
          drawComponent.animator.play("idle");
        }
      }
    )
  }
  
}