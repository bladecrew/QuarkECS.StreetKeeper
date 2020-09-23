import {EcsComponent} from "../../EcsDraft/Container";

export interface IPositionComponent
{
  x: number;
  y: number;
}

export const PositionComponent = EcsComponent<IPositionComponent>("PositionComponent");