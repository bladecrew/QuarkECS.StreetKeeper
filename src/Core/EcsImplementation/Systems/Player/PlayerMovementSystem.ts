import {EcsEngine, IUpdateSystem, Query} from "../../../EcsDraft/Ecs";
import {GameRuntimeData} from "../../Data/GameRuntimeData";
import {AttackType, PlayerComponent} from "../../Components/PlayerComponent";
import {PositionComponent} from "../../Components/PositionComponent";
import {DrawComponent} from "../../Components/DrawComponent";

export class PlayerMovementSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let deltaTime = engine.getData(GameRuntimeData).deltaTime;
    new Query(engine).get(PlayerComponent, PositionComponent, DrawComponent).forEach(
      ([entity, playerComponent, positionComponent, drawComponent]) =>
      {
        if(love.keyboard.isDown("q"))
        {
          rotateToLeft();
          playerComponent.currentAttackType = AttackType.Simple;
        }
        
        if(love.keyboard.isDown("e"))
        {
          rotateToRight();
          playerComponent.currentAttackType = AttackType.Simple;
        }
        
        if(love.keyboard.isDown("d"))
        {
          rotateToRight();
          playerComponent.currentAttackType = AttackType.Extended;
        }
        
        if(love.keyboard.isDown("a"))
        {
          rotateToLeft();
          playerComponent.currentAttackType = AttackType.Extended;
        }
        
        if(love.keyboard.isDown("right"))
        {
          positionComponent.x += 100 * deltaTime;
          playerComponent.isWalking = true;
          rotateToRight();
        }
        else if(love.keyboard.isDown("left"))
        {
          positionComponent.x -= 100 * deltaTime;
          playerComponent.isWalking = true;
          rotateToLeft();
        }
        else
        {
          playerComponent.isWalking = false;
        }
        
        function rotateToLeft()
        {
          if(drawComponent.scaleX == 1 && playerComponent.currentAttackType == AttackType.Idle)
          {
            drawComponent.scaleX = -1;
            positionComponent.x += 70;
          }
        }
        
        function rotateToRight()
        {
          if(drawComponent.scaleX == -1 && playerComponent.currentAttackType == AttackType.Idle)
          {
            drawComponent.scaleX = 1;
            positionComponent.x -= 70;
          }
        }
      }
    );
  }
}