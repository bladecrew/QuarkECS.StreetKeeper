export class EcsEngine
{
  private readonly _entities: Entity[] = [];
  private readonly _updateSystems: IUpdateSystem[] = [];
  private readonly _initSystems: IInitSystem[] = [];
  private readonly _customData: Record<string, any> = {};
  
  constructor()
  {
  }
  
  public initialize(): void
  {
    this._initSystems.forEach(x => x.init(this));
  }
  
  public update(): void
  {
    this._updateSystems.forEach(x => x.update(this));
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
  
  public setData<T>(data: CustomData<T>, value: T): void
  {
    this._customData[data] = value;
  }
  
  public getData<T>(data: CustomData<T>): T
  {
    const value = this._customData[data];
    if (!value)
      throw new TypeError("Data doesnt found");
    
    return value;
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
  update(engine: EcsEngine): void;
}

export interface IInitSystem
{
  init(engine: EcsEngine): void;
}

export class Query
{
  private _engine: EcsEngine = new EcsEngine();
  
  public static byEngine(engine: EcsEngine): Query
  {
    let query = new Query();
    query._engine = engine;
    
    return query;
  }
  
  get<T1>(c1: Component<T1>): [Entity, T1][];
  get<T1, T2>(c1: Component<T1>, c2: Component<T2>): [Entity, T1, T2][];
  get<T1, T2, T3>(c1: Component<T1>, c2: Component<T2>, c3: Component<T3>): [Entity, T1, T2, T3][];
  get<T1, T2, T3, T4>(c1: Component<T1>, c2: Component<T2>, c3: Component<T3>, c4: Component<T4>): [Entity, T1, T2, T3, T4][];
  get<T1, T2, T3, T4>(c1: Component<T1>, c2?: Component<T2>, c3?: Component<T3>, c4?: Component<T4>): any
  {
    if (c2 != null && c3 != null && c4 != null)
    {
      let selector = (x: Entity) => x.has(c1) && x.has(c2) && x.has(c3) && x.has(c4);
      let entities = this._engine.entities(selector);
      
      let result: [Entity, T1, T2, T3, T4][] = [];
      entities.forEach(x => result.push([x, x.get(c1), x.get(c2), x.get(c3), x.get(c4)]));
      
      return result;
    }
    else if (c2 != null && c3 != null)
    {
      let selector = (x: Entity) => x.has(c1) && x.has(c2) && x.has(c3);
      let entities = this._engine.entities(selector);
      
      let result: [Entity, T1, T2, T3][] = [];
      entities.forEach(x => result.push([x, x.get(c1), x.get(c2), x.get(c3)]));
      
      return result;
    }
    else if (c2 != null)
    {
      let selector = (x: Entity) => x.has(c1) && x.has(c2);
      let entities = this._engine.entities(selector);
      
      let result: [Entity, T1, T2][] = [];
      entities.forEach(x => result.push([x, x.get(c1), x.get(c2)]));
      
      return result;
    }
    else
    {
      let selector = (x: Entity) => x.has(c1);
      let entities = this._engine.entities(selector);
      
      let result: [Entity, T1][] = [];
      entities.forEach(x => result.push([x, x.get(c1)]));
      
      return result;
    }
  }
}

export type Component<T> = string & { type: T }
export function component<T>(name: string): Component<T>
{
  return name as Component<T>;
}

export type CustomData<T> = string & { type: T }
export function customData<T>(name: string): CustomData<T>
{
  return name as CustomData<T>;
}
