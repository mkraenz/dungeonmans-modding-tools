import { Lexer } from './Lexer';

it('returns the correct tokens "{}"', () => {
  const source = '{}';
  const lexer = new Lexer(source);

  lexer.tokenize();

  expect(lexer.tokens).toEqual([
    { type: 'LEFT_BRACE', offset: 0, length: 1, lexeme: '{' },
    { type: 'RIGHT_BRACE', offset: 1, length: 1, lexeme: '}' },
    { type: 'EOF', offset: 2, length: 0, lexeme: '' },
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
  expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
    'LEFT_BRACE { 1:1 - 1:2',
    'RIGHT_BRACE } 1:2 - 1:3',
    'EOF  1:3 - 1:3',
  ]);
});

it(`works for 'entityDef "mysprite" {}'`, () => {
  const source = 'entityDef "mysprite" {}';
  const lexer = new Lexer(source);

  lexer.tokenize();

  expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
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

  expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
    'IDENTIFIER health 1:1 - 1:7',
    'NUMBER 15 1:8 - 1:10',
    'EOF  1:10 - 1:10',
  ]);
});

describe('NUMBER', () => {
  it(`turns negative integer numbers into NUMBER`, () => {
    const source = '-15';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
      'NUMBER -15 1:1 - 1:4',
      'EOF  1:4 - 1:4',
    ]);
  });

  it(`turns zero into NUMBER`, () => {
    const source = '0';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
      'NUMBER 0 1:1 - 1:2',
      'EOF  1:2 - 1:2',
    ]);
  });

  it(`turns positive floating point number into NUMBER`, () => {
    const source = '0.1';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
      'NUMBER 0.1 1:1 - 1:4',
      'EOF  1:4 - 1:4',
    ]);
  });

  it(`turns negative floating point numbers into NUMBER`, () => {
    const source = '-0.1';
    const lexer = new Lexer(source);

    lexer.tokenize();

    expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
      'NUMBER -0.1 1:1 - 1:5',
      'EOF  1:5 - 1:5',
    ]);
  });
});

it(`works for identifier with subscript 'meleedamage_01 123`, () => {
  const source = 'meleedamage_01 123';
  const lexer = new Lexer(source);

  lexer.tokenize();

  expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
    'IDENTIFIER meleedamage_01 1:1 - 1:15',
    'NUMBER 123 1:16 - 1:19',
    'EOF  1:19 - 1:19',
  ]);
});

it(`works for string with commas 'meleedamage_01 melee,1,0'`, () => {
  const source = 'meleedamage_01 melee,1,0';
  const lexer = new Lexer(source);

  lexer.tokenize();

  expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
    'IDENTIFIER meleedamage_01 1:1 - 1:15',
    'IDENTIFIER melee,1,0 1:16 - 1:25',
    'EOF  1:25 - 1:25',
  ]);
});

it(`works for dice roll 'modmans_mod_mold	1d4+1'`, () => {
  const source = 'modmans_mod_mold 1d4+1';
  const lexer = new Lexer(source);

  lexer.tokenize();

  expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
    'IDENTIFIER modmans_mod_mold 1:1 - 1:17',
    'STRING 1d4+1 1:18 - 1:23',
    'EOF  1:23 - 1:23',
  ]);
});

it(`works for ranged damage 'rangedDamage_01 fire,2d8+30,0'`, () => {
  const source = 'rangedDamage_01 fire,2d8+30,0';
  const lexer = new Lexer(source);

  lexer.tokenize();

  expect(lexer.tokens.map((t) => t.prettyPrint(source))).toEqual([
    'IDENTIFIER rangedDamage_01 1:1 - 1:16',
    'IDENTIFIER fire,2d8+30,0 1:17 - 1:30',
    'EOF  1:30 - 1:30',
  ]);
});
