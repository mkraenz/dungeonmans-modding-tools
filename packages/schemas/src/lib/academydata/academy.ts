import { DoubleDigit } from '../ts-utils.js';

type WithExtraActors = {
  [key in `extraactor_${DoubleDigit}`]?: string;
};

export type DmAcademyExtraData = {
  class: 'dmAcademyExtraData';
} & WithExtraActors;
