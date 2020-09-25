import {component} from "@h3xb0y/quark-ecs";

export interface IEnemyComponent
{
  direction: EnemyDirection;
  health: number;
  damage: number;
  speed: number;
  damageDealingRange: number;
  attackRange: number;
  attackPeriod: number; // seconds
}

export enum EnemyDirection
{
  Left,
  Right
}

export const EnemyComponent = component<IEnemyComponent>("EnemyComponent");