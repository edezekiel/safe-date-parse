import { z } from 'zod';
import {
  MaybeDate,
  MaybeValidDate,
  SafeDateParser,
} from './safe-date-parse.types';

export const zodSafeParse: SafeDateParser = (
  value: MaybeValidDate
): MaybeDate => {
  if (value === undefined || value === null) {
    return undefined;
  }
  const maybeDate =
    value instanceof Date
      ? z.date().safeParse(value)
      : z.coerce.date().safeParse(value);

  return maybeDate.success ? maybeDate.data : undefined;
};
