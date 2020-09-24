export class Animation
{
  private readonly _frameTime: number = 0;
  
  private _elapsed = 0;
  private _isPlaying = false;
  private _currentFrame = 1;
  private _onFinished: any;
  
  constructor(private _quads: Quad[], fps: number, private _isLoop = false)
  {
    this._frameTime = 1 / fps;
  }
  
  public update(dt: number)
  {
    if (this._frameTime <= 0 || !this._isPlaying)
      return;
    
    this._elapsed += dt;
    
    if (this._elapsed < this._frameTime)
      return;
    
    this._elapsed = 0;
    this._currentFrame += 1;
    
    if (this._currentFrame < this._quads.length)
      return;
    
    this._currentFrame = !this._isLoop
      ? this._quads.length - 1
      : 0;
    
    if (!this._isLoop)
      this.stop();
    
    if(this._onFinished != null)
      this._onFinished();
  }
  
  public currentFrame(): Quad
  {
    return this._quads[this._currentFrame];
  }
  
  public play(onFinished?: () => {})
  {
    this._onFinished = onFinished;
    this._isPlaying = true;
  }
  
  public stop()
  {
    this._isPlaying = false;
  }
  
  public restart()
  {
    this._isPlaying = true;
    this._currentFrame = 0;
    this._elapsed = 0;
  }
}
