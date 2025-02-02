type DmSpriteBase = {
  /** filename *without* the .png file ending inside textures/ */
  texturename: string;
  /** @asType integer */
  xloc: number;
  /** @asType integer */
  yloc: number;
};

export type DmItemSprite = DmSpriteBase;
/** A map from entityDefName to the values inside that entitydef. The name will appear in `entityDef "<NAME_HERE>". The value is used to generate the body of the entityDef. */
export type DmItemSprites = {
  [entityDefName: string]: DmItemSprite;
};

export type DmMonsterSprite = DmSpriteBase & {
  /** Only needed for monsters, npcs, and other actors. Not needed for Item sprites.  */
  width: 80;
  /** Only needed for monsters, npcs, and other actors. Not needed for Item sprites.  */
  height: 128;
};

/** A map from entityDefName to the values inside that entitydef. The name will appear in `entityDef "<NAME_HERE>". The value is used to generate the body of the entityDef. */
export type DmMonsterSprites = {
  [entityDefName: string]: DmMonsterSprite;
};

/** A map from entityDefName to the values inside that entitydef. The name will appear in `entityDef "<NAME_HERE>". The value is used to generate the body of the entityDef. */
export type DmSprites = {
  [entityDefName: string]: DmMonsterSprite | DmItemSprite;
};
