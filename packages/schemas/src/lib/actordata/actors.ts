import { DoubleDigit } from '../ts-utils.js';

type WithMeleeDamage = {
  [key in `meleedamage_${DoubleDigit}`]?: string;
};
type WithRangedDamage = {
  [key in `rangeDamage_${DoubleDigit}`]?: string;
};
type WithPower = {
  [key in `power_${DoubleDigit}`]?: string;
};
export type DmMonster = {
  class: 'dmMonster';
  bBlockTileEntry: true;
  /** reference to an entitydef inside spritedata/ */
  sprite: string;
  name: string;
  /** @asType integer */
  health: number;
  /** entitydefs of class dmCoins inside ActorData/coins.txt */
  cointype:
    | (string & {})
    | 'copper_coins_small'
    | 'copper_coins_medium'
    | 'copper_coins_large'
    | 'copper_coins_huge'
    | 'silver_coins_small'
    | 'silver_coins_medium'
    | 'silver_coins_large'
    | 'silver_coins_huge'
    | 'gold_coins_small'
    | 'gold_coins_medium'
    | 'gold_coins_large'
    | 'gold_coins_huge';
  /** @asType integer */
  level: number;
  /** @asType integer */
  scale_min: number;
  /** @asType integer */
  scale_max: number;
  scale_adjusthealth: number;
  scale_adjustdamage: number;
  // yep, max 9 meleedamage. We could get more complicated using `[key in `meleedamage_${digit}${digit}`]?: string` but i'm not sure whether it works with the json schema generation. Anyway, 9 types of meleedamage should probably suffice for a good while.
  nametable: string;
  hasRanged: boolean;

  rangedAttackSprite?: string;
  /** @asType integer */
  rangedAttackRange?: number;
  /** @asType integer */
  rangedattackrecharge?: number;
  /** @asType integer */
  tooclosedistance?: number;

  knowledge: string;
  /** @asType integer */
  base_defeatarmor: number;
  basicattackparticle: string;
  attack_sfx: string;
  steakdata?: string;
  banter: string;
} & WithMeleeDamage &
  WithRangedDamage &
  WithPower;

/**
 * Dictionary from entitydef name to DmMonster.
 * Docs at https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters
 */
export type DmMonsters = {
  [entityDefName: string]: DmMonster;
};

/** Your friendly neighborhood NPC. */
export type DmTownsmans = {
  class: 'dmTownsmans';
  bBlockTileEntry: true;
  /** Reference to an entitydef inside spritedata/ */
  sprite: string;
  /** Display name */
  name: string;
  /**
   * @asType integer
   * @default 9999
   */
  health: number;
  /** @default false */
  bBlockSameArchetype: boolean;
  /** Reference to a dialog of classType `dmDialogData` in plotdata/ */
  dialog_onBumped: string;
};

/**
 * Dictionary from entitydef name to DmMonster or DmTownsmans.
 * Docs at for monsters as https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters
 */
export type DmActors = {
  [entityDefName: string]: DmMonster | DmTownsmans;
};
