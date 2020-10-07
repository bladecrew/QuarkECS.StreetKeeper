import {AttackType, PlayerComponent} from "../../Components/PlayerComponent";
import {DrawComponent} from "../../Components/DrawComponent";
import {EcsEngine} from "../../../../Libs/quark-ecs/EcsEngine";
import {IUpdateSystem} from "../../../../Libs/quark-ecs/System";
import {query} from "../../../../Libs/quark-ecs/Query";
import {PlayerDamageComponent} from "../../Components/Events/Custom/PlayerDamageComponent";

export class PlayerAnimationSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    for (let [player, draw] of query(engine).get(PlayerComponent, DrawComponent))
    {
      if(player.health <= 0)
      {
        draw.animator.play('die');  
        return;
      }
      
      for (let [damageEvent, entity] of query(engine).get(PlayerDamageComponent))
      {
        let resetAttack = (): void => 
        {
          player.currentAttackType = AttackType.Idle;
          draw.animator.play("idle");
          entity.remove(PlayerDamageComponent);
        }
        
        draw.animator.play('damage', resetAttack);
        return;
      } 
      
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