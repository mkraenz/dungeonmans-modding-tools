import { DoubleDigit } from '../ts-utils.js';

/**
 * The base damage an attack does. A string triple of format "damage_type,dice_roll,???".
 * - List of damage types: melee, ranged, fire, ice, dark, starlight, poison, bleed.
 *   It might be that you can also combine multiple types using an & character, for example "melee&dark&poison,1d6+35,0" but I am not sure whether that works and what exactly it does.
 * - dice_roll can be either a number or the TTRPG dice notation.
 * - ??? I think this is always 0 for damage dealt. This third number only becomes relevant for `damagetaken01` properties where it seems to represent how much more damage is being taken by this type of attack, effectively meaning elemental weaknesses.
 * @examples ["melee,1,0", "fire,2d8+30,0", "poison,1,0"]
 */
export type Damage = string;
/** Reference to an entity of class "dmSpecialPower" in specialpowerdata/. */
export type PowerRef = string;

type WithMeleeDamage = {
  [key in `meleedamage_${DoubleDigit}`]?: Damage;
};
type WithRangedDamage = {
  [key in `rangeDamage_${DoubleDigit}`]?: Damage;
};
type WithPower = {
  [key in `power_${DoubleDigit}`]?: PowerRef;
};
type WithChampionPower = {
  [key in `championpower_${DoubleDigit}`]?: PowerRef;
};

export type DmMonsterKnowledge =
  | 'scrobolds'
  | 'lesser_beasts'
  | 'greater_beasts'
  | 'punks'
  | 'bandits'
  | 'bees'
  | 'brigands'
  | 'lizardmens'
  | 'orcs'
  | 'undeads'
  | 'warlords'
  | 'cultists'
  | 'purpleonians'
  | 'slimes'
  | 'snakes'
  | 'scorpocompys';

/** @asType integer */
type Integer = number;

/** Docs at https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters */
export type DmMonster = {
  /** The type of class. Constant. */
  class: 'dmMonster';
  /** Whether it is blocked to swap places with the target by bumping into the target. Typically true, i.e. monsters block your path and vice-versa. */
  bBlockTileEntry: true;
  /** reference to an entitydef inside spritedata/ */
  sprite: string;
  /** Display name */
  name: string;
  /** @asType integer */
  health: number;
  /** Reference to an entitydefs of class dmCoins inside ActorData/coins.txt */
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

  /** Whether the actor has ranged attacks. If true, set the several properties starting with ranged* and tooclosedistance. */
  hasRanged: boolean;
  /** TODO: This probably is the projectile sprite.  */
  rangedAttackSprite?: string;
  rangedAttackRange?: Integer;
  /**
   * Integer or Dice roll string
   */
  rangedattackrecharge?: Integer | string;
  tooclosedistance?: Integer;

  knowledge: DmMonsterKnowledge;
  /** @asType integer */
  base_defeatarmor: Integer;
  /** What particle effect draws in the world when this guy attacks? */
  basicattackparticle: string;
  /** What sound plays when this monster attacks? */
  attack_sfx: string;
  /**
   * Monsters drop steaks of themselves sometimes, and those steaks can be used to feed your birds
   * so they learn powers. Comma-separated string of four values "drop_chance,tough_or_swift,melee_or_ranged,power":
   * - Odds of dropping a steak on death, 1 to 100 integer value.
   * - Tough or Swift? -1 for tough, 0 for neither, 1 for Swift.
   * - Melee or Ranged? -1 for melee, 0 for neither, 1 for Ranged.
   * - Powers that can be learned by your bird for eating this steak. Reference to an entity in specialpowerdata/.
   */
  steakdata?: string;
  banter: string;
} & WithMeleeDamage &
  WithRangedDamage &
  WithPower &
  WithChampionPower;

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
