// @ts-ignore
package.path += ";node_modules/?/init.lua";
// @ts-ignore
package.path += ";src/Libs/quark-ecs/?.lua";

love.conf = t =>
{
  t.window.title = "Street Keeper!";
};
