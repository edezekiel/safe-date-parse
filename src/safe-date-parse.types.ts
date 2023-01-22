export type MaybeValidDate = string | number | undefined | null | Date;

export type MaybeDate = Date | undefined;

export type SafeDateParser = (value: MaybeValidDate) => MaybeDate;
