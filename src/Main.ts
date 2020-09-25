import {GameConsole} from "./Core/Tools/GameConsole";
import {PlayerMovementSystem} from "./Core/Ecs/Systems/Player/PlayerMovementSystem";
import {DrawSystem} from "./Core/Ecs/Systems/DrawSystem";
import {PlayerInitSystem} from "./Core/Ecs/Systems/Init/PlayerInitSystem";
import {GameRuntimeData} from "./Core/Ecs/Data/GameRuntimeData";
import {AnimationSystem} from "./Core/Ecs/Systems/AnimationSystem";
import {PlayerAnimationSystem} from "./Core/Ecs/Systems/Player/PlayerAnimationSystem";
import {EnemySpawnSystem} from "./Core/Ecs/Systems/Enemy/EnemySpawnSystem";
import {EnemyMovementSystem} from "./Core/Ecs/Systems/Enemy/EnemyMovementSystem";
import {PlayerAttackSystem} from "./Core/Ecs/Systems/Player/PlayerAttackSystem";
import {EnemyAttackSystem} from "./Core/Ecs/Systems/Enemy/EnemyAttackSystem";
import {EcsEngine} from "./Libs/quark-ecs/EcsEngine";

const GAME_WIDTH = 512;
const GAME_HEIGHT = 288;

let scale = {
  x: 1,
  y: 1,
};

const backgroundImage = love.graphics.newImage("res/images/background1.png");

let engine = new EcsEngine();
engine.addSystem(new PlayerInitSystem());
engine.addSystem(new EnemySpawnSystem());
engine.addSystem(new EnemyMovementSystem());
engine.addSystem(new EnemyAttackSystem());
engine.addSystem(new PlayerAttackSystem());
engine.addSystem(new DrawSystem());
engine.addSystem(new AnimationSystem());
engine.addSystem(new PlayerMovementSystem());
engine.addSystem(new PlayerAnimationSystem());
engine.initialize();

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
};

love.update = dt =>
{
  if (love.keyboard.isDown("escape"))
    love.event.quit();
  
  engine.setData(GameRuntimeData, {deltaTime : dt});
};

love.draw = () =>
{
  love.graphics.scale(scale.x, scale.y);
  love.graphics.setColor(1, 1, 1, 1);
  love.graphics.draw(backgroundImage);
  
  engine.update();
  GameConsole.draw();
};