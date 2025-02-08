export type EntityDefKeyValuePairValue = number | boolean | string;

type Options = {
  /** Removes the prefix from all string variables. Default '', i.e. no stripping. */
  stripPrefix?: string;
};
const defaultOptions = {
  stripPrefix: '',
};

export function jsToEntitydef(
  name: string,
  keyValuePairs: Record<string, EntityDefKeyValuePairValue>,
  options: Options = {}
): string {
  const opts = { ...defaultOptions, ...options };
  const header = `entityDef "${name}"`;
  const rows = Object.entries(keyValuePairs).map(
    ([key, value]) =>
      `    ${toPrintedKey(key, opts.stripPrefix)} ${toPrintedValue(
        value,
        opts.stripPrefix
      )}`
  );

  const lines = [header, '{', ...rows, '}'];
  return lines.join('\n').concat('\n'); // add a final empty line
}

function toPrintedKey(key: string, stripPrefix: string) {
  const strippedKey = key.startsWith(stripPrefix)
    ? key.replace(stripPrefix, '')
    : key;
  if (key.includes(' ')) return `"${strippedKey}"`;
  return strippedKey;
}

function toPrintedValue(val: EntityDefKeyValuePairValue, stripPrefix: string) {
  if (typeof val === 'string')
    return `"${
      val.startsWith(stripPrefix) ? val.replace(stripPrefix, '') : val
    }"`;
  return val;
}
