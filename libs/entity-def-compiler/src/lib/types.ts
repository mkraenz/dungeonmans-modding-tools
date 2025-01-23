export type IToken = {
  type: TokenType;
  loc: SourceLocation | null;
};

export type SourceLocation = {
  lexeme: string | null;
  start: Position;
  end: Position;
};

export type Position = {
  /** 0-based */
  line: number;
  /** column, 0-based */
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
  | 'EOF';
