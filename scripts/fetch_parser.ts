import { Denolizer } from "./denolizer.ts";

const denolizer = new Denolizer({
  outDir: "./parser",
  workDir: "./work",
  repository: "git@github.com:ts-graphviz/parser.git",
  repositorySrcDir: "src",
});

await denolizer
  .excute({
    imports: {
      "ts-graphviz": "../mod.ts",
      // "./dot.pegjs.ts": "./dot_pegjs.ts",
    },
  })
  .finally(() => denolizer.cleanup());
