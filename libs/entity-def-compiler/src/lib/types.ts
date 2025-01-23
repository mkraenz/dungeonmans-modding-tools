export type IToken = {
  type: TokenType;
  offset: number;
  length: number;
};

export type SourceLocation = {
  lexeme: string | null;
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
  | 'IDENTIFIER'
  | 'LEFT_BRACE'
  | 'RIGHT_BRACE'
  | 'TRUE'
  | 'FALSE'
  | 'NUMBER'
  | 'STRING'
  | 'EOL'
  | 'EOF';
