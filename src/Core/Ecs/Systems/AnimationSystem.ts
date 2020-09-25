import {EcsEngine, IUpdateSystem, query, Query} from "@h3xb0y/quark-ecs";
import {DrawComponent} from "../Components/DrawComponent";
import {GameRuntimeData} from "../Data/GameRuntimeData";

export class AnimationSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let delta = engine.getData(GameRuntimeData).deltaTime;
    
    for (let [drawComponent] of query(engine).get(DrawComponent))
      drawComponent.animator.update(delta);
  }
}