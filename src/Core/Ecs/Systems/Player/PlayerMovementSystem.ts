import {GameRuntimeData} from "../../Data/GameRuntimeData";
import {AttackType, IPlayerComponent, PlayerComponent} from "../../Components/PlayerComponent";
import {IPositionComponent, PositionComponent} from "../../Components/PositionComponent";
import {DrawComponent, IDraw} from "../../Components/DrawComponent";
import {query} from "../../../../Libs/quark-ecs/Query";
import {EcsEngine} from "../../../../Libs/quark-ecs/EcsEngine";
import {IUpdateSystem} from "../../../../Libs/quark-ecs/System";

export class PlayerMovementSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let deltaTime = engine.getData(GameRuntimeData).deltaTime;
    for (let [playerComponent, positionComponent, drawComponent] of query(engine).get(PlayerComponent, PositionComponent, DrawComponent))
    {
      if(playerComponent.currentAttackType == AttackType.Idle)
      {
        if (love.keyboard.isDown("q"))
        {
          this.rotateLeft(positionComponent, playerComponent, drawComponent);
          playerComponent.currentAttackType = AttackType.Simple;
          playerComponent.attackDirection = "left";
        }
  
        if (love.keyboard.isDown("e"))
        {
          this.rotateRight(positionComponent, playerComponent, drawComponent);
          playerComponent.currentAttackType = AttackType.Simple;
          playerComponent.attackDirection = "right";
        }
  
        if (love.keyboard.isDown("d"))
        {
          this.rotateRight(positionComponent, playerComponent, drawComponent);
          playerComponent.currentAttackType = AttackType.Extended;
          playerComponent.attackDirection = "right";
        }
  
        if (love.keyboard.isDown("a"))
        {
          this.rotateLeft(positionComponent, playerComponent, drawComponent);
          playerComponent.currentAttackType = AttackType.Extended;
          playerComponent.attackDirection = "left";
        }
      }
      
      if (love.keyboard.isDown("right"))
      {
        positionComponent.x += 100 * deltaTime;
        playerComponent.isWalking = true;
        this.rotateRight(positionComponent, playerComponent, drawComponent);
      }
      else if (love.keyboard.isDown("left"))
      {
        positionComponent.x -= 100 * deltaTime;
        playerComponent.isWalking = true;
        this.rotateLeft(positionComponent, playerComponent, drawComponent);
      }
      else
      {
        playerComponent.isWalking = false;
      }
    }
  }
  
  private rotateRight(position: IPositionComponent, player: IPlayerComponent, draw: IDraw): void
  {
    if (draw.scaleX == -1 && player.currentAttackType == AttackType.Idle)
    {
      draw.scaleX = 1;
      position.x -= 70;
    }
  };
  
  private rotateLeft(position: IPositionComponent, player: IPlayerComponent, draw: IDraw): void
  {
    if (draw.scaleX == 1 && player.currentAttackType == AttackType.Idle)
    {
      draw.scaleX = -1;
      position.x += 70;
    }
  };
}