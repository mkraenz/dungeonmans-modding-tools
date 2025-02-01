import type { StringToken } from '../lexer/types.js';
import { KeyValuePair } from './KeyValuePair.js';

export class EntityDefExpression {
  constructor(
    private name: StringToken,
    private readonly keyValuePairs: KeyValuePair[]
  ) {}
}
