import { EntityDefKeyValuePairValue, jsToEntitydef } from './js-to-entitydef';

export const jsToManyEntityDefs = (
  definitions: Record<string, Record<string, EntityDefKeyValuePairValue>>
) => {
  const entityDefs = Object.entries(definitions).map(
    ([entityDefName, definition]) => jsToEntitydef(entityDefName, definition)
  );
  return entityDefs.join('');
};
