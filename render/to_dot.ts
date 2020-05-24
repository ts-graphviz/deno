/* eslint-disable @typescript-eslint/no-use-before-define */
import { Renderer } from "./renderer.ts";
import { Dot } from "../types.ts";
export function toDot(object: Dot): string {
  const renderer = new Renderer();
  return renderer.render(object);
}
