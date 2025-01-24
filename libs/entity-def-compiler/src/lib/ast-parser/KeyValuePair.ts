import { Token } from '../lexer/Token';
import { LiteralTokenType } from '../lexer/types';

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
