import {Animator} from "./Core/Animator";
import {SpriteSheet} from "./Core/SpriteSheet";
import {Animation} from "./Core/Animation";

let spriteSheet: SpriteSheet;

const GAME_WIDTH = 512;
const GAME_HEIGHT = 288;

const animator = new Animator();

let scale = {
  x: 1,
  y: 1,
};

love.load = args =>
{
  const version = love.getVersion();
  print(
    `LOVE version: ${version[0]}.${version[1]}.${version[2]} - ${version[3]}`
  );
  
  love.window.setMode(GAME_WIDTH * 3, GAME_HEIGHT * 3, {
    vsync: true,
    fullscreen: false,
    minwidth: GAME_WIDTH,
    minheight: GAME_HEIGHT,
  });
  
  love.graphics.setBackgroundColor(0, 0, 0);
  love.graphics.setDefaultFilter("nearest", "nearest");
  
  scale.x = love.graphics.getWidth() / GAME_WIDTH;
  scale.y = love.graphics.getHeight() / GAME_HEIGHT;
  
  const [content, error] = love.filesystem.read("res/logs.txt");
  
  const playerImage = love.graphics.newImage("res/images/megaman.png");
  spriteSheet = new SpriteSheet(playerImage, 32, 32);
  
  animator.addAnimation(
    "idle",
    new Animation(
      [
        spriteSheet.getFrame(1, 5),
        spriteSheet.getFrame(1, 4),
        spriteSheet.getFrame(1, 5),
        spriteSheet.getFrame(1, 6),
      ],
      6,
      true
    )
  );
  
  animator.play("idle");
};

love.update = dt =>
{
  if (love.keyboard.isDown("escape"))
  {
    love.event.quit();
  }
  
  animator.update(dt);
};

love.draw = () =>
{
  love.graphics.scale(scale.x, scale.y);
  love.graphics.setColor(1, 1, 1, 1);
  
  love.graphics.draw(
    spriteSheet.texture,
    animator.getCurrentAnimation()!.getCurrentFrame(),
    228,
    100
  );
};
