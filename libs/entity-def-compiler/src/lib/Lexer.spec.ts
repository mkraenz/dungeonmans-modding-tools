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
  it('should work for "{}"', () => {
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
          lexeme: '}',
          start: { col: 1, line: 1 },
        },
        type: 'EOF',
      },
    ]);
  });

  it(`should work for 'entityDef "mysprite" {}'`, () => {
    const source = 'entityDef "mysprite" {}';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toString())).toEqual([
      'ENTITY_DEF entityDef 1:0 - 1:9',
      'STRING mysprite 1:10 - 1:20',
      'LEFT_BRACE { 1:21 - 1:21',
      'RIGHT_BRACE } 1:22 - 1:22',
      'EOL  1:23 - 1:23',
    ]);

    // expect(lexer.tokens).toEqual([
    //   {
    //     loc: {
    //       lexeme: 'entityDef',
    //       start: { col: 0, line: 1 },
    //       end: { col: 9, line: 1 },
    //     },
    //     type: 'ENTITY_DEF',
    //   },
    //   {
    //     loc: {
    //       lexeme: 'mysprite',
    //       start: { col: 10, line: 1 },
    //       end: { col: 20, line: 1 },
    //     },
    //     type: 'STRING',
    //   },
    //   {
    //     loc: {
    //       lexeme: '{',
    //       start: { col: 21, line: 1 },
    //       end: { col: 22, line: 1 },
    //     },
    //     type: 'LEFT_BRACE',
    //   },
    //   {
    //     loc: {
    //       lexeme: '}',
    //       start: { col: 22, line: 1 },
    //       end: { col: 23, line: 1 },
    //     },
    //     type: 'RIGHT_BRACE',
    //   },
    //   {
    //     loc: {
    //       lexeme: '',
    //       start: { col: 24, line: 1 },
    //       end: { col: 24, line: 1 },
    //     },
    //     type: 'EOF',
    //   },
    // ]);
  });
});
