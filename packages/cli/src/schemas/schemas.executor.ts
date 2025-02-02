import { FileSystem } from '../utils/filesystem.js';
import { Logger } from '../utils/logger.js';

const VS_CODE_SETTINGS = '.vscode/settings.json';

type Options = {
  dryRun?: boolean;
  verbose?: boolean;
  editor: 'vscode' | 'other';
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
export class SchemaGenerator {
  private errors = 0;
  private options: Options;
  private fs: FileSystem;

  constructor(options: Options) {
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
    Logger.log('🔨 Generating JSON schemas...');

    if (this.options.editor === 'vscode')
      await this.generateJsonSchemasForVsCode();
    else await this.generateJsonSchemasForOtherEditor();

    if (this.errors) this.logCompletedWithErrors();
    else this.logCompletedSuccessfully();

    if (this.dryRun) Logger.warnDryRun();
  }

  async generateJsonSchemasForOtherEditor() {
    await this.fs.writeFile(
      'dungeonmans-json-schema-map.json',
      JSON.stringify({ 'json.schemas': schemas }, null, 2)
    );
    Logger.warn(
      'Created dungeonmans-json-schema-map.json in current working directory. Please configure your editor to use the contained schema urls for JSON schema validation.'
    );
  }

  private async generateJsonSchemasForVsCode() {
    if (this.fs.exists(VS_CODE_SETTINGS)) {
      const settingsFile = await this.fs.readFile(VS_CODE_SETTINGS);
      const settings = JSON.parse(settingsFile);
      settings['json.schemas'] = schemas;
      await this.fs.writeFile(
        VS_CODE_SETTINGS,
        JSON.stringify(settings, null, 2)
      );
    } else {
      await this.fs.makeDir('.vscode');
      await this.fs.writeFile(
        VS_CODE_SETTINGS,
        JSON.stringify({ 'json.schemas': schemas }, null, 2)
      );
    }
  }

  private logCompletedSuccessfully() {
    Logger.success('✅ Completed without errors.');
  }

  private logCompletedWithErrors() {
    Logger.error(
      `❌ Completed with ${this.errors} errors. Please check the output above.`
    );
  }
}

const schemas = [
  {
    fileMatch: ['**/actordata/*.json'],
    url: 'https://raw.githubusercontent.com/mkraenz/dungeonmans-mod-tools/refs/heads/main/packages/schemas/gen/monsters.schema.json',
  },
  {
    fileMatch: ['**/encounterdata/*.json'],
    url: 'https://raw.githubusercontent.com/mkraenz/dungeonmans-mod-tools/refs/heads/main/packages/schemas/gen/encounters.schema.json',
  },
  {
    fileMatch: ['**/itemdata/*.json'],
    url: 'https://raw.githubusercontent.com/mkraenz/dungeonmans-mod-tools/refs/heads/main/packages/schemas/gen/items.schema.json',
  },
  {
    fileMatch: ['**/plotdata/*.json'],
    url: 'https://raw.githubusercontent.com/mkraenz/dungeonmans-mod-tools/refs/heads/main/packages/schemas/gen/plot.schema.json',
  },
  {
    fileMatch: ['**/specialpowerdata/*.json'],
    url: 'https://raw.githubusercontent.com/mkraenz/dungeonmans-mod-tools/refs/heads/main/packages/schemas/gen/powers.schema.json',
  },
  {
    fileMatch: ['**/spritedata/*.json'],
    url: 'https://raw.githubusercontent.com/mkraenz/dungeonmans-mod-tools/refs/heads/main/packages/schemas/gen/sprites.schema.json',
  },
  {
    fileMatch: ['**/tabledata/*.json'],
    url: 'https://raw.githubusercontent.com/mkraenz/dungeonmans-mod-tools/refs/heads/main/packages/schemas/gen/encounter-tables.schema.json',
  },
];
