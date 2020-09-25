import {component} from "@h3xb0y/quark-ecs";
import {EnemyComponent} from "./EnemyComponent";

export interface IEnemyAttackTimeComponent
{
  lastAttackTime: number;
}

export const EnemyAttackTimeComponent = component<IEnemyAttackTimeComponent>("EnemyAttackTimeComponent");