import {component} from "../../../Libs/quark-ecs/Types";

export interface IPlayerComponent
{
  attackDirection: "left" | "right";
  currentAttackType:AttackType;
  isWalking: boolean;
  score: number;
  health: number;
}

export enum AttackType 
{
  Idle = 'idle',
  Simple = 'simpleAttack',
  Extended = 'extendedAttack',
  
}

export const PlayerComponent = component<IPlayerComponent>("PlayerComponent");