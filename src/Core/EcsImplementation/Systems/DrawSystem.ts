import {Query, IUpdateSystem, EcsContainer} from "../../EcsDraft/Container";
import {DrawComponent} from "../Components/DrawComponent";
import {PositionComponent} from "../Components/PositionComponent";

export class DrawSystem implements IUpdateSystem
{
  update(container: EcsContainer): void
  {
    Query.byContainer(container).get(DrawComponent, PositionComponent).forEach(
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