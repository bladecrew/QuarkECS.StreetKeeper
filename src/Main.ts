import {Animator} from "./Core/View/Animator";
import {SpriteSheet} from "./Core/View/SpriteSheet";
import {Animation} from "./Core/View/Animation";
import {Player} from "./Scripts/Player";

let spriteSheet: SpriteSheet;

const GAME_WIDTH = 512;
const GAME_HEIGHT = 288;

let scale = {
  x: 1,
  y: 1,
};

const backgroundImage = love.graphics.newImage("res/images/background.png");

let player: Player;

love.load = () =>
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
  
  player = new Player();
};

love.update = dt =>
{
  if (love.keyboard.isDown("escape"))
    love.event.quit();
  
  player.update(dt);
};

love.draw = () =>
{
  love.graphics.scale(scale.x, scale.y);
  love.graphics.setColor(1, 1, 1, 1);
  
  love.graphics.draw(backgroundImage);
  
  player.draw();
};
