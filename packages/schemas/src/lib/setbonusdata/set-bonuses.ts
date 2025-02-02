import { NonZeroDigit } from '../ts-utils.js';

type WithDescription = {
  [K in `desc_${NonZeroDigit}`]?: string;
};
type WithEffect = {
  [K in `effect_${NonZeroDigit}`]?: string;
};

/** Defines what bonuses an item set provides. */
export type DmSetBonus = {
  /** Reference to value of `itemset` for equipment entitydefs under itemdata/ */
  set: string;
  /** Display name */
  setname: string;
  /**
   * Total number of items in the set.
   * @asType integer
   */
  pieces: number;
  /** Description for the set bonus at x number of pieces */
  desc_1?: string;
  /** Description for the set bonus at x number of pieces */
  desc_2?: string;
  /** Description for the set bonus at x number of pieces */
  desc_3?: string;
  /** Description for the set bonus at x number of pieces */
  desc_4?: string;
  /** Description for the set bonus at x number of pieces */
  desc_5?: string;
  /** Description for the set bonus at x number of pieces */
  desc_6?: string;
  /** Description for the set bonus at x number of pieces */
  desc_7?: string;
  /** Description for the set bonus at x number of pieces */
  desc_8?: string;
  /** Description for the set bonus at x number of pieces */
  desc_9?: string;
  /**
   * The effect of the set bonus at x number of pieces.
   * Reference to an entitydef name in statuseffectdata/.
   */
  effect_1?: string;
  /**
   * The effect of the set bonus at x number of pieces.
   * Reference to an entitydef name in statuseffectdata/.
   */
  effect_2?: string;
  /**
   * The effect of the set bonus at x number of pieces.
   * Reference to an entitydef name in statuseffectdata/.
   */
  effect_3?: string;
  /**
   * The effect of the set bonus at x number of pieces.
   * Reference to an entitydef name in statuseffectdata/.
   */
  effect_4?: string;
  /**
   * The effect of the set bonus at x number of pieces.
   * Reference to an entitydef name in statuseffectdata/.
   */
  effect_5?: string;
  /**
   * The effect of the set bonus at x number of pieces.
   * Reference to an entitydef name in statuseffectdata/.
   */
  effect_6?: string;
  /**
   * The effect of the set bonus at x number of pieces.
   * Reference to an entitydef name in statuseffectdata/.
   */
  effect_7?: string;
  /**
   * The effect of the set bonus at x number of pieces.
   * Reference to an entitydef name in statuseffectdata/.
   */
  effect_8?: string;
  /**
   * The effect of the set bonus at x number of pieces.
   * Reference to an entitydef name in statuseffectdata/.
   */
  effect_9?: string;
};
/** Dictionary from entityDef name to DmSetBonus. */
export type DmSetBonuses = {
  [entityDefName: string]: DmSetBonus;
};
