import { IToken, SourceLocation, TokenType } from './types';

class Token implements IToken {
  constructor(readonly type: TokenType, readonly loc: SourceLocation | null) {}

  toString() {
    const { loc } = this;
    return `${this.type} ${loc?.lexeme} ${loc?.start.line}:${loc?.start.col} - ${loc?.end.line}:${loc?.end.col}`;
  }
}

export class Lexer {
  static keywords = new Map<string, TokenType>([['entityDef', 'ENTITY_DEF']]);

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

      case ' ':
      case '\r':
      case '\t':
        // Ignore whitespace.
        return;
      case '\n':
        this.line++;
        return;
      default:
        if (isAlpha(char)) {
          return this.identifier();
        }
    }
  }

  private addEOF() {
    this.#tokens.push(
      new Token('EOF', {
        lexeme: '',
        start: { col: this.current, line: this.line },
        end: { col: this.current, line: this.line },
      })
    );
  }

  private identifier() {
    while (isAlphaNumeric(this.peek())) this.advance();

    const lexeme = this.source.substring(this.start, this.current);
    const keyword = Lexer.keywords.get(lexeme);
    if (keyword) this.addToken(keyword);
    else this.addToken('IDENTIFIER');
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
    // The closing ".
    this.advance();

    const str = this.source.substring(this.start + 1, this.current - 1);
    this.addToken('STRING', str);
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

  private addToken(type: TokenType, forceLexeme?: string) {
    const lexeme = this.source.substring(this.start, this.current);
    this.#tokens.push(
      new Token(type, {
        lexeme: forceLexeme ?? lexeme,
        start: { col: this.start, line: this.line },
        end: { col: this.current, line: this.line },
      })
    );
  }
}

const isAlphaNumeric = (char: string) => isAlpha(char) || isDigit(char);

const isAlpha = (char: string) => {
  return (
    (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char == '_'
  );
};

const isDigit = (char: string) => {
  return char >= '0' && char <= '9';
};
