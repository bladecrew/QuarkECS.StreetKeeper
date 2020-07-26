export class SpriteSheet
{
  private readonly quads: Quad[][] = [];
  
  constructor(public readonly texture: Texture, rows: number, cols: number)
  {
    const [width, height] = texture.getDimensions();
    const quadWidth = width / cols;
    const quadHeight = height / rows;
    
    for (let row = 0; row < rows; ++row)
    {
      this.quads[row] = [];
      
      for (let col = 0; col < cols; ++col)
      {
        this.quads[row][col] = love.graphics.newQuad(
          (col - 1) * quadWidth,
          (row - 1) * quadHeight,
          quadWidth,
          quadHeight,
          width,
          height
        );
      }
    }
  }
  
  public frame(row: number, col: number): Quad
  {
    if (this.quads[row][col] == null)
      error(`frame at row(${row}) and col(${col}) not found`);
    
    return this.quads[row][col];
  }
}
