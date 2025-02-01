import type { IToken, SourceLocation, TokenType } from './types.js';

export class Token implements IToken {
  constructor(
    readonly type: TokenType,
    /** The offset from the beginning of the source file  */
    readonly offset: number,
    /** length of the lexeme starting from the offset */
    readonly length: number,
    readonly lexeme: string
  ) {}

  toString() {
    const { type, length, offset } = this;
    return `${type} ${offset} ${length}`;
  }

  prettyPrint(source: string) {
    const loc = this.toSourceLocation(source);
    const lexeme = this.type === 'EOL' ? '' : this.lexeme; // don't actually print new lines in the console. its bloating up stuff
    return `${this.type} ${lexeme} ${loc.start.line}:${loc.start.col} - ${loc.end.line}:${loc.end.col}`;
  }
  printLocation(source: string) {
    const loc = this.toSourceLocation(source);
    return `${loc.start.line}:${loc.start.col}`;
  }

  toSourceLocation(source: string): SourceLocation {
    const everythingUntilLexeme = source.slice(0, this.offset + this.length);
    const linesUntilLexemeIncl = everythingUntilLexeme.split('\n');
    const [_lineWithLexeme, ...otherLines] = linesUntilLexemeIncl.toReversed();
    const charsUntilLineWithLexeme =
      otherLines.length > 0 ? otherLines.join('\n').length : -1; // when the lexeme is in the very first line, we would get an off-by-one error without the correction
    const startCol = this.offset - charsUntilLineWithLexeme;
    const endCol = this.offset + this.length - charsUntilLineWithLexeme;

    return {
      start: { line: linesUntilLexemeIncl.length, col: startCol },
      end: { line: linesUntilLexemeIncl.length, col: endCol },
    };
  }
}
