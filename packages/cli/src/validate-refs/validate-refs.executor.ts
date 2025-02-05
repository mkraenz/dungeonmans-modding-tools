import fs from 'node:fs';
import path from 'node:path';
import { FileSystem, isFile } from '../utils/filesystem.js';
import { Logger } from '../utils/logger.js';
import { RefLocation } from '../utils/types.js';
import { EntityRegistry } from './EntityRegistry.js';
import { ReferenceRegistry } from './ReferenceRegistry.js';

type Options = {
  verbose?: boolean;
  prefix: string;
};

/**
 * Command line script that receives a directory for scanning and an output directory
 * Scans the given directory including subdirectories for files.
 * From all JSON files, it scans for string values that start with `options.prefix`.
 * All references are put into a collection for later analysis.
 */
export class ReferencesValidator {
  private errors = 0;
  private warnings = 0;
  private options: Options;
  private fs: FileSystem;
  private entityRegistry = new EntityRegistry();
  private refRegistry: ReferenceRegistry;

  constructor(private readonly srcDir: string, options: Options) {
    this.options = options;
    this.fs = new FileSystem({ verbose: options.verbose });
    this.refRegistry = new ReferenceRegistry(this.options.prefix);
  }

  async run() {
    Logger.log('🔨 Validating refs...');

    const dir = await fs.promises.opendir(this.srcDir);
    for await (const dirent of dir) {
      if (!dirent.isDirectory()) continue;
      const subdir = await fs.promises.opendir(
        path.join(dirent.parentPath, dirent.name)
      );
      for await (const subdirent of subdir) {
        if (isFile(subdirent, '.json')) {
          await this.scanFileForRefs(
            path.join(this.srcDir, dirent.name, subdirent.name)
          );
        }
      }
    }
    this.checkReferences();
    if (this.errors) this.logCompletedWithErrors();
    else if (this.warnings) this.logCompletedWithWarnings();
    else this.logCompletedSuccessfully();
  }

  private checkReferences() {
    const [foundRefs, missingRefs] = this.getFoundAndMissingRefs();

    if (this.options.verbose)
      Logger.log(
        `Found references: ${foundRefs.map((r) => r.refValue).join(',')}`
      );

    missingRefs.forEach((ref) => {
      this.warnings++;
      Logger.warn(
        `WARNING: Missing entity named "${ref.refValue}" in file "${ref.filepath}" with json path "${ref.jsonpath}". Is it inbuilt?`
      );
    });
  }

  private getFoundAndMissingRefs() {
    return this.refRegistry.values().reduce<[RefLocation[], RefLocation[]]>(
      ([found, missing], ref) => {
        if (this.entityRegistry.has(ref.refValue))
          return [[...found, ref], missing];
        return [found, [...missing, ref]];
      },
      [[], []]
    );
  }

  private async scanFileForRefs(filepath: string) {
    try {
      const json = await this.fs.readJsonFile(filepath);

      const entities = Object.entries(json)
        .filter(([key, _]) => key !== '$schema')
        .map(([key, entity]) => ({ name: key, entity }));
      entities.forEach(({ name, entity }) => {
        if (this.entityRegistry.has(name)) {
          this.warnDuplicateEntityName(name, filepath);
          this.warnings++;
          return;
        }
        this.entityRegistry.set(name, { filepath, entity, name });
      });
      this.refRegistry.setFromEntities(filepath, entities);
    } catch (error) {
      Logger.error(`ERROR: Failed to parse or process JSON file: ${filepath}`);
      this.errors++;
    }
  }

  private warnDuplicateEntityName(name: string, filepath: string) {
    Logger.warn(
      `WARNING: Duplicate entity name "${name}" found in "${filepath}" and "${
        this.entityRegistry.get(name)?.filepath
      }".`
    );
  }

  private logCompletedWithWarnings() {
    Logger.warn(
      `Found ${this.warnings} warnings. Please check the output above.`
    );
  }

  private logCompletedSuccessfully() {
    Logger.success('✅ Completed without errors.');
  }

  private logCompletedWithErrors() {
    const warningMsg =
      this.warnings === 0
        ? 'No warnings found.'
        : `Also found ${this.warnings} warnings. Please check the output above.`;
    Logger.error(
      `❌ Completed with ${this.errors} errors. Please check the output above. `
    );
  }
}
