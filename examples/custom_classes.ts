import {
  Digraph,
  Node,
  Edge,
  EdgeTarget,
  attribute,
  toDot,
} from "https://deno.land/x/graphviz/mod.ts";

class MyCustomDigraph extends Digraph {
  constructor() {
    super("G", {
      [attribute.label]: "This is Custom Digraph",
    });
  }
}

class MyCustomNode extends Node {
  constructor(id: number) {
    super(`node${id}`, {
      [attribute.label]: `This is Custom Node ${id}`,
    });
  }
}

class MyCustomEdge extends Edge {
  constructor(targets: ReadonlyArray<EdgeTarget>) {
    super(targets, {
      [attribute.label]: "This is Custom Edge",
    });
  }
}

const digraph = new MyCustomDigraph();
const node1 = new MyCustomNode(1);
const node2 = new MyCustomNode(2);
const edge = new MyCustomEdge([node1, node2]);

digraph.addNode(node1);
digraph.addNode(node2);
digraph.addEdge(edge);

const dot = toDot(digraph);
console.log(dot);
