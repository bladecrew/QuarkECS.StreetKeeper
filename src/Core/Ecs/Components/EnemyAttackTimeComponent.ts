import {component} from "../../../Libs/quark-ecs/Types";

export interface IEnemyAttackTimeComponent
{
  lastAttackTime: number;
}

export const EnemyAttackTimeComponent = component<IEnemyAttackTimeComponent>("EnemyAttackTimeComponent");