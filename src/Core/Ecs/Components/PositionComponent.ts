import {component} from "@h3xb0y/quark-ecs";

export interface IPositionComponent
{
  x: number;
  y: number;
}

export const PositionComponent = component<IPositionComponent>("PositionComponent");