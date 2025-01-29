import { Command } from '@commander-js/extra-typings';
import { initModDirectory } from './init/init-mod-dir';

const program = new Command();

program
  .name('dungeonmans-modding-tools')
  .description(
    'CLI to help you build and develop mod contents for Dungeonmans.'
  )
  .version('0.0.1');

program
  .command('init')
  .description('Initialize a new mod project.')
  .argument('<directory>', 'directory to create and initialize your mod in')
  .option(
    '--dry-run',
    'Simulate the execution of the command without actually changing anything.'
  )
  .action(async (directory, options) => {
    await initModDirectory(directory, options);
  });

program.parse();
