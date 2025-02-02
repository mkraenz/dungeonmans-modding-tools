import { Command } from '@commander-js/extra-typings';
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
Example A:                dungeonmans-mod-tools build ./src ./dist/mymodname
Example B:                dungeonmans-mod-tools build somepath/somedir/src dist/mymodname
Example C (dry-run):      dungeonmans-mod-tools build ./src ./dist/mymodname --dry-run`
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
      '--dry-run',
      'Simulate the execution of the command without actually changing anything.'
    )
    .option('--verbose', 'Print additional info.')
    .action(async (srcDir, outDir, options) => {
      const builder = new ModBuilder(srcDir, outDir, options);
      await builder.run();
    });
};
