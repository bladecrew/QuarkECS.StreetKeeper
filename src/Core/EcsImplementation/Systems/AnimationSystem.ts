import {EcsEngine, IUpdateSystem, query, Query} from "../../EcsDraft/Ecs";
import {DrawComponent} from "../Components/DrawComponent";
import {GameRuntimeData} from "../Data/GameRuntimeData";

export class AnimationSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let delta = engine.getData(GameRuntimeData).deltaTime;
    
    for (let [entity, drawComponent] of query(engine).get(DrawComponent))
      drawComponent.animator.update(delta);
  }
}