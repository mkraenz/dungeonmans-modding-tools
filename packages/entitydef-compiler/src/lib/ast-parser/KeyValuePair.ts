import { Token } from '../lexer/Token.js';
import type { LiteralTokenType } from '../lexer/types.js';

type KeyToken = Token & { type: 'IDENTIFIER' | 'STRING' };
type LiteralToken = Token & { type: LiteralTokenType };

export class KeyValuePair {
  key: KeyToken;
  value: LiteralToken;

  constructor(key: KeyToken, value: LiteralToken) {
    this.key = key;
    this.value = value;
  }
}
