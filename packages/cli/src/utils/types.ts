export type Filepath = string;
export type EntityName = string;

export type RefLocation = {
  filepath: Filepath;
  refValue: string;
  originalValue: string;
  jsonpath: string;
  /**
   * if true, the ref is not in the value but in the key of the key-value pair.
   * If false or undefined, that means the ref is in the value.
   *
   * Background: Some entities like DmEncounter or DmEncounterTable, list the monster ref in the key instead of the value. We still want to grab those for validation.
   */
  refInKey?: boolean;
};
