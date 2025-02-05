import { EntityName, Filepath, RefLocation } from '../utils/types.js';

export interface IRefReporter {
  report(args: {
    missingRefs: RefLocation[];
    foundRefs: RefLocation[];
    duplicateEntities: Map<EntityName, Set<Filepath>>;
    errors: { type: string; filepath: Filepath }[];
  }): void;
}
