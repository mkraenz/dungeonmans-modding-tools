import { Token } from '../lexer/Token.js';
import { StringToken, TokenType } from '../lexer/types.js';
import { EntityDefExpression } from './EntityDefExpression.js';

export class Parser {
  private current = 0;

  constructor(private tokens: Token[], private readonly source: string) {}

  toAst() {
    try {
      return this.entityDefExpression();
    } catch (error) {
      throw new Error('See the error above for details.');
    }
  }

  private advance() {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd() {
    return this.peek().type === 'EOF';
  }

  private peek() {
    return this.tokens[this.current];
  }
  private previous() {
    return this.tokens[this.current - 1];
  }

  /**
   * entityDefExpression -> ENTITYDEF name EOL LEFT_BRACE EOL keyValuePair* RIGHT_BRACE EOL* EOF
   * name -> STRING
   */
  private entityDefExpression() {
    // entityDef
    this.advance();
    const entityDef = this.previous();
    if (entityDef.type !== 'ENTITY_DEF') this.error('ENTITY_DEF');

    // entityDef "somename"
    this.advance();
    const name = this.previous();
    if (name.type !== 'STRING') this.error('STRING');

    // entityDef "somename" EOL
    this.advance();
    const eol1 = this.previous();
    if (eol1.type !== 'EOL') this.error('EOL');

    // entityDef "somename" EOL {
    this.advance();
    const leftBrace = this.previous();
    if (leftBrace.type !== 'LEFT_BRACE') this.error('LEFT_BRACE');

    // entityDef "somename" EOL { EOL
    this.advance();
    const eol2 = this.previous();
    if (eol2.type !== 'EOL') this.error('EOL');

    // entityDef "somename" EOL { EOL }
    this.advance();
    const rightBrace = this.previous();
    if (rightBrace.type !== 'RIGHT_BRACE') this.error('RIGHT_BRACE');

    return new EntityDefExpression(name as unknown as StringToken, []);
  }

  error(expected: TokenType) {
    const token = this.previous();
    console.error(
      `Unexpected token at ${token.printLocation(
        this.source
      )}. Expected type ${expected}, found ${token.lexeme}`
    );
    throw new Error('Unexpected token. See console errors');
  }
}
