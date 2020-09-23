import {Query, IUpdateSystem, EcsEngine} from "../../EcsDraft/Ecs";
import {DrawComponent} from "../Components/DrawComponent";
import {PositionComponent} from "../Components/PositionComponent";

export class DrawSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    Query.byEngine(engine).get(DrawComponent, PositionComponent).forEach(
      ([entity, drawComponent, positionComponent]) =>
      {
        love.graphics.draw(
          drawComponent.spriteSheet.texture,
          drawComponent.animator.currentAnimation()!.currentFrame(),
          positionComponent.x,
          positionComponent.y
        );
      });
  }
}