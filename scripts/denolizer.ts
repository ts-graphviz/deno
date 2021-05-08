import * as path from "https://deno.land/std@0.67.0/path/mod.ts";
import * as log from "https://deno.land/std@0.67.0/log/mod.ts";
import {
  denolize,
  DenolizeOption,
} from "https://raw.githubusercontent.com/kamiazya/denolize/v0.0.8/mod.ts";

export class Denolizer {
  private encoder = new TextEncoder();
  private decoder = new TextDecoder();
  private logger = log.getLogger("Denolizer");
  private readonly outDir: string;
  private readonly workDir: string;
  private readonly repository: string;
  private readonly repositorySrcDir: string;

  constructor(options: {
    outDir: string;
    workDir: string;
    repository: string;
    repositorySrcDir: string;
  }) {
    this.outDir = options.outDir;
    this.workDir = options.workDir;
    this.repository = options.repository;
    this.repositorySrcDir = options.repositorySrcDir;
  }

  private get denolizedFilePath(): string {
    return `${this.outDir}/.denolized`;
  }

  private get rootDir(): string {
    return path.join(this.workDir, this.repositorySrcDir);
  }

  private async readDenolizedFiles(): Promise<string[]> {
    const info = await Deno.stat(this.denolizedFilePath);
    if (info.isFile) {
      const files = await Deno.readFile(this.denolizedFilePath).then((buf) =>
        this.decoder
          .decode(buf)
          .split("\n")
          .filter((v) => !!v)
      );
      return files;
    }
    return [];
  }

  private async writeDenolizedFiles(files: string[]) {
    await Deno.writeFile(
      this.denolizedFilePath,
      this.encoder.encode(files.join("\n")),
    );
  }
  private async clear() {
    const denolizedFiles = await this.readDenolizedFiles();
    for (const denolizedFile of denolizedFiles) {
      const file = `${this.outDir}/${denolizedFile}`;
      const info = await Deno.stat(file);
      if (info.isFile) {
        this.logger.info("remove", file);
        await Deno.remove(file);
      }
    }
  }

  public async cleanup() {
    await Deno.remove(this.workDir, { recursive: true });
  }

  private async pull(): Promise<boolean> {
    this.logger.info("Pull start", this.repository);
    const ps = Deno.run({
      cmd: ["git", "clone", this.repository, this.workDir],
    });
    const status = await ps.status();
    return status.success;
  }

  public async excute(options: DenolizeOption = {}) {
    try {
      await this.clear();
      if (await this.pull()) {
        console.log("Clone Succeeded!");
        const files: string[] = [];
        for await (const source of denolize(this.rootDir, options)) {
          const outputPath = path.join(
            this.outDir,
            path.relative(this.rootDir, source.fileName),
          );
          await Deno.mkdir(path.dirname(outputPath), { recursive: true });
          await Deno.writeFile(outputPath, this.encoder.encode(source.text));

          const resolvedOutputPath = path.relative(this.outDir, outputPath);
          files.push(resolvedOutputPath);
          console.log(`WRITE ${resolvedOutputPath}`);
          this.writeDenolizedFiles(files);
        }
      }
    } catch (err) {
      this.logger.error(err);
    }
  }
}
