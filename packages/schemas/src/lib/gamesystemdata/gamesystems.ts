export type DmMagicModifier = {
  /** The type of class. Constant. */
  class: 'dmMagicModifier';
  wargear?: boolean;
  /**
   * Strength added or subtracted by the modifier.
   * @asType integer
   */
  str?: number;
  /**
   * Skill added or subtracted by the modifier.
   * @asType integer
   */
  skl?: number;
  /**
   * Science added or subtracted by the modifier.
   * @asType integer
   */
  sci?: number;
  /**
   * Foom added or subtracted by the modifier.
   * @asType integer
   */
  foom?: number;
  /** Prefix for building weapon or armor names, e.g. "Smarty", "Doomswarm". */
  prefix?: string;
  /**
   * Used for proc modifier.
   * Damage dealt as either an integer, a dice roll, or a string of the format `type,roll,percent modifier`, for example "dark,2d4,0".
   *
   * Most percent modifiers are 0.0 centric, meaning 0.2 == 20% increase, -0.2 == 20% decrease.
   */
  damagedealt_01?: string;
  /**
   * Used for proc modifier.
   * Format: [name of proc],[chance on hit, where 1.0 is 100%],"[Text to display on the enchanted item.]".
   * For example `doomsting_proc_01,0.05,"Rarely blasts your foes with bees` */
  proc_on_hit?: string;
} & ({ wargear: true } | { prefix: string });

/**
 * Perks are character modifications besides those from items.
 * At the beginning of the game you choose 2 perks.
 */
export type DmPerk = {
  /** The type of class. Constant. */
  class: 'dmPerk';
  /** Display name */
  name: string;
  description: string;
  /** Flavor text */
  flavor: string;
  /**
   * Powers that the player has access to because they have this perk.
   * Remember, as you move through the Mastery, the Perk should include all the previous powers available.
   *
   * Reference to an entity with class `dmSpecialPower` in specialpowerdata/.
   */
  power_1: string;
  /**
   * Powers that the player has access to because they have this perk.
   * Remember, as you move through the Mastery, the Perk should include all the previous powers available.
   *
   * Reference to an entity with class `dmSpecialPower` in specialpowerdata/.
   */
  power_2?: string;
  /**
   * Powers that the player has access to because they have this perk.
   * Remember, as you move through the Mastery, the Perk should include all the previous powers available.
   *
   * Reference to an entity with class `dmSpecialPower` in specialpowerdata/.
   */
  power_3?: string;
  /** The power that is enabled by clicking this button in the UI, or dragging this button to a hotbar. */
  grantedpower: string;
  /** Reference to an entity in spritedata. Dimensions should be width 50px, height 50px, though your content should be within the 48x48px inner square. */
  icon: string;
  /** Some Syllabi grant scaling power based on how many perks you've taken from their masteries.
   * If you want to do that, your classrank value should be the mastery category you want to increase,
   * followed by the value of this perk. Usually 1, 2, or 3. */
  classRank?: string;
};

/**
 * A Mastery is a collection of perks.
 * IMPORTANT: When a Mastery grants you a Perk, it removes the previous perk granted.
 * Check the docs for how to best work with this behavior.
 *
 * Docs at https://dungeonmans.fandom.com/wiki/Curriculum_and_Masteries
 */
export type DmMastery = {
  /** The type of class. Constant. */
  class: 'dmMastery';
  /** Display name of the mastery. */
  masteryName: string;
  /** Description of the mastery. */
  masteryDescription: string;
  /** How many perks are there in this mastery? */
  maxperks: 1 | 2 | 3;
} & (
  | {
      maxperks: 1;
      /** Reference to an entity of class `dmPerk` in gamesystemdata/. */
      perk1: string;
    }
  | {
      maxperks: 2;
      /** Reference to an entity of class `dmPerk` in gamesystemdata/. */
      perk1: string;
      /** Reference to an entity of class `dmPerk` in gamesystemdata/. */
      perk2?: string;
    }
  | {
      maxperks: 3;
      /** Reference to an entity of class `dmPerk` in gamesystemdata/. */
      perk1: string;
      /** Reference to an entity of class `dmPerk` in gamesystemdata/. */
      perk2?: string;
      /** Reference to an entity of class `dmPerk` in gamesystemdata/. */
      perk3?: string;
    }
);

/**
 * A Syllabus is a collection of Masteries.
 * You may have referred to this as a "Class" because it's the classification that most closely
 * matches classes from other RPGs. Fightermans, Wizardmans, etc.
 */
export type DmSyllabus = {
  /** The type of class. Constant. */
  class: 'dmSyllabus';
  /** Reference to an entity in spritedata/. Dimensions should be width 100px, height 70px. */
  button: string;
  /** Reference to an entity in spritedata/. Dimensions should be width 256px, height 512px. */
  background: string;
  /** */
  category: string;
  /** Display name at the top of the window. */
  title: string;
  /** Reference to an entity of class `dmMastery` in gamesystemdata/. */
  mastery_01: string;
  /** Reference to an entity of class `dmMastery` in gamesystemdata/. */
  mastery_02?: string;
  /** Reference to an entity of class `dmMastery` in gamesystemdata/. */
  mastery_03?: string;
  /** Reference to an entity of class `dmMastery` in gamesystemdata/. */
  mastery_04?: string;
  /** Reference to an entity of class `dmMastery` in gamesystemdata/. */
  mastery_05?: string;
  /**
   * Reference to code to grant a title to the player for each rank.
   * Format <namespace>.<functionname>
   */
  func_determinerank?: string;
};

/**
 * The curriculum is a collection of all the syllabi presented to the player at the academy.
 * It is the the skill tree in its entirety.
 *
 * The core game uses `vanilla_curriculum` and your mods can add to or subtract from that list.
 *
 * You should only have a single curriculum for your mod.
 */
export type DmCurriculum = {
  /** The type of class. Constant. */
  class: 'dmCurriculum';
  /**
   * Must be set to true for this curriculum to be applied to the vanilla one.
   * Without this flag, your curriculum will be ignored.
   */
  modify: true;

  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_01?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_02?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_03?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_04?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_05?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_06?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_07?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_08?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_09?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_10?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_11?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_12?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_13?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_14?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */
  add_15?: string;
  /**
   * Adds the syllabus to the game's vanilla_curriculum list.
   * Reference to an entity of class `dmSyllabus` in gamesystemdata/.
   */

  /** If set, removes the respective syllabus in the vanilla_curriculum from the modded game. */
  remove_01?: 'syllabus_adventure_101';
  /** If set, removes the respective syllabus in the vanilla_curriculum from the modded game. */
  remove_02?: 'syllabus_armor';
  /** If set, removes the respective syllabus in the vanilla_curriculum from the modded game. */
  remove_03?: 'syllabus_fightermans';
  /** If set, removes the respective syllabus in the vanilla_curriculum from the modded game. */
  remove_04?: 'syllabus_wizardmans';
  /** If set, removes the respective syllabus in the vanilla_curriculum from the modded game. */
  remove_05?: 'syllabus_rangermans';
  /** If set, removes the respective syllabus in the vanilla_curriculum from the modded game. */
  remove_06?: 'syllabus_necromansy';
  /** If set, removes the respective syllabus in the vanilla_curriculum from the modded game. */
  remove_07?: 'syllabus_bannermans';
  /** If set, removes the respective syllabus in the vanilla_curriculum from the modded game. */
  remove_08?: 'syllabus_southern_gentlemans';
  /** If set, removes the respective syllabus in the vanilla_curriculum from the modded game. */
  remove_09?: 'syllabus_psychomanser';
  /** If set, removes the respective syllabus in the vanilla_curriculum from the modded game. */
  remove_10?: 'syllabus_outdoorsmans';
  /** If set, removes the respective syllabus in the vanilla_curriculum from the modded game. */
  remove_11?: 'syllabus_field_work';
  /** If set, removes the respective syllabus in the vanilla_curriculum from the modded game. */
  remove_12?: 'syllabus_masters_program';
};

/**
 * Dictionary from entityDef name to DmMagicModifier, DmPerk, DmMastery, DmSyllabus, or DmCurriculum.
 */
export type DmGameSystems = {
  [entityDefName: string]:
    | DmMagicModifier
    | DmPerk
    | DmMastery
    | DmSyllabus
    | DmCurriculum;
};
