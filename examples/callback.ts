import { digraph, attribute, toDot } from "https://deno.land/x/graphviz/mod.ts";

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
    A.edge([Aa.port("a"), Ab, Ac, "E"], {
      [attribute.color]: "red",
    });
  });
});

const dot = toDot(G);

console.log(dot);
