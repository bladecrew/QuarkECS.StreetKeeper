import {Animation} from "./Animation";

export class Animator
{
  private _animations: { [key: string]: Animation } = {};
  private _currentAnimation: Animation | null = null;
  
  public addAnimation(name: string, animation: Animation): Animator
  {
    this._animations[name] = animation;
    
    return this;
  }
  
  public removeAnimation(name: string): Animator
  {
    delete this._animations[name];
    
    return this;
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