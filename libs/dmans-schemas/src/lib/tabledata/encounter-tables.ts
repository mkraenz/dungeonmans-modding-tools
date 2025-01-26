/** A map from entityDefName to the values inside that entitydef. The name will appear in in `entityDef "<NAME_HERE>". The value is used to generate the body of the entityDef. */
export type DmEncounterTables = {
  /** @ref https://raw.githubusercontent.com/mkraenz/dungeonmans-modding-tools/refs/heads/main/libs/dmans-schemas/gen/encounter-tables.schema.json */
  [entityDefName: string]: Record<string, unknown>;
};
