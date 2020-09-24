import {component} from "../../EcsDraft/Ecs";

export interface IEnemyComponent
{
  direction: EnemyDirection;
  health: number;
  damage: number;
  speed: number;
}

export enum EnemyDirection
{
  Left,
  Right
}

export const EnemyComponent = component<IEnemyComponent>("EnemyComponent");