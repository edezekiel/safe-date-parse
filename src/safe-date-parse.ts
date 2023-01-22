import { MaybeDate, MaybeValidDate } from './safe-date-parse.types';

export const safeDateParse = (value: MaybeValidDate): MaybeDate => {
  const date =
    value instanceof Date
      ? new Date(value.getTime()) // value.getTime() returns NaN if Invalid Date
      : typeof value === 'number' || typeof value === 'string'
      ? new Date(value) // Warning, ISO 8601 without time (e.g., '2023-01-01') is converted to UTC not Local Timezone
      : new Date(NaN); // default to Invalid Date

  return !Number.isNaN(date.getTime()) ? date : undefined;
};
