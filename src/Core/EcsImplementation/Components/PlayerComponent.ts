import {component} from "../../EcsDraft/Ecs";

export interface IPlayerComponent
{
  attackDirection: "left" | "right";
  currentAttackType:AttackType;
  isWalking: boolean;
  score: number;
}

export enum AttackType 
{
  Idle = 'idle',
  Simple = 'simpleAttack',
  Extended = 'extendedAttack',
  
}

export const PlayerComponent = component<IPlayerComponent>("PlayerComponent");