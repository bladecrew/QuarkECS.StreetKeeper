import {GameRuntimeData} from "../../Data/GameRuntimeData";
import {AttackType, IPlayerComponent, PlayerComponent} from "../../Components/PlayerComponent";
import {IPositionComponent, PositionComponent} from "../../Components/PositionComponent";
import {DrawComponent, IDraw} from "../../Components/DrawComponent";
import {query} from "../../../../Libs/quark-ecs/Query";
import {EcsEngine} from "../../../../Libs/quark-ecs/EcsEngine";
import {IUpdateSystem} from "../../../../Libs/quark-ecs/System";
import {IMidpointComponent, MidpointComponent} from "../../Components/MidpointComponent";

export class PlayerMovementSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let deltaTime = engine.getData(GameRuntimeData).deltaTime;
    for (let [player, position, draw, midpoint] of query(engine).get(PlayerComponent, PositionComponent, DrawComponent, MidpointComponent))
    {
      if(player.currentAttackType == AttackType.Idle)
      {
        if (love.keyboard.isDown("q"))
        {
          this.rotateLeft(position, player, draw, midpoint);
          player.currentAttackType = AttackType.Simple;
          player.attackDirection = "left";
        }
  
        if (love.keyboard.isDown("e"))
        {
          this.rotateRight(position, player, draw, midpoint);
          player.currentAttackType = AttackType.Simple;
          player.attackDirection = "right";
        }
  
        if (love.keyboard.isDown("d"))
        {
          this.rotateRight(position, player, draw, midpoint);
          player.currentAttackType = AttackType.Extended;
          player.attackDirection = "right";
        }
  
        if (love.keyboard.isDown("a"))
        {
          this.rotateLeft(position, player, draw, midpoint);
          player.currentAttackType = AttackType.Extended;
          player.attackDirection = "left";
        }
      }
      
      if (love.keyboard.isDown("right"))
      {
        position.x += 100 * deltaTime;
        midpoint.x += 100 * deltaTime;
        player.isWalking = true;
        this.rotateRight(position, player, draw, midpoint);
      }
      else if (love.keyboard.isDown("left"))
      {
        position.x -= 100 * deltaTime;
        midpoint.x -= 100 * deltaTime;
        player.isWalking = true;
        this.rotateLeft(position, player, draw, midpoint);
      }
      else
      {
        player.isWalking = false;
      }
    }
  }
  
  private rotateRight(position: IPositionComponent, player: IPlayerComponent, draw: IDraw, midpoint: IMidpointComponent): void
  {
    if (draw.scaleX == -1 && player.currentAttackType == AttackType.Idle)
    {
      draw.scaleX = 1;
      position.x -= 70;
      let [x, y, width, height] = draw.animator.currentAnimation()!.currentFrame().getViewport();
      midpoint.x = position.x + width / 2;
    }
  };
  
  private rotateLeft(position: IPositionComponent, player: IPlayerComponent, draw: IDraw, midpoint: IMidpointComponent): void
  {
    if (draw.scaleX == 1 && player.currentAttackType == AttackType.Idle)
    {
      draw.scaleX = -1;
      position.x += 70;
      let [x, y, width, height] = draw.animator.currentAnimation()!.currentFrame().getViewport();
      midpoint.x = position.x - width / 2;
    }
  };
}