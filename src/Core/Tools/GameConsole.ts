export class GameConsole
{
  private static _logsByKey: Map<string, any> = new Map<string, any>();
  
  public static setValue(key: string, value: any): void
  {
    this._logsByKey.set(key, value);
  }
  
  public static draw()
  {
    let log: string = "";
    this._logsByKey.forEach(
      (value, key) => log += key + " " + value.toString() + "\n"
    );
    
    love.graphics.setColor(255, 255, 255, 255);
    love.graphics.print(log, 10, 10);
  }
}