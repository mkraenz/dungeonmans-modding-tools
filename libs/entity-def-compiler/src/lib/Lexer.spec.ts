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

  it(`works for identifier with subscript 'meleedamage_01 123`, () => {
    const source = 'meleedamage_01 123';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toHumanReadable(source))).toEqual([
      'IDENTIFIER meleedamage_01 1:1 - 1:15',
      'NUMBER 123 1:16 - 1:19',
      'EOF  1:19 - 1:19',
    ]);
  });

  it(`works for string with commas 'meleedamage_01 melee,1,0`, () => {
    const source = 'meleedamage_01 melee,1,0';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toHumanReadable(source))).toEqual([
      'IDENTIFIER meleedamage_01 1:1 - 1:15',
      'IDENTIFIER melee,1,0 1:16 - 1:25',
      'EOF  1:25 - 1:25',
    ]);
  });

  it(`works for dice roll 'modmans_mod_mold	1d4+1`, () => {
    const source = 'modmans_mod_mold 1d4+1';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toHumanReadable(source))).toEqual([
      'IDENTIFIER modmans_mod_mold 1:1 - 1:17',
      'STRING 1d4+1 1:18 - 1:23',
      'EOF  1:23 - 1:23',
    ]);
  });

  it('works for a sprite entityDef', () => {
    // from https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters
    const source = `entitydef "modmans_mod_mold_sprite"
{
  texturename monster_sprites
  xloc 0
  yloc 0
  width 80
  height 128
}`;
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.toHumanReadable(source))).toEqual([
      'ENTITY_DEF entitydef 1:1 - 1:10',
      'STRING "modmans_mod_mold_sprite" 1:11 - 1:36',
      'EOL  2:0 - 2:1',
      'LEFT_BRACE { 2:1 - 2:2',
      'EOL  3:0 - 3:1',
      'IDENTIFIER texturename 3:3 - 3:14',
      'IDENTIFIER monster_sprites 3:15 - 3:30',
      'EOL  4:0 - 4:1',
      'IDENTIFIER xloc 4:3 - 4:7',
      'NUMBER 0 4:8 - 4:9',
      'EOL  5:0 - 5:1',
      'IDENTIFIER yloc 5:3 - 5:7',
      'NUMBER 0 5:8 - 5:9',
      'EOL  6:0 - 6:1',
      'IDENTIFIER width 6:3 - 6:8',
      'NUMBER 80 6:9 - 6:11',
      'EOL  7:0 - 7:1',
      'IDENTIFIER height 7:3 - 7:9',
      'NUMBER 128 7:10 - 7:13',
      'EOL  8:0 - 8:1',
      'RIGHT_BRACE } 8:1 - 8:2',
      'EOF  8:2 - 8:2',
    ]);
  });
});
