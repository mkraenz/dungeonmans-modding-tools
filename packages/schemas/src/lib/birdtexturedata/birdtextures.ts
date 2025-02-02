export type DmBirdTexture = {
  class: 'dmBirdTexture';
  name: string;
  basetexture: string;
  masktexture: string;
};

/**
 * Dictionary from entitydef name to DmBirdTexture.
 * Docs at for monsters as https://dungeonmans.fandom.com/wiki/Mods:_Adding_Monsters
 */
export type DmBirdTextures = {
  [entityDefName: string]: DmBirdTexture;
};
