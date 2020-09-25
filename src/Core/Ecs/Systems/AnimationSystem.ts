import {DrawComponent} from "../Components/DrawComponent";
import {GameRuntimeData} from "../Data/GameRuntimeData";
import {IUpdateSystem} from "../../../Libs/quark-ecs/System";
import {EcsEngine} from "../../../Libs/quark-ecs/EcsEngine";
import {query} from "../../../Libs/quark-ecs/Query";

export class AnimationSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let delta = engine.getData(GameRuntimeData).deltaTime;
    
    for (let [drawComponent] of query(engine).get(DrawComponent))
      drawComponent.animator.update(delta);
  }
}