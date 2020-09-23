import {EcsEngine, IUpdateSystem, Query} from "../../EcsDraft/Ecs";
import {GameRuntimeData} from "../Data/GameRuntimeData";
import {IPlayerComponent, PlayerComponent} from "../Components/PlayerComponent";
import {IPositionComponent, PositionComponent} from "../Components/PositionComponent";
import {Phys} from "../../Utils/Phys";
import {GameConsole} from "../../Tools/GameConsole";

export class PlayerMovementSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let deltaTime = engine.getData(GameRuntimeData).deltaTime;
    Query.byEngine(engine).get(PlayerComponent, PositionComponent).forEach(
      ([entity, playerComponent, positionComponent]) =>
      {
        if (love.keyboard.isDown("left"))
          positionComponent.x -= 100 * deltaTime;
        
        if (love.keyboard.isDown("right"))
          positionComponent.x += 100 * deltaTime;
        
        if (love.keyboard.isDown("space") && !playerComponent.isJumping && !playerComponent.isFalling)
        {
          playerComponent.jumpTempAcceleration = playerComponent.jumpAcceleration;
          playerComponent.isJumping = true;
        }
        
        tryJump(deltaTime, playerComponent, positionComponent);
        tryFall(deltaTime, playerComponent, positionComponent);
        
        GameConsole.setValue("position", `x :${Math.round(positionComponent.x)}, y :${Math.round(positionComponent.y)}`);
        
        function tryJump(dt: number, playerComponent: IPlayerComponent, positionComponent: IPositionComponent)
        {
          
          if (!playerComponent.isJumping)
            return;
          
          playerComponent.jumpTempAcceleration -= Phys.gravity * dt;
          
          if (playerComponent.jumpTempAcceleration < 0)
          {
            playerComponent.isJumping = false;
            playerComponent.isFalling = true;
            playerComponent.fallTempAcceleration = playerComponent.fallAcceleration;
          }
          
          positionComponent.y -= playerComponent.jumpTempAcceleration;
          
          GameConsole.setValue("jump acceleration", playerComponent.jumpTempAcceleration);
        }
        
        function tryFall(dt: number, playerComponent: IPlayerComponent, positionComponent: IPositionComponent)
        {
          if (!playerComponent.isFalling)
            return;
          
          playerComponent.fallTempAcceleration += Phys.gravity * dt;
          
          GameConsole.setValue("fall acceleration", playerComponent.fallTempAcceleration);
          
          positionComponent.y += playerComponent.fallTempAcceleration;
          
          if (positionComponent.y < 190)
            return;
          
          positionComponent.y = 190;
          playerComponent.isFalling = false;
        }
      }
    );
  }
}