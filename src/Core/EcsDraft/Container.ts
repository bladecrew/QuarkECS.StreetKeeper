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
  
  public update(): void
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
  
  public entities(selector: (x: Entity) => boolean): Entity[]
  {
    let entities: Entity[] = [];
    this._entities.forEach(x =>
    {
      if (selector(x))
        entities.push(x);
    });
    
    return entities;
  }
}

export class Entity
{
  private readonly _components: Record<string, any> = {};
  
  public has(component: Component<any>): boolean
  {
    return this._components.hasOwnProperty(component);
  }
  
  public set<T>(component: Component<T>, value: T): void
  {
    this._components[component] = value;
  }
  
  remove(component: Component<any>): void
  {
    delete this._components[component];
  }
  
  public get<T>(component: Component<T>): T
  {
    const value = this._components[component];
    if (!value)
      throw new TypeError("Component doesnt found");
    
    return value;
  }
}

export interface IUpdateSystem
{
  update(): void;
}

export interface IInitSystem
{
  init(): void;
}

export class Query
{
  static filteredEntities<T1>(c1: Component<T1>): [Entity, T1][];
  static filteredEntities<T1, T2>(c1: Component<T1>, c2: Component<T2>): [Entity, T1, T2][];
  static filteredEntities<T1, T2>(c1: Component<T1>, c2?: Component<T2>): [Entity, T1][] | [Entity, T1, T2][]
  {
    let selector = c2 != null
      ? (x: Entity) => x.has(c1) && x.has(c2)
      : (x: Entity) => x.has(c1);
    
    let entities = EcsContainer.instance.entities(selector);
    
    if (c2 != null)
    {
      let result: [Entity, T1, T2][] = [];
      entities.forEach(x => result.push([x, x.get(c1), x.get(c2)]));
      
      return result;
    }
    else
    {
      let result: [Entity, T1][] = [];
      entities.forEach(x => result.push([x, x.get(c1)]));
      
      return result;
    }
  }
}

export type Component<T> = string & { type: T }

export function EcsComponent<T>(name: string): Component<T>
{
  return name as Component<T>;
}
