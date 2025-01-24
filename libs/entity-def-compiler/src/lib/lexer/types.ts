export type IToken = {
  type: TokenType;
  offset: number;
  length: number;
  lexeme: string;
};

export type SourceLocation = {
  start: Position;
  end: Position;
};

export type Position = {
  /** 1-based */
  line: number;
  /** column, 1-based */
  col: number;
};

export type TokenType =
  | 'ENTITY_DEF'
  | 'IDENTIFIER' // due to not requiring quotes for strings, its probably impossible to distinguish between IDENTIFIER and STRING at the tokenization level. we need to check for EOL instead. The first token on a line that's a STRING or IDENTIFIER must be an IDENTIFIER. Everthing after that is actually a single string until we finally hit EOL. TODO @Jim Are quotes required when whitespace is included in the string? If not, then we might get into trouble due to discarding whitespace.
  | 'LEFT_BRACE'
  | 'RIGHT_BRACE'
  | 'TRUE'
  | 'FALSE'
  | 'NUMBER'
  | 'STRING'
  | 'EOL'
  | 'EOF';
