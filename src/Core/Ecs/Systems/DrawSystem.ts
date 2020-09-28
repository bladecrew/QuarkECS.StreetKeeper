import {DrawComponent} from "../Components/DrawComponent";
import {PositionComponent} from "../Components/PositionComponent";
import {EcsEngine} from "../../../Libs/quark-ecs/EcsEngine";
import {query} from "../../../Libs/quark-ecs/Query";
import {IUpdateSystem} from "../../../Libs/quark-ecs/System";
import {MidpointComponent} from "../Components/MidpointComponent";

export class DrawSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    for (let [draw, position, entity] of query(engine).get(DrawComponent, PositionComponent))
    {
      love.graphics.draw(
        draw.spriteSheet.texture,
        draw.animator.currentAnimation()!.currentFrame(),
        position.x,
        position.y,
        draw.rotation,
        draw.scaleX,
        draw.scaleY
      );
      
      if(entity.has(MidpointComponent))
      {
        let midpoint = entity.get(MidpointComponent);
        love.graphics.circle("fill", midpoint.x, midpoint.y, 5);
      }
    }
  }
}