import {customData} from "../../EcsDraft/Ecs";

export interface IGameRuntimeData
{
  deltaTime: number;
}

export const GameRuntimeData = customData<IGameRuntimeData>("GameRuntimeData");