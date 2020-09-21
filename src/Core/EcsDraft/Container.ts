export class EcsContainer
{
  public static instance: EcsContainer;
  
  private readonly _entities: Entity[] = [];
  private readonly _updateSystems: IUpdateSystem[] = [];
  private readonly _initSystems: IInitSystem[] = [];
  
  constructor()
  {
  }
  
  public initialize(): void
  {
    EcsContainer.instance = this;
    
    this._initSystems.forEach(x => x.init());
  }
  
  public update(dt: number): void
  {
    this._updateSystems.forEach(x => x.update());
  }
  
  public addSystem(system: IUpdateSystem | IInitSystem): void
  {
    if ("update" in system)
      this._updateSystems.push(system);
    else
      this._initSystems.push(system);
  }
  
  public removeSystem<T extends IUpdateSystem | IInitSystem>(): void
  {
    let updateSystem = this._updateSystems.find(x => (x as T) != null);
    let initSystem = this._initSystems.find(x => (x as T) != null);
    if (updateSystem != null)
    {
      let index = this._updateSystems.indexOf(updateSystem);
      this._updateSystems.slice(index, 1);
    }
    else if (initSystem != null)
    {
      let index = this._initSystems.indexOf(initSystem);
      this._initSystems.slice(index, 1);
    }
  }
  
  public addEntity(entity: Entity): void
  {
    this._entities.push(entity);
  }
  
  public removeEntity(entity: Entity)
  {
    let index = this._entities.indexOf(entity);
    this._entities.splice(index, 1);
  }
  
  public entities<T extends IComponent>(): Entity[]
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
    if ($component == null)
      return undefined;
    
    return $component as T;
  }
}

export interface IComponent
{
}

export interface IUpdateSystem
{
  update(): void;
}

export interface IInitSystem
{
  init(): void;
}

export class Filter<T extends IComponent>
{
  constructor() {}
  
  public entities(): Entity[]
  {
    return EcsContainer.instance.entities<T>();
  }
}  
