import {Animation} from "./Animation";

export class Animator
{
  private _animations: { [key: string]: Animation } = {};
  private _currentAnimation: Animation | null = null;
  
  public addAnimation(name: string, animation: Animation): void
  {
    this._animations[name] = animation;
  }
  
  public removeAnimation(name: string): void
  {
    delete this._animations[name];
  }
  
  public currentAnimation(): Animation | null
  {
    return this._currentAnimation;
  }
  
  public play(name: string): void
  {
    if (this._animations[name] == null)
    {
      error(`animation '${name}' not found`);
    }
    else
    {
      this._currentAnimation = this._animations[name];
      this._currentAnimation.play();
    }
  }
  
  public stop(): void
  {
    if (this._currentAnimation == null)
    {
      return;
    }
    
    this._currentAnimation.stop();
    this._currentAnimation = null;
  }
  
  public update(dt: number): void
  {
    if (this._currentAnimation != null)
    {
      this._currentAnimation.update(dt);
    }
  }
}