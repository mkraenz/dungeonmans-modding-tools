import {
  EntityDefKeyValuePairValue,
  jsToEntitydef,
} from './js-to-entitydef.js';

export const jsToManyEntityDefs = (
  definitions: Record<string, Record<string, EntityDefKeyValuePairValue>>
) => {
  const entityDefs = Object.entries(definitions)
    .filter(([key, _]) => key !== '$schema')
    .map(([entityDefName, definition]) =>
      jsToEntitydef(entityDefName, definition)
    );
  return entityDefs.join('\n');
};
