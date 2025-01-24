import { StringToken } from '../lexer/types';
import { KeyValuePair } from './KeyValuePair';

export class EntityDefExpression {
  constructor(
    private name: StringToken,
    private readonly keyValuePairs: KeyValuePair[]
  ) {}
}
