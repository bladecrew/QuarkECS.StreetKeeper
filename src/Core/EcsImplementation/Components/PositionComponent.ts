import {component} from "../../EcsDraft/Ecs";

export interface IPositionComponent
{
  x: number;
  y: number;
}

export const PositionComponent = component<IPositionComponent>("PositionComponent");