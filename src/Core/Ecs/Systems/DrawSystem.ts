import {DrawComponent} from "../Components/DrawComponent";
import {PositionComponent} from "../Components/PositionComponent";
import {EcsEngine} from "../../../Libs/quark-ecs/EcsEngine";
import {query} from "../../../Libs/quark-ecs/Query";
import {IUpdateSystem} from "../../../Libs/quark-ecs/System";

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