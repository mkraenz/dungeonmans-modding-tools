import { DoubleDigit } from '../ts-utils.js';

type WithExtraActors = {
  [key in `extraactor_${DoubleDigit}`]?: ExtraActor;
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
} & WithExtraActors;

/** Dictionary from entitydef name to DmAcademyExtraData. */
export type DmAcademy = {
  [entityDefName: string]: DmAcademyExtraData;
};
