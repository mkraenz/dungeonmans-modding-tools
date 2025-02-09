const pattern = /@ref\(.*\)/;
const patternLeft = '@ref(';
const patternRight = ')';

export const stripRefs = <T>(val: T) =>
  typeof val === 'string' ? new RefTransformer(val).strippedStr : val;

export class RefTransformer {
  static includesRef(str: string) {
    return str.match(pattern);
  }

  containedRefs: string[] = [];
  strippedStrBits: string[] = [];
  private remaining: string;

  constructor(originalStr: string) {
    this.remaining = originalStr;
    this.parse();
  }

  /** the original string with all references @ref( ) syntax removed */
  get strippedStr() {
    return this.strippedStrBits.join('');
  }

  private parse() {
    if (!RefTransformer.includesRef(this.remaining)) {
      // recursion anchor. Termination is guaranteed because every string is finite and we keep shaving off bits of the
      this.strippedStrBits.push(this.remaining);
      return;
    }

    const left = splitOnce(this.remaining, patternLeft)[0];
    this.strippedStrBits.push(left);
    const right = splitOnce(this.remaining, patternLeft)[1];
    const refContent = splitOnce(right, patternRight)[0];
    this.strippedStrBits.push(refContent);
    this.containedRefs.push(refContent);
    this.remaining = splitOnce(right, patternRight)[1];
    this.parse(); // there maybe multiple refs in a single originalStr, so we run recursion.
  }
}

const splitOnce = (s: string, on: string) => {
  const [first, ...rest] = s.split(on);
  return [first, rest.join(on)] as const;
};
