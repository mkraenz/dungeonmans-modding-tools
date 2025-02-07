import { DoubleDigit } from '../ts-utils.js';

type WithExtraActors = {
  [key in `extraactor_${DoubleDigit}`]?: string;
};

export type DmAcademyExtraData = {
  class: 'dmAcademyExtraData';
} & WithExtraActors;

/** Dictionary from entitydef name to DmAcademyExtraData. */
export type DmAcademy = {
  [entityDefName: string]: DmAcademyExtraData;
};
