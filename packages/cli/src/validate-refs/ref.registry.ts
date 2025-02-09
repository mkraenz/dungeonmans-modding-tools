import { RefTransformer } from '@dungeonmans-mod-tools/js-to-entitydef';
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
   *    originalValue: "@ref(undead_sprite)"
   *    refValue: "undead_sprite"
   *  }
   * }
   * ```
   *
   * @example
   * ```ts
   * {
   *  "src/actordata/monsters.json@undead_02.sprite": {
   *    filepath: "src/actordata/monsters.json",
   *    jsonpath: "undead_02.sprite"
   * // NOTE: this original value will create two registry entries!
   *    originalValue: "@ref(undead_sprite),1,100,@ref(undead_sprite2)"
   *    refValue: "undead_sprite"
   *  }
   * }
   * ```
   *
   * @example
   * ```ts
   * {
   *  "src/actordata/monsters.json@undead_02.@ref(tstt_sprite)": {
   *    filepath: "src/actordata/monsters.json",
   *    jsonpath: "undead_02.@ref(tstt_sprite)"
   *    originalValue: "@ref(tstt_sprite)"
   *    refValue: "tstt_sprite",
   *    refInKey: true
   *  }
   * }
   * ```
   */
  private registry: Map<EntityName, RefLocation> = new Map();

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
      traverseJson(entityDef.entity, (_obj, key, val, jsonpath) => {
        if (RefTransformer.includesRef(key)) {
          const transform = new RefTransformer(key);
          const refLocs = transform.containedRefs.map<RefLocation>((ref) => ({
            filepath,
            originalValue: key,
            refValue: ref,
            jsonpath: `.${entityDef.name}${jsonpath}`,
            refInKey: true,
          }));
          refsOfEntity.push(...refLocs);
          // no return here because we could theoretically have a ref in the key and another in the value of the key-value pair
        }
        if (typeof val === 'string' && RefTransformer.includesRef(val)) {
          const transform = new RefTransformer(val);
          const refLocs = transform.containedRefs.map<RefLocation>((ref) => ({
            filepath,
            originalValue: val,
            refValue: ref,
            jsonpath: `.${entityDef.name}${jsonpath}`,
          }));
          refsOfEntity.push(...refLocs);
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
