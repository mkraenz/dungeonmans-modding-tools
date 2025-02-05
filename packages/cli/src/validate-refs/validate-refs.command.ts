import { Command } from '@commander-js/extra-typings';
import { CLI_CONSTANTS } from '../constants.js';
import { ReferencesValidator } from './validate-refs.executor.js';

export const createValidateRefCommand = () => {
  return new Command()
    .command('validate-refs')
    .description(
      'Checks for existence of references, i.e. strings prefixed with `@ref_`.'
    )
    .addHelpText(
      'after',
      `Example A:               dungeonmans-mod-tools validate-refs path/to/src`
    )
    .argument(
      '<srcDir>',
      'Source directory containing your mod, that is, the directory your modinfo.txt lives.'
    )
    .option(
      '--prefix <prefix>',
      'Prefix to mark references.',
      CLI_CONSTANTS.defaultRefPrefix
    )
    .option('--verbose', 'Print additional info.')
    .action(async (srcDir, options) => {
      const validator = new ReferencesValidator(srcDir, options);
      await validator.run();
    });
};
