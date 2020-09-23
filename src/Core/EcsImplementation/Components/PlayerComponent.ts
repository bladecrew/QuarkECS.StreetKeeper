import {component} from "../../EcsDraft/Ecs";

export interface IPlayerComponent
{
  isJumping: boolean;
  jumpAcceleration: number;
  jumpTempAcceleration: number;
  
  isFalling: boolean;
  fallAcceleration: number;
  fallTempAcceleration: number;
}

export const PlayerComponent = component<IPlayerComponent>("PlayerComponent");