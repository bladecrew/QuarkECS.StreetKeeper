import {Filter, ISystem} from "../../EcsDraft/Container";
import {DrawComponent} from "../Components/DrawComponent";

export class PlayerDrawSystem implements ISystem
{
  private _filter: Filter<DrawComponent> = new Filter<DrawComponent>();
  
  update(): void
  {
    this._filter.entities().forEach(x =>
    {
      let component = x.component<DrawComponent>();
      if (component == undefined)
        return;
    });
  }
}