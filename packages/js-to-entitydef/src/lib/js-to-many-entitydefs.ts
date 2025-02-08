import {
  EntityDefKeyValuePairValue,
  jsToEntitydef,
} from './js-to-entitydef.js';

type Options = {
  /** Removes the prefix from all string values and keys. Default '', i.e. no stripping. */
  stripPrefix?: string;
};
const defaultOptions = {
  stripPrefix: '',
};
export const jsToManyEntityDefs = (
  definitions: Record<string, Record<string, EntityDefKeyValuePairValue>>,
  options: Options = {}
) => {
  const opts = { ...defaultOptions, ...options };
  const entityDefs = Object.entries(definitions)
    .filter(([key, _]) => key !== '$schema')
    .map(([entityDefName, definition]) =>
      jsToEntitydef(entityDefName, definition, opts)
    );
  return entityDefs.join('\n');
};
