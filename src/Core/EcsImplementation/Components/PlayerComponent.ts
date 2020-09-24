import {component} from "../../EcsDraft/Ecs";

export interface IPlayerComponent
{
  currentAttackType:AttackType;
  isWalking: boolean;
}

export enum AttackType 
{
  Idle = 'idle',
  Simple = 'simpleAttack',
  Extended = 'extendedAttack',
  
}

export const PlayerComponent = component<IPlayerComponent>("PlayerComponent");