import { Command } from '@commander-js/extra-typings';
import { ModProjectInitializer } from './init-mod.executor.js';

export const createInitCommand = () => {
  return new Command()
    .command('init')
    .description('Initialize a new mod project.')
    .addHelpText(
      'after',
      `
    Example A:                dungeonmans-modding-tools init myawesomemod supermod
    Example B:                dungeonmans-modding-tools init somepath/somedir/myawesomemod supermod
    Example C:                dungeonmans-modding-tools init somepath/somedir/myawesomemod 'Best Mod Eva'
    Example D (dry-run):      dungeonmans-modding-tools init myawesomemod supermod --dry-run`
    )
    .argument('<directory>', 'Directory to create and initialize your mod in')
    .argument('<modName>', 'Name of your mod')
    .option(
      '--dry-run',
      'Simulate the execution of the command without actually changing anything.'
    )
    .option('--verbose', 'Print additional info.')
    .action(async (directory, modName, options) => {
      const initializer = new ModProjectInitializer(
        directory,
        modName,
        options
      );
      await initializer.run();
    });
};
