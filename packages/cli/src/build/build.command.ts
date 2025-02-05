import { Command } from '@commander-js/extra-typings';
import { CLI_CONSTANTS } from '../constants.js';
import { ModBuilder } from './build-mod.executor.js';

export const createBuildCommand = () => {
  return new Command()
    .command('build')
    .description(
      'Build your mod into entitydefs for copy-and-paste into the Dungeonmans mod directory.'
    )
    .addHelpText(
      'after',
      `
Example A:                @dungeonmans-mod-tools/cli build ./src ./dist/mymodname
Example B:                @dungeonmans-mod-tools/cli build path/to/src path/to/dist/mymodname
Example C (dry-run):      @dungeonmans-mod-tools/cli build ./src ./dist/mymodname --dry-run
Example D (refs):         @dungeonmans-mod-tools/cli build ./src ./dist/mymodname --marked-refs
Example E (custom refs):  @dungeonmans-mod-tools/cli build ./src ./dist/mymodname --marked-refs --ref-prefix '${CLI_CONSTANTS.defaultRefPrefix}'
`
    )
    .argument(
      '<srcDir>',
      'Source directory containing your mod, that is, the directory your modinfo.txt lives.'
    )
    .argument(
      '<outDir>',
      `Ouput directory. This is the directory you copy-paste into c:\\users\\[you]\\appdata\\roaming\\Dungeonmans\\modcontent\\mods\\ directory to play your mod in Dungeonmans.
    If outDir directory does not exist, creates it and its parents as necessary.`
    )
    .option(
      '--marked-refs',
      'Strips prefix from all strings to allow extended validation of your entities and references. To customize the prefix, see --ref-prefix.'
    )
    .option(
      '--ref-prefix <refPrefix>',
      'Strips prefix from all strings to allow extended validation of your entities and references. Only active when --marked-refs flag is set.',
      CLI_CONSTANTS.defaultRefPrefix
    )
    .option(
      '--dry-run',
      'Simulate the execution of the command without actually changing anything.'
    )
    .option('--verbose', 'Print additional info.')
    .action(async (srcDir, outDir, options) => {
      const builder = new ModBuilder(srcDir, outDir, {
        ...options,
        refPrefix: options.markedRefs ? options.refPrefix : undefined,
      });
      await builder.run();
    });
};
