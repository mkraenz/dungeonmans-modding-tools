export type DmItemNonAcademyTurnIn = {
  class: 'dmNonAcademyTurnIn';
  /** @examples ["Broken Shovel Handle"] */
  name: string;
  /**
   * Reference to a spritedata entitydef
   * @examples ["modplot_item_shovel_handle_sprite"]
   */
  sprite: string;
  /** @examples ["A fancy yet clearly broken shovel handle."] */
  description: string;
  /** @examples ["Someone who really likes shovels spent some time with this."] */
  flavorText: string;
  identified: boolean;
  /** @asType integer */
  value: number;
  stackable: boolean;
  /**
   * A tuple of strings separated by a comma.
   * The 1st string is a reference to a key in plotdata/ of classType `dmPlotThread`.
   * The 2nd string is a key in the dmPlotThread's `plotStateLookup`.
   * The state of the plot thread will be set to this value after collecting the item.
   * @examples ["modplot,found_mod_plot_item"]
   */
  plotthread_advance: string;
};

export type DmItemConsumable = {
  class: 'dmConsumable';
  /** @examples ["Pete's Lucky Bell"] */
  name: string;
  /**
   * Reference to a spritedata/ entitydef
   * @examples ["modplot_item_pete_reward_sprite"]
   */
  sprite: string;
  /** @examples ["Ring this lucky bell to summon some shambling undead help in time of need."] */
  description: string;
  /** @examples ["How does summoning work? We don't know."] */
  flavorText: string;
  identified: boolean;
  /** @asType integer */
  uses: number;
  /** @examples ["Summoning Bell"] */
  itemtype: string;
  /** @asType integer */
  value: number;
  /** @asType integer */
  itemrank: 5;
  /** Reference to a specialpowerdata/ entitydef
   * @examples ["sp_modplot_pete_lucky_bell"] */
  power_1: string;
};

/** A map from entityDefName to the values inside that entitydef. The name will appear in `entityDef "<NAME_HERE>". The value is used to generate the body of the entityDef. */
export type DmItems = {
  [entityDefName: string]: DmItemConsumable | DmItemNonAcademyTurnIn;
};
