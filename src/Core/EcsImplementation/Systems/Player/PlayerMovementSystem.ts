import {EcsEngine, IUpdateSystem, query, Query} from "../../../EcsDraft/Ecs";
import {GameRuntimeData} from "../../Data/GameRuntimeData";
import {AttackType, IPlayerComponent, PlayerComponent} from "../../Components/PlayerComponent";
import {IPositionComponent, PositionComponent} from "../../Components/PositionComponent";
import {DrawComponent, IDraw} from "../../Components/DrawComponent";

export class PlayerMovementSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let deltaTime = engine.getData(GameRuntimeData).deltaTime;
    for (let [entity, playerComponent, positionComponent, drawComponent] of query(engine).get(PlayerComponent, PositionComponent, DrawComponent))
    {
      if (love.keyboard.isDown("q"))
      {
        rotateLeft(positionComponent, playerComponent, drawComponent);
        playerComponent.currentAttackType = AttackType.Simple;
        playerComponent.attackDirection = "left";
      }
      
      if (love.keyboard.isDown("e"))
      {
        rotateRight(positionComponent, playerComponent, drawComponent);
        playerComponent.currentAttackType = AttackType.Simple;
        playerComponent.attackDirection = "right";
      }
      
      if (love.keyboard.isDown("d"))
      {
        rotateRight(positionComponent, playerComponent, drawComponent);
        playerComponent.currentAttackType = AttackType.Extended;
        playerComponent.attackDirection = "right";
      }
      
      if (love.keyboard.isDown("a"))
      {
        rotateLeft(positionComponent, playerComponent, drawComponent);
        playerComponent.currentAttackType = AttackType.Extended;
        playerComponent.attackDirection = "left";
      }
      
      if (love.keyboard.isDown("right"))
      {
        positionComponent.x += 100 * deltaTime;
        playerComponent.isWalking = true;
        rotateRight(positionComponent, playerComponent, drawComponent);
      }
      else if (love.keyboard.isDown("left"))
      {
        positionComponent.x -= 100 * deltaTime;
        playerComponent.isWalking = true;
        rotateLeft(positionComponent, playerComponent, drawComponent);
      }
      else
      {
        playerComponent.isWalking = false;
      }
    }
  }
}

export const rotateRight = (position: IPositionComponent, player: IPlayerComponent, draw: IDraw) =>
{
  if (draw.scaleX == -1 && player.currentAttackType == AttackType.Idle)
  {
    draw.scaleX = 1;
    position.x -= 70;
  }
};

export const rotateLeft = (position: IPositionComponent, player: IPlayerComponent, draw: IDraw) =>
{
  if (draw.scaleX == 1 && player.currentAttackType == AttackType.Idle)
  {
    draw.scaleX = -1;
    position.x += 70;
  }
};