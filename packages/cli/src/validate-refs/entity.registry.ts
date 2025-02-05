import { EntityName, Filepath } from '../utils/types.js';

type EntityLocation = { filepath: Filepath; entity: unknown; name: EntityName };

export class EntityRegistry {
  private registry: Map<EntityName, EntityLocation> = new Map();

  has(name: string) {
    return this.registry.has(name);
  }

  set(name: string, loc: EntityLocation) {
    this.registry.set(name, loc);
  }

  get(name: string) {
    return this.registry.get(name);
  }

  toString() {
    return JSON.stringify([...this.registry]);
  }
}
