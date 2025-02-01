import { DoubleDigit } from '../ts-utils.js';

type WithSummonAlly = {
  /** ["friendly_skelebro,3d2"] */
  [key in `summonally_${DoubleDigit}`]?: string;
};

export type DmSummonPower = {
  class: 'dmSpecialPower';
  /** @examples ["Pete's Lucky Bell"] */
  powername: string;
  /** @default "No one will ever be able to read this." */
  menudescription: string;
} & WithSummonAlly;

export type DmSpecialPower = {
  class: 'dmSpecialPower';
  /** @examples ["So Many Bites!"] */
  powername: string;
  /** @default "No one will ever be able to read this." */
  menudescription: string;
  /** @asType integer */
  nummeleeattacks: number;
  /** @examples [-0.9] */
  damagemod: number;
  /**
   * @asType integer
   * @examples [1] */
  selectRange: number;
  /**
   * @asType integer
   * @examples [10] */
  bullrush: number;
  /** @examples ["axe_flurry_emitter"] */
  hitTargetEmitter: string;
  /**
   * Reference to a function inside a file in code/.
   * For example, setting "script" to "modmans_mods.somanybites" means your script lives in code/modmans_mods.cs and within the class ScriptFunctions you have a method named `somanybites`
   * @examples ["modmans_mods.somanybites"] */
  script: string;
};

/** A map from entityDefName to the values inside that entitydef. The name will appear in in `entityDef "<NAME_HERE>". The value is used to generate the body of the entityDef. */
export type DMSpecialPowers = {
  [entityDefName: string]: DmSpecialPower | DmSummonPower;
};
