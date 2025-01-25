export function dmansSchemas(): string {
  return 'dmans-schemas';
}

export type DmPlot = Record<string, DmPlotThread | DmPlotScript | DmDialogData>;

type DmPlotThread = {
  classType: 'dmPlotThread';
  plotStateLookup: PlotStateLookup;
  dialogHooks: DialogHook[];
};
type PlotStateLookup = {
  unstarted: number;
} & Record<string, number>;
type DialogHook = {
  targetArc: string;
  stateEquals: string;
  dialogOptions: DialogOption[];
};
type DialogOption = {
  message: string;
  responseScript: string;
};

type DmPlotScript = {
  classType: 'dmPlotScript';
  setThisState: string;
  dialogArchetype: string;
  removeItems: Record<string, number>;
  tossItems: Record<string, number>;
};

type DmDialogData = {
  classType: 'dmDialogData';
  title: string;
  message: string;
  soundToPlay: string;
  instigatorSprite: string;
  responses: Response[];
};
type Response = {
  message: string;
  responseScript: string;
};
