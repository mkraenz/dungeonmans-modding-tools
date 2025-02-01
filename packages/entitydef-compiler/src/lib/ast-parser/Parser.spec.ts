import { Lexer } from '../lexer/Lexer.js';
import { Parser } from './Parser.js';

it('works for an empty entitydef', () => {
  // from https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters
  const source = `entitydef "modmans_mod_mold_sprite"
{
}`;
  const lexer = new Lexer(source);
  lexer.tokenize();
  const parser = new Parser(lexer.tokens, source);

  const ast = parser.toAst();

  expect(ast).toMatchObject({
    keyValuePairs: [],
    name: {
      lexeme: '"modmans_mod_mold_sprite"',
      type: 'STRING',
    },
  });
});

// TODO implement functionality in parser
it.skip('works for a sprite entityDef', () => {
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
  const parser = new Parser(lexer.tokens, source);

  const ast = parser.toAst();

  expect(ast).toMatchObject({
    name: {
      lexeme: '"modmans_mod_mold_sprite"',
      type: 'STRING',
    },
    keyValuePairs: [{}, {}, {}, {}, {}],
  });
});
