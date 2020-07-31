// @ts-ignore
package.path += ";node_modules/?/init.lua";
// @ts-ignore
package.path += ";node_modules/?/?.lua";
// @ts-ignore
package.path += ";node_modules/tiny-ecs/tiny.lua";

love.conf = t =>
{
  t.window.title = "TypeScript game!";
};
