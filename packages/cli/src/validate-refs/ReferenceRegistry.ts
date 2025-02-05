import { EntityName, RefLocation } from '../utils/types.js';

export class ReferenceRegistry {
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
      entity: unknown;
    }[]
  ) {
    const refs = entities.flatMap<RefLocation>((entityDef) =>
      Object.entries(entityDef.entity as Record<string, unknown>)
        .filter(
          ([_, value]) =>
            typeof value === 'string' && value.startsWith(this.prefix)
        )
        .map(([key, val]) => {
          const value = val as string;
          return {
            filepath,
            originalValue: value,
            refValue: value.startsWith(this.prefix)
              ? value.replace(this.prefix, '')
              : value,
            jsonpath: `${entityDef.name}.${key}`,
          };
        })
    );
    refs.forEach((ref) => this.setRef(ref));
  }

  toArray() {
    return [...this.registry];
  }

  values() {
    return this.registry.values();
  }
}
