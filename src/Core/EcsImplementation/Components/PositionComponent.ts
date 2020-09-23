import {EcsComponent} from "../../EcsDraft/Ecs";

export interface IPositionComponent
{
  x: number;
  y: number;
}

export const PositionComponent = EcsComponent<IPositionComponent>("PositionComponent");