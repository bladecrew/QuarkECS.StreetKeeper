// @ts-ignore
package.path += ";node_modules/?/init.lua";
// @ts-ignore
package.path += ";node_modules/?/?.lua";

love.conf = t =>
{
  t.window.title = "Street Keeper.";
};
