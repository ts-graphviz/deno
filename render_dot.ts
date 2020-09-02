import { Dot } from "./types.ts";
import { toDot } from "./render/to_dot.ts";

/**
 * Run dot command and output result to the specified path.
 *
 * ```ts
 * import * as path from "https://deno.land/std@0.67.0/path/mod.ts";
 * import { digraph, attribute, renderDot } from "https://deno.land/x/graphviz/mod.ts";
 * const G = digraph("G", (g) => {
 *   const a = g.node("aa");
 *   const b = g.node("bb");
 *   const c = g.node("cc");
 *   g.edge([a, b, c], {
 *     [attribute.color]: "red",
 *   });
 *   g.subgraph("A", (A) => {
 *     const Aa = A.node("Aaa", {
 *       [attribute.color]: "pink",
 *     });
 *     const Ab = A.node("Abb", {
 *       [attribute.color]: "violet",
 *     });
 *     const Ac = A.node("Acc");
 *     A.edge([Aa.port({ compass: "c" }), Ab, Ac, "E"], {
 *       [attribute.color]: "red",
 *     });
 *   });
 * });
 * const __dirname = new URL(".", import.meta.url).pathname;
 * await renderDot(G, path.resolve(__dirname, "./callback.svg"), {
 *   format: "svg",
 * });
 * ```
 *
 * Requires `allow-write`, `allow-run` permission.
 */
export async function renderDot(
  dot: Dot,
  output: string,
  {
    format = "png",
    dotCommand = "dot",
  }: {
    format?: "png" | "svg" | "json" | "jpg" | "pdf" | "xdot";
    dotCommand?: string;
  } = {},
): Promise<void> {
  const input = typeof dot === "string" ? dot : toDot(dot);
  const encoder = new TextEncoder();
  const temp = await Deno.makeTempFile();
  await Deno.writeFile(temp, encoder.encode(input));
  const p = Deno.run({
    stdin: "null",
    stdout: "null",
    stderr: "piped",
    cmd: [dotCommand, `-T${format}`, "-o", output, temp],
  });
  const s = await p.status();
  if (!s.success) {
    const decoder = new TextDecoder();
    const message = decoder.decode(await p.stderrOutput());
    throw new Error(`renderDot Failed:\n${message}`);
  }
}
