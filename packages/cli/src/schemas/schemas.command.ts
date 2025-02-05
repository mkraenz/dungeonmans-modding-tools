import { Command, Option } from '@commander-js/extra-typings';
import { SchemaGenerator } from './schemas.executor.js';

// https://github.com/commander-js/extra-typings/blob/HEAD/tests/subclass.test-d.ts
class TypedOption<Usage extends string = ''> extends Option<Usage> {}

export const createSchemasCommand = () => {
  return new Command()
    .command('schemas')
    .description('Set up or update the JSON schemas for intellisense and more.')
    .addHelpText(
      'after',
      `
Example A (vscode):               @dungeonmans-mod-tools/cli schemas --editor vscode
Example A (other editor):         @dungeonmans-mod-tools/cli schemas --editor other
Example B (dry-run):              @dungeonmans-mod-tools/cli schemas --editor vscode --dry-run`
    )
    .addOption(
      new TypedOption('--editor <editor>', 'The text editor you are using')
        .choices(['vscode', 'other'])
        .makeOptionMandatory(true)
    )
    .option(
      '--dry-run',
      'Simulate the execution of the command without actually changing anything.'
    )
    .option('--verbose', 'Print additional info.')
    .action(async (options) => {
      const schemaGen = new SchemaGenerator(options);
      await schemaGen.run();
    });
};
