export type DmStatStatusEffect = {
  /** The type of class. Constant. */
  class: 'dmStatusEffect';
  /**
   * Displayed text when the status effect is applied.
   * @example ["^5[victim]^7 loves modded items!"]
   */
  appliedtext: string;
  statuscode: string;
  /**
   * Strength added or subtracted by the status effect.
   * @asType integer
   */
  str?: number;
  /**
   * Skill added or subtracted by the status effect.
   * @asType integer
   */
  skl?: number;
  /**
   * Science added or subtracted by the status effect.
   * @asType integer
   */
  sci?: number;
  /**
   * Foom added or subtracted by the status effect.
   * @asType integer
   */
  foom?: number;
  /** Whether the status effect is permanent or not. */
  endless: boolean;
  /**
   * How many rounds the status effect last.
   * @asType integer
   */
  duration?: number;
  /** Display name in the Character sheet menu. */
  charsheetname: string;
  /** Description in the Character sheet menu. */
  charsheetdesc: string;
};

type DmAiChangerEffect = {
  // class	dmStatusEffect

  // appliedtext "^5[victim]^7 is using script to decide how to move."

  // duration	5

  // script_aimovement	modmans_mods.only_move_left
  // react_takehit	modmans_mods.yell_about_being_hit

  /** The type of class. Constant. */
  class: 'dmStatusEffect';
  /**
   * Displayed text when the status effect is applied.
   * @example ["^5[victim]^7 loves modded items!"]
   */
  appliedtext: string;
  /**
   * How many rounds  the status effect last.
   * @asType integer
   */
  duration?: number;
  /**
   * Reference to a function inside a file in code/.
   * For example, setting \"script_aimovement\" to \"modmans_mods.only_move_left\" means your script lives
   * in code/modmans_mods.cs and within the class ScriptFunctions you have a method named `only_move_left`
   */
  script_aimovement: string;
  /**
   * Reference to a function inside a file in code/.
   * For example, setting \"react_takehit\" to \"modmans_mods.yell_about_being_hit\" means your script lives
   * in code/modmans_mods.cs and within the class ScriptFunctions you have a method named `yell_about_being_hit`
   */
  react_takehit: string;
};

/** Dictionary from entityDef name to DmStatStatusEffect or DmAiChangerEffect. */
export type DmStatusEffects = {
  [entityDefName: string]: DmStatStatusEffect | DmAiChangerEffect;
};
