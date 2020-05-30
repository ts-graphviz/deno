import * as path from "https://deno.land/std/path/mod.ts";
import { denolize } from "https://raw.githubusercontent.com/kamiazya/denolize/master/mod.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const repository = "git@github.com:ts-graphviz/ts-graphviz.git";
const repositorySrcDir = "src";
const outDir = ".";
const denolizedFilePath = `${outDir}/.denolized`;

const workDir = await Deno.makeTempDir({
  prefix: "tsgraphviz",
});
const rootDir = path.join(workDir, repositorySrcDir);

async function readDenolizedFiles() {
  const files = await Deno.readFile(denolizedFilePath).then((buf) =>
    decoder.decode(buf).split("\n")
  );
  return files;
}

async function writeDenolizedFiles(files: string[]) {
  await Deno.writeFile(denolizedFilePath, encoder.encode(files.join("\n")));
}

try {
  const denolizedFiles = await readDenolizedFiles();
  for (const denolizedFile of denolizedFiles) {
    const info = await Deno.stat(denolizedFile);
    if (info.isFile) {
      await Deno.remove(denolizedFile);
    }
  }

  console.log("Clone start ts-graphviz/ts-graphviz");
  const ps = Deno.run({
    cmd: ["git", "clone", repository, workDir],
  });
  const status = await ps.status();
  if (status.success) {
    console.log("Clone Succeeded!");
    const files = [];
    for await (const source of denolize(rootDir)) {
      const outputPath = path.join(
        outDir,
        path.relative(rootDir, source.fileName),
      );
      await Deno.mkdir(path.dirname(outputPath), { recursive: true });
      await Deno.writeFile(outputPath, encoder.encode(source.text));

      const resolvedOutputPath = path.relative(outDir, outputPath);
      files.push(resolvedOutputPath);
      console.log(`WRITE ${resolvedOutputPath}`);
    }
    await writeDenolizedFiles(files);
  }
} finally {
  await Deno.remove(workDir, { recursive: true });
}
