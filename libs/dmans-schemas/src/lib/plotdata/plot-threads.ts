export function dmansSchemas(): string {
  return 'dmans-schemas';
}

export type DmPlot = {
  [key: string]: DmPlotThread | DmPlotScript | DmDialogData | DmDropItemHook[];
};

export type DmPlotThread = {
  classType: 'dmPlotThread';
  plotStateLookup: DmPlotStateLookup;
  dialogHooks: DmDialogHook[];
};
export type DmPlotStateLookup = {
  unstarted: 0;
} & Record<string, number>;
export type DmDialogHook = {
  targetArc: string;
  stateEquals: string;
  dialogOptions: DmDialogOption[];
};
export type DmDialogOption = {
  message: string;
  responseScript: string;
};

export type DmPlotScript = {
  classType: 'dmPlotScript';
  setThisState: string;
  dialogArchetype: string;
  removeItems: Record<string, number>;
  tossItems: Record<string, number>;
};

export type DmDialogData = {
  classType: 'dmDialogData';
  title: string;
  message: string;
  soundToPlay: string;
  instigatorSprite: string;
  responses: DmDialogOption[];
};

export type DmDropItemHook = {
  /**
   * In which plot state has this item a chance to drop?
   * Must match a key in a dmPlotThread's "plotStateLookup", for example "unstarted". */
  stateEquals: string;
  /** What kind of monsters drop the item? */
  targetMonsterKnowledge: string[];
  /** What item will be dropped? Reference to an entitydef in itemdata/ */
  dropArchetype: string;
  /** What is the probability that a monster in the `targetMonsterKnowledge` array will drop the item?
   * @maximum 1.0
   * @minimum 0.0
   */
  dropChance: number;
};
