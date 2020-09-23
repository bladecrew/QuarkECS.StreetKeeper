import {Query, IUpdateSystem} from "../../EcsDraft/Container";
import {DrawComponent} from "../Components/DrawComponent";
import {PositionComponent} from "../Components/PositionComponent";

export class DrawSystem implements IUpdateSystem
{
  update(): void
  {
    Query.filteredEntities(DrawComponent, PositionComponent).forEach(
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