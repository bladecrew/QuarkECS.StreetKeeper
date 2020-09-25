import {component} from "../../../Libs/quark-ecs/Types";

export interface IPositionComponent
{
  x: number;
  y: number;
}

export const PositionComponent = component<IPositionComponent>("PositionComponent");