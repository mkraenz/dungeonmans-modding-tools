export type EntityDefKeyValuePairValue = number | boolean | string;

type Options = {
  /** Removes the prefix from all string variables. Default '', i.e. no stripping. */
  stripPrefix?: string;
};
const defaultOptions = {
  stripPrefix: '',
};

class JsToEntityDefTransformer {
  private readonly options: Required<Options>;

  constructor(
    private readonly entityName: string,
    private readonly keyValuePairs: Record<string, EntityDefKeyValuePairValue>,
    options: Options = {}
  ) {
    this.options = { ...defaultOptions, ...options };
  }

  toEntityDef() {
    const header = `entityDef "${this.entityName}"`;
    const rows = Object.entries(this.keyValuePairs).map(
      ([key, value]) =>
        `    ${this.toPrintedKey(
          key,
          this.options.stripPrefix
        )} ${this.toPrintedValue(value, this.options.stripPrefix)}`
    );

    const lines = [header, '{', ...rows, '}'];
    return lines.join('\n').concat('\n'); // add a final empty line
  }

  private toPrintedKey(key: string, stripPrefix: string) {
    const strippedKey = key.startsWith(stripPrefix)
      ? key.replace(stripPrefix, '')
      : key;
    if (key.includes(' ')) return `"${strippedKey}"`;
    return strippedKey;
  }

  private toPrintedValue(val: EntityDefKeyValuePairValue, stripPrefix: string) {
    if (typeof val === 'string')
      return `"${
        val.startsWith(stripPrefix) ? val.replace(stripPrefix, '') : val
      }"`;
    return val;
  }
}

export function jsToEntitydef(
  name: string,
  keyValuePairs: Record<string, EntityDefKeyValuePairValue>,
  options: Options = {}
): string {
  return new JsToEntityDefTransformer(
    name,
    keyValuePairs,
    options
  ).toEntityDef();
}
