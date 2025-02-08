export type EntityDefKeyValuePairValue = number | boolean | string;

type Options = {
  /** Removes the prefix from all string variables. Default '', i.e. no stripping. */
  stripPrefix?: string;
};
const defaultOptions = {
  stripPrefix: '',
};

class JsToEntityDefTransformer {
  private readonly prefixToStrip: string;

  constructor(
    private readonly entityName: string,
    private readonly keyValuePairs: Record<string, EntityDefKeyValuePairValue>,
    options: Options = {}
  ) {
    this.prefixToStrip = options.stripPrefix ?? defaultOptions.stripPrefix;
  }

  toEntityDef() {
    const header = `entityDef "${this.entityName}"`;
    const rows = Object.entries(this.keyValuePairs).map(
      ([key, value]) =>
        `    ${this.toPrintedKey(key)} ${this.toPrintedValue(value)}`
    );

    const lines = [header, '{', ...rows, '}'];
    return lines.join('\n').concat('\n'); // add a final empty line
  }

  private toPrintedKey(key: string) {
    const strippedKey = this.withPrefixStripped(key);
    if (key.includes(' ')) return `"${strippedKey}"`;
    return strippedKey;
  }

  private toPrintedValue(val: EntityDefKeyValuePairValue) {
    if (typeof val === 'string') return `"${this.withPrefixStripped(val)}"`;
    return val;
  }

  private withPrefixStripped(str: string) {
    return str.startsWith(this.prefixToStrip)
      ? str.replace(this.prefixToStrip, '')
      : str;
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
