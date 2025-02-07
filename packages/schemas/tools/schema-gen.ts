import fs from 'fs';
import { EOL } from 'os';
import path from 'path';
import tsj from 'ts-json-schema-generator';
import type { Config } from 'ts-json-schema-generator/dist/src/Config';

// usage node --experimental-strip-types ./tools/schema-gen.ts
// usage node --experimental-strip-types ./tools/schema-gen.ts Actor
// usage node --experimental-strip-types ./tools/schema-gen.ts <regex for TS type>

const [_nodeExecutable, _script, typePattern] = process.argv;
if (typePattern) console.log('type filter:', typePattern);

const configs = [
  { type: 'DmAcademy', out: 'academy' },
  { type: 'DmMonster', out: 'monster' },
  { type: 'DmMonsters', out: 'monsters' },
  { type: 'DmTownsmans', out: 'townsmans' },
  { type: 'DmActors', out: 'actors' },
  { type: 'DmBirdTextures', out: 'bird-textures' },
  { type: 'DmEncounters', out: 'encounters' },
  { type: 'DmEncounter', out: 'encounter' },
  { type: 'DmItemConsumable', out: 'item-consumable' },
  { type: 'DmItems', out: 'items' },
  { type: 'DmItemNonAcademyTurnIn', out: 'item-non-academy-turn-in' },
  { type: 'DmSetBonuses', out: 'set-bonuses' },
  { type: 'DmSpecialPower', out: 'special-power' },
  { type: 'DmSummonPower', out: 'summon-power' },
  { type: 'DmSpecialPowers', out: 'powers' },
  { type: 'DmSprites', out: 'sprites' },
  { type: 'DmItemSprite', out: 'item-sprite' },
  { type: 'DmItemSprites', out: 'item-sprites' },
  { type: 'DmMonsterSprite', out: 'monster-sprite' },
  { type: 'DmMonsterSprites', out: 'monster-sprites' },
  { type: 'DmStatusEffects', out: 'status-effects' },
  { type: 'DmEncounterTable', out: 'encounter-table' },
  { type: 'DmEncounterTables', out: 'encounter-tables' },
  { type: 'DmPlot', out: 'plot' },
  { type: 'DmPerk', out: 'perk' },
  { type: 'DmMastery', out: 'mastery' },
  { type: 'DmSyllabus', out: 'syllabus' },
  { type: 'DmCurriculum', out: 'curriculum' },
  { type: 'DmGameSystems', out: 'game-systems' },
]
  .filter((c) =>
    typePattern === '' ? true : new RegExp(typePattern, 'i').test(c.type)
  )
  .map(
    ({ type, out }) =>
      ({
        path: path.join(import.meta.dirname, '..', 'src', 'lib', '**', '*.ts'),
        tsconfig: path.join(import.meta.dirname, '..', 'tsconfig.json'),
        type,
        out,
      } satisfies Config & { out: string })
  );

console.log('Found configs:', configs.length);

const deepSortKeysAlphabetically = (key, value) =>
  value instanceof Object && !(value instanceof Array)
    ? Object.keys(value)
        .sort()
        .reduce((sorted, key) => {
          sorted[key] = value[key];
          return sorted;
        }, {})
    : value;

for (const config of configs) {
  const outputPath = path.join(
    import.meta.dirname,
    '..',
    'gen',
    `${config.out}.schema.json`
  );
  const schema = tsj.createGenerator(config).createSchema(config.type);
  const schemaString = JSON.stringify(schema, deepSortKeysAlphabetically, 2);
  fs.writeFileSync(outputPath, schemaString);
  fs.appendFileSync(outputPath, EOL);
}
