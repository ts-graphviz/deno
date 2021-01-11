import * as path from "https://deno.land/std@0.67.0/path/mod.ts";
import { attribute, digraph, renderDot } from "../mod.ts";

const G = digraph("G", (g) => {
  const a = g.node("aa");
  const b = g.node("bb");
  const c = g.node("cc");
  g.edge([a, b, c], {
    [attribute.color]: "red",
  });
  g.subgraph("A", (A) => {
    const Aa = A.node("Aaa", {
      [attribute.color]: "pink",
    });

    const Ab = A.node("Abb", {
      [attribute.color]: "violet",
    });

    const Ac = A.node("Acc");
    A.edge([Aa.port({ compass: "c" }), Ab, Ac, "E"], {
      [attribute.color]: "red",
    });
  });
});

const __dirname = new URL(".", import.meta.url).pathname;
await renderDot(G, path.resolve(__dirname, "./callback.svg"), {
  format: "svg",
});
