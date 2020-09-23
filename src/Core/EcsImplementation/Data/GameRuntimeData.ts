import {data} from "../../EcsDraft/Ecs";

export interface IGameRuntimeData
{
  deltaTime: number;
}

export const GameRuntimeData = data<IGameRuntimeData>("GameRuntimeData");