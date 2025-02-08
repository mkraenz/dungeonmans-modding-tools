import { traverseJson } from '../utils/traverse-json.js';
import { EntityName, RefLocation } from '../utils/types.js';

export class RefRegistry {
  /**
   * Format: {[`${filepath}@${jsonpath}`]: RefLocation}
   * @example
   * ```ts
   * {
   *  "src/actordata/monsters.json@undead_01.sprite": {
   *    filepath: "src/actordata/monsters.json",
   *    jsonpath: "undead_01.sprite"
   *    originalValue: "@ref_undead_sprite"
   *    refValue: "undead_sprite"
   *  }
   * }
   * ```
   */
  private registry: Map<EntityName, RefLocation> = new Map();

  constructor(private readonly prefix: string) {}

  has(name: string) {
    return this.registry.has(name);
  }

  setRef(loc: RefLocation) {
    this.registry.set(`${loc.filepath}@${loc.jsonpath}`, loc);
  }

  set(name: string, loc: RefLocation) {
    this.registry.set(name, loc);
  }

  get(key: string) {
    return this.registry.get(key);
  }

  setFromEntities(
    filepath: string,
    entities: {
      name: string;
      entity: Record<string, unknown>;
    }[]
  ) {
    const refs = entities.flatMap<RefLocation>((entityDef) => {
      const refsOfEntity: RefLocation[] = [];
      traverseJson(entityDef.entity, (_obj, key, val) => {
        if (typeof key === 'string' && key.startsWith(this.prefix)) {
          const refLoc: RefLocation = {
            filepath,
            originalValue: key,
            refValue: key.replace(this.prefix, ''),
            jsonpath: `${entityDef.name}.${key}`,
            refInKey: true,
          };
          refsOfEntity.push(refLoc);
          // no return here because we could theoretically have a ref in the key and another in the value of the key-value pair
        }
        if (typeof val === 'string' && val.startsWith(this.prefix)) {
          const refLoc = {
            filepath,
            originalValue: val,
            refValue: val.replace(this.prefix, ''),
            jsonpath: `${entityDef.name}.${key}`,
          };
          refsOfEntity.push(refLoc);
        }
      });
      return refsOfEntity;
    });
    refs.forEach((ref) => this.setRef(ref));
  }

  toArray() {
    return [...this.registry];
  }

  values() {
    return this.registry.values();
  }
}
