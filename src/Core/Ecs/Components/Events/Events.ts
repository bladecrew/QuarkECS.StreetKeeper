import {component} from "../../../../Libs/quark-ecs/Types";

export interface IEvent
{
}

export const DamagedEvent = component<IEvent>("DamagedEvent");