import {EcsEngine} from "../../Libs/quark-ecs/EcsEngine";
import {Entity} from "../../Libs/quark-ecs/Entity";
import {Component} from "../../Libs/quark-ecs/Types";

export const callEvent = (engine: EcsEngine, event: Component<any>) =>
{
  let entity = new Entity();
  entity.set(event, {});
  engine.addEntity(entity);
};