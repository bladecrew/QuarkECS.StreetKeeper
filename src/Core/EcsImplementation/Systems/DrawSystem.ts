import {Query, IUpdateSystem, EcsEngine, query} from "../../EcsDraft/Ecs";
import {DrawComponent} from "../Components/DrawComponent";
import {PositionComponent} from "../Components/PositionComponent";

export class DrawSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    for (let [drawComponent, positionComponent] of query(engine).get(DrawComponent, PositionComponent))
    {
      love.graphics.draw(
        drawComponent.spriteSheet.texture,
        drawComponent.animator.currentAnimation()!.currentFrame(),
        positionComponent.x,
        positionComponent.y,
        drawComponent.rotation,
        drawComponent.scaleX,
        drawComponent.scaleY
      );
    }
  }
}