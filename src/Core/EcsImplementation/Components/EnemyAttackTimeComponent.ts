import {component} from "../../EcsDraft/Ecs";
import {EnemyComponent} from "./EnemyComponent";

export interface IEnemyAttackTimeComponent
{
  lastAttackTime: number;
}

export const EnemyAttackTimeComponent = component<IEnemyAttackTimeComponent>("EnemyAttackTimeComponent");