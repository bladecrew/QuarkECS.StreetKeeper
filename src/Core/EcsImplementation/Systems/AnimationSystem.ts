import {EcsEngine, IUpdateSystem, Query} from "../../EcsDraft/Ecs";
import {DrawComponent} from "../Components/DrawComponent";
import {GameRuntimeData} from "../Data/GameRuntimeData";

export class AnimationSystem implements IUpdateSystem
{
  update(engine: EcsEngine): void
  {
    let delta = engine.getData(GameRuntimeData).deltaTime;
    
    Query.byEngine(engine).get(DrawComponent).forEach(
      ([entity, drawComponent]) => drawComponent.animator.update(delta)
    );
  }
}