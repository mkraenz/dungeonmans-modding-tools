import { Logger } from '../utils/logger.js';
import { EntityName, Filepath, RefLocation } from '../utils/types.js';
import { IRefReporter } from './types.js';

type Options = {
  verbose?: boolean;
};

/** Receives the data extracted in previous step to report back to the user using console stdout. */
export class ConsoleRefReporter implements IRefReporter {
  constructor(private readonly options: Options) {}

  report({
    missingRefs,
    foundRefs,
    duplicateEntities,
    errors,
  }: {
    missingRefs: RefLocation[];
    foundRefs: RefLocation[];
    duplicateEntities: Map<EntityName, Set<Filepath>>;
    errors: { type: string; filepath: Filepath }[];
  }) {
    const warnings = missingRefs.length + duplicateEntities.size;

    this.reportFoundRefs(foundRefs);
    this.reportMissingRefs(missingRefs);

    [...duplicateEntities].forEach(([name, filepaths]) => {
      this.warnDuplicateEntityName(name, filepaths);
    });

    errors.forEach((e) =>
      Logger.error(`ERROR: Failed to parse or process JSON file: ${e.filepath}`)
    );
    if (errors.length) this.logCompletedWithErrors(errors.length, warnings);
    else if (warnings) this.logCompletedWithWarnings(warnings);
    else this.logCompletedSuccessfully();
  }

  private reportFoundRefs(refs: RefLocation[]) {
    if (this.options.verbose)
      Logger.log(`Found references: ${refs.map((r) => r.refValue).join(',')}`);
  }

  private reportMissingRefs(missingRefs: RefLocation[]) {
    missingRefs.forEach((ref) => {
      if (ref.refInKey) {
        Logger.warn(
          `WARNING: Missing entity named "${ref.refValue}" referenced in file "${ref.filepath}" in key with with json path "${ref.jsonpath}". Does the entity exist in Vanilla Dungeonmans?`
        );
      } else {
        Logger.warn(
          `WARNING: Missing entity named "${ref.refValue}" referenced in file "${ref.filepath}" in value with json path "${ref.jsonpath}". Does the entity exist in Vanilla Dungeonmans?`
        );
      }
    });
  }

  private warnDuplicateEntityName(name: string, filepaths: Set<Filepath>) {
    Logger.warn(
      `WARNING: Duplicate entity name "${name}". Found in files: ${[
        ...filepaths,
      ]
        .map((f) => `"${f}"`)
        .join(', ')}.`
    );
  }

  private logCompletedWithWarnings(warnings: number) {
    Logger.warn(`Found ${warnings} warnings. Please check the output above.`);
  }

  private logCompletedSuccessfully() {
    Logger.success('✅ Completed without errors or warnings.');
  }

  private logCompletedWithErrors(errors: number, warnings: number) {
    const warningMsg =
      warnings === 0 ? 'No warnings found.' : `Found ${warnings} warnings.`;
    Logger.error(
      `❌ Completed with ${errors} errors. Please check the output above. ${warningMsg}`
    );
  }
}
