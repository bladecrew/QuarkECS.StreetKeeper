export class EcsEngine
{
  private readonly _entities: Entity[] = [];
  private readonly _updateSystems: IUpdateSystem[] = [];
  private readonly _initSystems: IInitSystem[] = [];
  private readonly _data: Record<string, any> = {};
  private readonly _services: Record<string, any> = {};
  private readonly _eventComponents: Component<any>[] = [];
  
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
    this._eventComponents.forEach(x => this._entities.forEach(y => y.remove(x)));
  }
  
  public addSystem(system: IUpdateSystem | IInitSystem): void
  {
    if ("update" in system)
      this._updateSystems.push(system);
    if("init" in system)
      
      this._initSystems.push(system);
  } 
  
  public registerEventComponent<T>(eventComponent: Component<T>): void
  {
    this._eventComponents.push(eventComponent);
  }
  
  public addEntity(entity: Entity): void
  {
    this._entities.push(entity);
  }
  
  public removeEntity(entity: Entity): void
  {
    let index = this._entities.indexOf(entity);
    if (index < 0)
      return;
    
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
  
  public setData<T>(data: Data<T>, value: T): void
  {
    this._data[data] = value;
  }
  
  public getData<T>(data: Data<T>): T
  {
    const value = this._data[data];
    if (!value)
      throw new TypeError("Data doesnt found");
    
    return value;
  }
  
  public getService<T>(service: Service<T>): T
  {
    const value = this._services[service];
    if (!value)
      throw new TypeError("Data doesnt found");
    
    return value;
  }
  
  public setService<T>(service: Service<T>, value: T): void
  {
    this._services[service] = value;
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
  constructor
  (
    private readonly _engine: EcsEngine
  )
  {}
  
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

export function query(engine:EcsEngine):Query
{
  return new Query(engine);
}

export type Component<T> = string & { type: T }

export function component<T>(name: string): Component<T>
{
  return name as Component<T>;
}

export type Data<T> = string & { type: T }

export function data<T>(name: string): Data<T>
{
  return name as Data<T>;
}

export type Service<T> = string & { type: T }

export function service<T>(name: string): Service<T>
{
  return name as Service<T>;
}
