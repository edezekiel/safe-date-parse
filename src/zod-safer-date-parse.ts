import { z } from 'zod';
import {
  MaybeDate,
  MaybeValidDate,
  SafeDateParser,
} from './safe-date-parse.types';

export const zodSaferDateParse: SafeDateParser = (
  value: MaybeValidDate
): MaybeDate => {
  if (value === null || value === undefined) {
    return undefined;
  }

  const maybeDate =
    value instanceof Date
      ? z.date().safeParse(value)
      : z.coerce.date().safeParse(value); // Allows new Date(null) despite tsconfig "strict" setting

  return maybeDate.success 
    ? maybeDate.data 
    : undefined;
};
