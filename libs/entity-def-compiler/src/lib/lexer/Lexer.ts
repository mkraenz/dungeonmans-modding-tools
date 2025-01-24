import { IToken, SourceLocation, TokenType } from './types';

class Token implements IToken {
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

  toHumanReadable(source: string) {
    const loc = this.toSourceLocation(source);
    const lexeme = this.type === 'EOL' ? '' : this.lexeme; // don't actually print new lines in the console. its bloating up stuff
    return `${this.type} ${lexeme} ${loc.start.line}:${loc.start.col} - ${loc.end.line}:${loc.end.col}`;
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

export class Lexer {
  static keywords = new Map<string, TokenType>([
    ['entityDef', 'ENTITY_DEF'],
    ['entitydef', 'ENTITY_DEF'], // TODO @Jim whether entitydef is case sensitive
    ['true', 'TRUE'],
    ['false', 'FALSE'],
  ]);

  private start = 0;
  private current = 0;
  private line = 1;

  #tokens: Token[] = [];

  get tokens() {
    return this.#tokens;
  }

  constructor(private readonly source: string) {}

  tokenize() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }
    this.addEOF();
  }

  private scanToken() {
    const char = this.advance();
    switch (char) {
      case '{':
        return this.addToken('LEFT_BRACE');
      case '}':
        return this.addToken('RIGHT_BRACE');
      case '"':
        return this.stringToken();
      case '-':
        return this.numberOrString();

      case ' ':
      case '\r':
      case '\t':
        // Ignore whitespace.
        return;
      case '\n':
        this.addToken('EOL');
        this.line++;
        return;
      default:
        if (isDigit(char)) return this.numberOrString();
        if (isAlpha(char)) return this.identifier();
    }
  }

  private addEOF() {
    this.#tokens.push(new Token('EOF', this.current, 0, ''));
  }

  private identifier() {
    while (!isWhitespace(this.peek()) && !this.isAtEnd()) this.advance();

    const lexeme = this.source.substring(this.start, this.current);
    const keyword = Lexer.keywords.get(lexeme);
    if (keyword) this.addToken(keyword);
    else this.addToken('IDENTIFIER');
  }

  private numberOrString() {
    while (!isWhitespace(this.peek()) && !this.isAtEnd()) this.advance();
    const lexeme = this.source.substring(this.start, this.current);
    if (isNumeric(lexeme)) this.addToken('NUMBER');
    else this.addToken('STRING');
  }

  private stringToken() {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() === '\n') this.line++;
      this.advance();
    }
    if (this.isAtEnd()) {
      console.error(
        `Missing closing quotes matching ${this.line}:${this.start}`
      );
    }
    // The closing "
    this.advance();

    this.addToken('STRING');
  }

  private advance() {
    return this.source.charAt(this.current++);
  }

  private isAtEnd() {
    return this.current >= this.source.length;
  }

  private peek(): string {
    if (this.isAtEnd()) return '';
    return this.source.charAt(this.current);
  }

  private addToken(type: TokenType) {
    const lexeme = this.source.slice(this.start, this.current);
    this.#tokens.push(
      new Token(type, this.start, this.current - this.start, lexeme)
    );
  }
}

const whitespaces = new Set([' ', '\r', '\t', '\n']);
const isWhitespace = (char: string) => whitespaces.has(char);

const isAlphaNumeric = (char: string) => isAlpha(char) || isDigit(char);

const isAlpha = (char: string) => {
  return (
    (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char == '_'
  );
};

const isDigit = (char: string) => {
  return char >= '0' && char <= '9';
};

// https://github.com/validatorjs/validator.js/blob/master/src/lib/isNumeric.js
const numberRegex = new RegExp(`^[+-]?([0-9]*[.])?[0-9]+$`);

const isNumeric = (n: string) => {
  return numberRegex.test(n);
};
