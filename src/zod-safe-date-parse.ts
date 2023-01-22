import { z } from 'zod';
import {
  MaybeDate,
  MaybeValidDate,
  SafeDateParser,
} from './safe-date-parse.types';

export const zodSafeParse: SafeDateParser = (
  value: MaybeValidDate
): MaybeDate => {
  const maybeDate =
    value instanceof Date
      ? z.date().safeParse(value)
      : z.coerce.date().safeParse(value); // Allows new Date(null) despite tsconfig "strict" setting

  return maybeDate.success ? maybeDate.data : undefined;
};
