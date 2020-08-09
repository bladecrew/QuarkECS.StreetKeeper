import {Position} from "./Position";

export class DrawObject
{
  constructor
  (
    public readonly position: Position,
    public readonly texture: Texture,
    public readonly quad: Quad
  ) 
  {
    
  }
}