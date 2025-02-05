import { RefLocation } from '../utils/types.js';
import { EntityRegistry } from './entity.registry.js';
import { RefRegistry } from './ref.registry.js';

/** Checks whether an entity exists for each ref. */
export class RefValidator {
  #foundRefs: RefLocation[] = [];
  #missingRefs: RefLocation[] = [];

  get refs() {
    return [this.#foundRefs, this.#missingRefs];
  }

  constructor(
    private readonly entityRegistry: EntityRegistry,
    private readonly refRegistry: RefRegistry
  ) {
    this.init();
  }

  private init() {
    // lodash partition
    const [found, missing] = this.refRegistry
      .values()
      .reduce<[RefLocation[], RefLocation[]]>(
        ([found, missing], ref) => {
          if (this.entityRegistry.has(ref.refValue))
            return [[...found, ref], missing];
          return [found, [...missing, ref]];
        },
        [[], []]
      );
    this.#foundRefs = found;
    this.#missingRefs = missing;
  }
}
