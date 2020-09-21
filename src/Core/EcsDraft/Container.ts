export class EcsContainer
{
  private static readonly _entities: Entity[] = [];
  private static readonly _systems: ISystem[] = [];
  
  constructor() {}
  
  public static update(dt: number): void
  {
    this._systems.forEach(x => x.update());
  }
  
  public static addSystem(system: ISystem): void
  {
    this._systems.push(system);
  }
  
  public static removeSystem<T extends ISystem>(): void
  {
    let system = this._systems.find(x => (x as T) != null);
    if (system == null)
      return;
    
    let index = this._systems.indexOf(system);
    this._systems.slice(index, 1);
  }
  
  public static addEntity(entity: Entity): void
  {
    this._entities.push(entity);
  }
  
  public static removeEntity(entity: Entity)
  {
    let index = this._entities.indexOf(entity);
    this._entities.splice(index, 1);
  }
  
  public static entities<T extends IComponent>(): Entity[]
  {
    let entities: Entity[] = [];
    this._entities.forEach(x =>
    {
      if (x.hasComponent<T>())
        entities.push(x);
    });
    
    return entities;
  }
}

export class Entity
{
  private readonly _components: IComponent[] = [];
  
  public hasComponent<T>(): boolean
  {
    return this.component<T>() != undefined;
  }
  
  public addComponent<T extends IComponent>(component: T): void | IComponent
  {
    if (this.hasComponent<T>())
      return this.component<T>();
    
    this._components.push(component);
  }
  
  public removeComponent<T extends IComponent>(): void
  {
    let $component = this.component<T>();
    if ($component == null)
      return;
    
    let index = this._components.indexOf($component);
    this._components.slice(index, 1);
  }
  
  public component<T extends IComponent>(): T | undefined
  {
    let $component = this._components.find(x => (x as T) != null);
    if($component == null)
      return undefined;
      
    return $component as T;
  }
}

export interface IComponent
{
}

export interface ISystem
{
  update(): void;
}

export class Filter<T extends IComponent>
{
  constructor() {}
  
  public entities(): Entity[]
  {
    return EcsContainer.entities<T>();
  }
}  
