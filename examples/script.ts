import * as path from "https://deno.land/std/path/mod.ts";
import {
  digraph,
  renderDot,
} from "../mod.ts";

const g = digraph("G");

const subgraphA = g.createSubgraph("A");
const nodeA1 = subgraphA.createNode("A_node1");
const nodeA2 = subgraphA.createNode("A_node2");
subgraphA.createEdge([nodeA1, nodeA2]);

const subgraphB = g.createSubgraph("B");
const nodeB1 = subgraphB.createNode("B_node1");
const nodeB2 = subgraphB.createNode("B_node2");
subgraphA.createEdge([nodeB1, nodeB2]);

const node1 = g.createNode("node1");
const node2 = g.createNode("node2");
g.createEdge([node1, node2]);

const __dirname = new URL(".", import.meta.url).pathname;
await renderDot(g, path.resolve(__dirname, "./script.svg"), {
  format: "svg",
});
