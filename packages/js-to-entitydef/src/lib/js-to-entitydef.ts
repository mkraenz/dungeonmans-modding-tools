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
      `    ${toPrintedKey(key)} ${toPrintedValue(value, opts.stripPrefix)}`
  );

  const lines = [header, '{', ...rows, '}'];
  return lines.join('\n').concat('\n'); // add a final empty line
}

function toPrintedKey(key: string) {
  if (key.includes(' ')) return `"${key}"`;
  return key;
}

function toPrintedValue(val: EntityDefKeyValuePairValue, stripPrefix: string) {
  if (typeof val === 'string')
    return `"${
      val.startsWith(stripPrefix) ? val.replace(stripPrefix, '') : val
    }"`;
  return val;
}
