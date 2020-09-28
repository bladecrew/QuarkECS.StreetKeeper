import {Component} from "./Types";

export class Entity
{
  private readonly _components: Record<string, any> = {};
  
  has(component: Component<any>): boolean
  {
    return this._components.hasOwnProperty(component);
  }
  
  set<T>(component: Component<T>, value: T): void
  {
    this._components[component] = value;
  }
  
  remove(component: Component<any>): void
  {
    delete this._components[component];
  }
  
  hasAnyComponent(): boolean
  {
    return Object.keys(this._components).length > 0;
  }
  
  get<T>(component: Component<T>): T
  {
    const value = this._components[component];
    if (!value)
      throw new TypeError("Component not found.");
    
    return value;
  }
}
