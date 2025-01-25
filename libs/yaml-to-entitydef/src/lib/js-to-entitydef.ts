type Value = number | boolean | string;

export function jsToEntitydef(
  name: string,
  keyValuePairs: Record<string, Value>
): string {
  const header = `entityDef "${name}"`;
  const rows = Object.entries(keyValuePairs).map(
    ([key, value]) => `    ${toPrintedKey(key)} ${toPrintedValue(value)}`
  );

  const lines = [header, '{', ...rows, '}'];
  return lines.join('\n').concat('\n'); // add a final empty line
}

function toPrintedKey(key: string) {
  if (key.includes(' ')) return `"${key}"`;
  return key;
}

function toPrintedValue(val: Value) {
  if (typeof val === 'string') return `"${val}"`;
  return val;
}
