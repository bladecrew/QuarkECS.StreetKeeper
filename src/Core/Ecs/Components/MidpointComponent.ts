import {component} from "../../../Libs/quark-ecs/Types";

export interface IMidpointComponent
{
  x: number;
  y: number;
}

export const MidpointComponent = component<IMidpointComponent>("MidpointComponent");