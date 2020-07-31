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

const backgroundImage = love.graphics.newImage("res/images/background.png");

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
  
  const playerImage = love.graphics.newImage("res/images/idle.png");
  spriteSheet = new SpriteSheet(playerImage, 7, 7);
  
  animator.addAnimation(
    "idle",
    new Animation(
      [
        spriteSheet.frame(1, 1),
        spriteSheet.frame(1, 2),
        spriteSheet.frame(1, 3),
        spriteSheet.frame(1, 4),
        spriteSheet.frame(1, 5),
        spriteSheet.frame(1, 6),
        spriteSheet.frame(1, 5),
        spriteSheet.frame(1, 4),
        spriteSheet.frame(1, 3),
        spriteSheet.frame(1, 2),
        spriteSheet.frame(1, 1)
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
    love.event.quit();
  
  animator.update(dt);
};

love.draw = () =>
{
  love.graphics.scale(scale.x, scale.y);
  love.graphics.setColor(1, 1, 1, 1);
  
  love.graphics.draw(backgroundImage);
  
  love.graphics.draw(
    spriteSheet.texture,
    animator.currentAnimation()!.currentFrame(),
    114,
    190
  );
};
