import { Command } from '@commander-js/extra-typings';
import { ConsoleRefReporter } from './console.ref-reporter.js';
import { ReferencesValidator } from './validate-refs.executor.js';

export const createValidateRefCommand = () => {
  return new Command()
    .command('validate-refs')
    .alias('verify-refs')
    .description(
      'Checks for existence of references, i.e. any strings or part of strings marked with `@ref(..)`. References can appear in both string values as well as property keys.'
    )
    .addHelpText(
      'after',
      `
Note: Only looks for references as of the 2nd level of objects. In other words, references in root-level property keys are ignored. The first level is assumed to be the entity name.

Example A:                @dungeonmans-mod-tools/cli validate-refs path/to/src
Example B (verbose):      @dungeonmans-mod-tools/cli validate-refs path/to/src --verbose
Example C (debug):        @dungeonmans-mod-tools/cli validate-refs path/to/src --debug`
    )
    .argument(
      '<srcDir>',
      'Source directory containing your mod, that is, the directory your modinfo.txt lives.'
    )
    .option('--verbose', 'Print additional info.')
    .option('--debug', 'Print addditional debug info. Implies --verbose.')
    .action(async (srcDir, options) => {
      const validator = new ReferencesValidator(
        srcDir,
        new ConsoleRefReporter({
          ...options,
          verbose: options.debug ?? options.verbose,
        }),
        options
      );
      await validator.run();
    });
};
