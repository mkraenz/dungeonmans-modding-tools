import { jsToManyEntityDefs } from '@dungeonmans-mod-tools/js-to-entitydef';
import fs from 'node:fs';
import path from 'node:path';
import { FileSystem, isFile } from '../utils/filesystem.js';
import { traverseJson } from '../utils/helpers.js';
import { Logger } from '../utils/logger.js';

const dmansDirectoriesThatSupportJsonNatively = [
  'plotdata',
  'overworldgenerationdata',
];

const fileTypesCopiedAsIs = ['.txt', '.png', '.cs'];
const definitelyNotAUserPrefix = '!@#%%^&8';

type Options = {
  dryRun?: boolean;
  verbose?: boolean;
  /** if undefined or empty string, builds the code without any prefix stripping on strings. */
  refPrefix?: string;
};

/**
 * Command line script that receives a directory for scanning and an output directory
 * Scans the given directory including subdirectories for files.
 * If the script encounters a .txt file, copies it over to the output directory.
 * If the script encounters a .json file, it reads the json file, turns it into entityDef, and writes back the file to the output directory as .txt under the same sub-directory.
 * The only exception is when the .json file is inside the plotdata/ directory. In this case, it just straight copies the json file as-is to the output directory under the same sub-directory.
 *
 * Minor details:
 * If the output directory does not exist, creates it.
 */
export class ModBuilder {
  private errors = 0;
  private options: Options = {};
  private fs: FileSystem;

  constructor(
    private readonly srcDir: string,
    private readonly outDir: string,
    options: Options = {}
  ) {
    this.options = options;
    this.fs = new FileSystem({
      dryRun: options.dryRun,
      verbose: options.verbose || options.dryRun,
    });
  }

  private get dryRun() {
    return !!this.options.dryRun;
  }

  async run() {
    Logger.log('🔨 Building your Dungeonmans mod...');

    if (!this.fs.exists(this.srcDir)) {
      Logger.error(`ERROR: Source directory does not exist: ${this.srcDir}`);
      return;
    }
    if (!this.fs.exists(this.outDir)) await this.fs.makeDir(this.outDir);
    const dir = await fs.promises.opendir(this.srcDir);
    for await (const dirent of dir) {
      if (fileTypesCopiedAsIs.some((ext) => isFile(dirent, ext))) {
        await this.copyFileAsIs(dirent.name);
      }

      if (dirent.isDirectory()) {
        const subdir = await fs.promises.opendir(
          path.join(dirent.parentPath, dirent.name)
        );
        for await (const subdirent of subdir) {
          const dir = path.join(this.outDir, dirent.name);
          await this.fs.makeDir(dir);

          if (this.shouldCopyJsonAsIs(subdirent, dirent)) {
            await this.copyFileAsIs(dirent.name, subdirent.name);
          } else if (
            dmansDirectoriesThatSupportJsonNatively.includes(dirent.name) &&
            isFile(subdirent, '.json')
          ) {
            await this.copyNativeJsonFileToEntityDefJson(dirent, subdirent);
          } else if (isFile(subdirent, '.json')) {
            await this.copyJsonFileToEntityDefFile(dirent, subdirent);
          } else {
            const sourcePath = path.join(
              this.srcDir,
              dirent.name,
              subdirent.name
            );
            Logger.error(`ERROR unhandled input file type: ${sourcePath}`);
            this.errors++;
          }
        }
      }
    }
    if (this.errors) this.logCompletedWithErrors();
    else this.logCompletedSuccessfully();

    if (this.dryRun) Logger.warnDryRun();
  }

  private async copyNativeJsonFileToEntityDefJson(
    dirent: fs.Dirent,
    subdirent: fs.Dirent
  ) {
    const srcPath = path.join(this.srcDir, dirent.name, subdirent.name);
    const destPath = path.join(this.outDir, dirent.name, subdirent.name);
    try {
      const json = await this.fs.readJsonFile(srcPath);
      const prefix = this.options.refPrefix ?? definitelyNotAUserPrefix;
      traverseJson(json, (obj, key, val) => {
        // strip prefix from keys
        if (key.startsWith(prefix)) {
          obj[key] = key.replace(prefix, '');
        }
        // strip prefix from values
        if (typeof val === 'string' && val.startsWith(prefix)) {
          obj[key] = val.replace(prefix, '');
        }
      });
      const outputJson = json;
      await this.fs.writeFile(destPath, JSON.stringify(outputJson, null, 2));
    } catch (_error) {
      this.errors++;
      Logger.error(`ERROR: Failed to parse JSON file ${srcPath}`);
    }
  }

  private async copyFileAsIs(direntName: string, subdirentName = '.') {
    const srcPath = path.join(this.srcDir, direntName, subdirentName);
    const destPath = path.join(this.outDir, direntName, subdirentName);
    await this.fs.copyFile(srcPath, destPath);
  }

  private async copyJsonFileToEntityDefFile(
    dirent: fs.Dirent,
    subdirent: fs.Dirent
  ) {
    const srcPath = path.join(this.srcDir, dirent.name, subdirent.name);
    const filebasename = path.basename(subdirent.name, '.json');
    const destPath = path.join(this.outDir, dirent.name, `${filebasename}.txt`);
    try {
      const json = await this.fs.readJsonFile(srcPath);
      const entityDef = jsToManyEntityDefs(json, {
        stripPrefix: this.options.refPrefix,
      });
      await this.fs.writeFile(destPath, entityDef);
    } catch (_error) {
      this.errors++;
      Logger.error(`ERROR: Failed to parse JSON file ${srcPath}`);
    }
  }

  private shouldCopyJsonAsIs(subdirent: fs.Dirent, dirent: fs.Dirent) {
    return fileTypesCopiedAsIs.some((ext) => isFile(subdirent, ext));
  }

  private logCompletedSuccessfully() {
    Logger.success('✅ Build completed without errors.');
  }

  private logCompletedWithErrors() {
    Logger.error(
      `❌ Build completed with ${this.errors} errors. Please check the output above.`
    );
  }
}
