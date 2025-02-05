import { Command } from '@commander-js/extra-typings';
import { CLI_CONSTANTS } from '../constants.js';
import { ConsoleRefReporter } from './console.ref-reporter.js';
import { ReferencesValidator } from './validate-refs.executor.js';

export const createValidateRefCommand = () => {
  return new Command()
    .command('validate-refs')
    .description(
      'Checks for existence of references, i.e. strings prefixed with `@ref_`.'
    )
    .addHelpText(
      'after',
      `
Example A:           dungeonmans-mod-tools validate-refs path/to/src
Example B:           dungeonmans-mod-tools validate-refs path/to/src --prefix '${CLI_CONSTANTS.defaultRefPrefix}'`
    )
    .argument(
      '<srcDir>',
      'Source directory containing your mod, that is, the directory your modinfo.txt lives.'
    )
    .option(
      '--prefix <prefix>',
      'Prefix that marks references.',
      CLI_CONSTANTS.defaultRefPrefix
    )
    .option('--verbose', 'Print additional info.')
    .action(async (srcDir, options) => {
      const validator = new ReferencesValidator(
        srcDir,
        new ConsoleRefReporter(options),
        options
      );
      await validator.run();
    });
};
