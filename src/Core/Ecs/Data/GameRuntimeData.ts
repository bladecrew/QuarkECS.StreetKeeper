import {data} from "@h3xb0y/quark-ecs";

export interface IGameRuntimeData
{
  deltaTime: number;
}

export const GameRuntimeData = data<IGameRuntimeData>("GameRuntimeData");