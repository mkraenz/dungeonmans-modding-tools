type DmSpriteBase = {
  /** filename *without* the .png file ending inside textures/ */
  texturename: string;
  /** @asType integer */
  xloc: number;
  /** @asType integer */
  yloc: number;
};

export type DmItemSprite = DmSpriteBase;
/** A map from entityDefName to the values inside that entitydef. The name will appear in in `entityDef "<NAME_HERE>". The value is used to generate the body of the entityDef. */
export type DmItemSprites = {
  [entityDefName: string]: DmItemSprite;
};

export type DmMonsterSprite = DmSpriteBase & {
  width: 80;
  height: 128;
};

/** A map from entityDefName to the values inside that entitydef. The name will appear in in `entityDef "<NAME_HERE>". The value is used to generate the body of the entityDef. */
export type DmMonsterSprites = {
  [entityDefName: string]: DmMonsterSprite;
};
