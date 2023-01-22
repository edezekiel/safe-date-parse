import { isValid, parseISO, parse } from 'date-fns';
import {
  MaybeDate,
  MaybeValidDate,
  SafeDateParser,
} from './safe-date-parse.types';

export const dateFnsSafeParse: SafeDateParser = (
  value: MaybeValidDate
): MaybeDate => {
  if (value === undefined || value === null) {
    return undefined;
  }
  const date = value instanceof Date ? value : new Date(value); // Warning, ISO 8601 without time (e.g., '2023-01-01') is converted to UTC not Local Timezone

  return isValid(date) ? date : undefined;
};

export const dateFnsParseISO = (iso: string): MaybeDate => {
  return isValid(new Date(iso)) ? parseISO(iso) : undefined;
};

export const dateFnsParse = (str: string): MaybeDate => {
  return isValid(new Date(str))
    ? parse(str, 'MM/dd/yyyy', new Date())
    : undefined;
};
