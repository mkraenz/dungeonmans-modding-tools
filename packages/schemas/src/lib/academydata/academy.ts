import { DoubleDigit } from '../ts-utils.js';
type WithExtraActors = {
  [key in `extraactor_${DoubleDigit}`]?: string;
};

type SpawnLocationNextTo =
  | 'headmaster'
  | 'librarian'
  | 'alchemist'
  | 'curator'
  | 'research'
  | 'armorer'
  | 'gravedigger'
  | 'battlemaster'
  | 'hatch'
  | 'pigfarmer';

/**
 * A string tuple of format "reference_to_an_actor,spawn_location".
 * reference_to_an_actor must be an entity in actordata/.
 * spawn_location must be one of the following values: 'headmaster, librarian, alchemist, curator, research, armorer, gravedigger, battlemaster, hatch, pigfarmer'
 * Example: "extractor": "mymod_npc,headmaster"
 */
export type ExtraActor = `${string},${SpawnLocationNextTo}`;

/** You can use this to add new NPCs to the academy. */
export type DmAcademyExtraData = {
  class: 'dmAcademyExtraData';
  extraactor_01?: ExtraActor;
  extraactor_02?: ExtraActor;
  extraactor_03?: ExtraActor;
  extraactor_04?: ExtraActor;
  extraactor_05?: ExtraActor;
  extraactor_06?: ExtraActor;
  extraactor_07?: ExtraActor;
  extraactor_08?: ExtraActor;
  extraactor_09?: ExtraActor;
  extraactor_10?: ExtraActor;
  extraactor_11?: ExtraActor;
  extraactor_13?: ExtraActor;
  extraactor_14?: ExtraActor;
  extraactor_15?: ExtraActor;
  extraactor_16?: ExtraActor;
  extraactor_17?: ExtraActor;
  extraactor_18?: ExtraActor;
  extraactor_19?: ExtraActor;
  extraactor_20?: ExtraActor;
};

/** Dictionary from entitydef name to DmAcademyExtraData. */
export type DmAcademy = {
  [entityDefName: string]: DmAcademyExtraData;
};
