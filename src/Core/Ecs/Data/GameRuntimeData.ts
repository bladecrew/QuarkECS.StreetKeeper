import {data} from "../../../Libs/quark-ecs/Types";

export interface IGameRuntimeData
{
  deltaTime: number;
}

export const GameRuntimeData = data<IGameRuntimeData>("GameRuntimeData");