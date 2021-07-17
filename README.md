[![tag](https://img.shields.io/github/tag/ts-graphviz/deno.svg)](https://github.com/ts-graphviz/deno)
![deno-ci](https://github.com/ts-graphviz/deno/workflows/deno-ci/badge.svg)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/graphviz/mod.ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![tag](https://img.shields.io/badge/deno->=1.0.0-green.svg)](https://github.com/denoland/deno)
[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/graphviz)

# graphviz

[Graphviz](https://graphviz.gitlab.io/) library for Deno🦕

> Runtime independent APIs and specifications are compatible with the
> [ts-graphviz](https://github.com/ts-graphviz/ts-graphviz) package.

## Usages

### Draw diagrams

`renderDot` function outputs the dot command execution result to the specified
path by supplying diagram object.

> `renderDot` function requires `allow-write`, `allow-run` permission, and
> [dot](https://graphviz.gitlab.io/) command.

```typescript
import * as path from "https://deno.land/std@0.67.0/path/mod.ts";
import {
  attribute,
  digraph,
  renderDot,
} from "https://deno.land/x/graphviz/mod.ts";

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
await renderDot(G, path.resolve(__dirname, "./example.svg"), {
  format: "svg",
});
```

### Parse DOT Language

The `https://deno.land/x/graphviz/perser/mod.ts` provide `parse` function that
parses a string written in dot language and convert it to a model.

The return value is a Graph or Digraph that inherits from RootCluster.

```typescript
import { parse } from "https://deno.land/x/graphviz/perser/mod.ts";

const G = parse(`
  digraph G {
    a -> b;
  }
`);
```

This is equivalent to the code below.

```typescript
import { digraph } from "https://deno.land/x/graphviz/mod.ts";

const G = digraph("G", (g) => {
  g.edge(["a", "b"]);
});
```

The `"https://deno.land/x/graphviz/mod.ts"` module also provides other features
such as handling AST.

> This module is a translation of
> [@ts-graphviz/parser](https://github.com/ts-graphviz/parser) to work with the
> Deno runtime.

> Please refer to the repository for details of the provided API.

## License

This software is released under the MIT License, see [LICENSE](./LICENSE).
