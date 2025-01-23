import { Lexer } from './Lexer';

const spriteDef = `entitydef "modmans_mod_mold_sprite"
{
	texturename monster_sprites
	xloc 0
	yloc 0
	width 80
	height 128
}`;

describe('Lexer', () => {
  it('works for "{}"', () => {
    const source = '{}';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens).toEqual([
      {
        loc: {
          end: { col: 1, line: 1 },
          lexeme: '{',
          start: { col: 0, line: 1 },
        },
        type: 'LEFT_BRACE',
      },
      {
        loc: {
          end: { col: 2, line: 1 },
          lexeme: '}',
          start: { col: 1, line: 1 },
        },
        type: 'RIGHT_BRACE',
      },
      {
        loc: {
          end: { col: 2, line: 1 },
          lexeme: '',
          start: { col: 2, line: 1 },
        },
        type: 'EOF',
      },
    ]);
  });

  it(`works for 'entityDef "mysprite" {}'`, () => {
    const source = 'entityDef "mysprite" {}';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toString())).toEqual([
      'ENTITY_DEF entityDef 1:0 - 1:9',
      'STRING mysprite 1:10 - 1:20',
      'LEFT_BRACE { 1:21 - 1:22',
      'RIGHT_BRACE } 1:22 - 1:23',
      'EOF  1:23 - 1:23',
    ]);
  });

  it(`works for 'health 15'`, () => {
    const source = 'health 15';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toString())).toEqual([
      'IDENTIFIER health 1:0 - 1:6',
      'NUMBER 15 1:7 - 1:9',
      'EOF  1:9 - 1:9',
    ]);
  });

  it(`works for negative number '-15'`, () => {
    const source = '-15';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toString())).toEqual([
      'NUMBER -15 1:0 - 1:3',
      'EOF  1:3 - 1:3',
    ]);
  });

  it('works for a multiline entityDef', () => {
    const source = `entityDef "mysprite"
    {
    }`;
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toString())).toEqual([
      'ENTITY_DEF entityDef 1:0 - 1:9',
      'STRING mysprite 1:10 - 1:20',
      'LEFT_BRACE { 2:0 - 2:1',
      'RIGHT_BRACE } 3:0 - 1:1',
      'EOF  3:0 - 3:0',
    ]);
  });
});
