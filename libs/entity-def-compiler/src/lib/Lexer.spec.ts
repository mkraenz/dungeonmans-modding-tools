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
  it('returns the correct tokens "{}"', () => {
    const source = '{}';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens).toEqual([
      { type: 'LEFT_BRACE', offset: 0, length: 1 },
      { type: 'RIGHT_BRACE', offset: 1, length: 1 },
      { type: 'EOF', offset: 2, length: 0 },
    ]);
  });

  it('works for "{}"', () => {
    const source = '{}';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toString())).toEqual([
      'LEFT_BRACE 0 1',
      'RIGHT_BRACE 1 1',
      'EOF 2 0',
    ]);
    expect(lexer.tokens.map((t) => t.toHumanReadable(source))).toEqual([
      'LEFT_BRACE { 1:1 - 1:2',
      'RIGHT_BRACE } 1:2 - 1:3',
      'EOF  1:3 - 1:3',
    ]);
  });

  it(`works for 'entityDef "mysprite" {}'`, () => {
    const source = 'entityDef "mysprite" {}';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toHumanReadable(source))).toEqual([
      'ENTITY_DEF entityDef 1:1 - 1:10',
      'STRING "mysprite" 1:11 - 1:21',
      'LEFT_BRACE { 1:22 - 1:23',
      'RIGHT_BRACE } 1:23 - 1:24',
      'EOF  1:24 - 1:24',
    ]);
  });

  it(`works for 'health 15'`, () => {
    const source = 'health 15';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toHumanReadable(source))).toEqual([
      'IDENTIFIER health 1:1 - 1:7',
      'NUMBER 15 1:8 - 1:10',
      'EOF  1:10 - 1:10',
    ]);
  });

  it(`works for negative number '-15'`, () => {
    const source = '-15';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toHumanReadable(source))).toEqual([
      'NUMBER -15 1:1 - 1:4',
      'EOF  1:4 - 1:4',
    ]);
  });

  it('works for an empty multiline entityDef', () => {
    const source = `entityDef "mysprite"
{
}`;
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toHumanReadable(source))).toEqual([
      'ENTITY_DEF entityDef 1:1 - 1:10',
      'STRING "mysprite" 1:11 - 1:21',
      'LEFT_BRACE { 2:1 - 2:2',
      'RIGHT_BRACE } 3:1 - 3:2',
      'EOF  3:2 - 3:2',
    ]);
  });

  it('works for an empty multiline entityDef', () => {
    const source = `entityDef "mysprite"
{
}`;
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toHumanReadable(source))).toEqual([
      'ENTITY_DEF entityDef 1:1 - 1:10',
      'STRING "mysprite" 1:11 - 1:21',
      'LEFT_BRACE { 2:1 - 2:2',
      'RIGHT_BRACE } 3:1 - 3:2',
      'EOF  3:2 - 3:2',
    ]);
  });
});
