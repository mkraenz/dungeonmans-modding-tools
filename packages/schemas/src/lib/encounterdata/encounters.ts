/**
 * Besides the class, every key should be a monster entitydef.
 * The value should be either an integer number or a dice roll.
 * Example1: {..., modmans_mod_mold: 1 }
 * Example2: {..., modmans_mod_mold: "1d4+1"}
 */
export type DmEncounter = {
  class: 'dmEncounterData';
  /** Value should be an integer or a dice roll string. */
  [K: string]: string | number;
};

const _test: DmEncounter = {
  class: 'dmEncounterData',
  modmans_mod_mold: 1,
  modmans_mod_moldbla: '1d4+1',
};

/**
 * Dictionary from entitydef name to DmEncounter.
 * Docs at https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters
 */
export type DmEncounters = {
  [entityDefName: string]: DmEncounter;
};
