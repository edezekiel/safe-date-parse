import { dateFnsParseISO, dateFnsSafeParse } from './date-fns-safe-parse';
import { safeDateParse } from './safe-date-parse';
import { zodSafeParse } from './zod-safe-date-parse';

describe('SafeDateParsers should safely parse:', () => {
  describe('strings', () => {
    [
      { input: '2023/01/01', expected: new Date('2023/01/01') },
      { input: '2023-01-01', expected: new Date('2023-01-01') },
      { input: '2023-01', expected: new Date('2023-01') },
      {
        input: '2023-01-01T00:00:00.000Z',
        expected: new Date('2023-01-01T00:00:00.000Z'),
      },
      {
        input: '2023-01-01T12:52:34+09:00',
        expected: new Date('2023-01-01T12:52:34+09:00'),
      },
      { input: 'January 1, 2023', expected: new Date('January 1, 2023') },
      { input: '01/01/2023', expected: new Date('01/01/2023') },
      { input: 'Jan 1, 2023', expected: new Date('Jan 1, 2023') },
      { input: 'invalid', expected: undefined },
      { input: 'FebruMarch 100, 2099', expected: undefined },
      { input: '', expected: undefined },
      { input: '[object Object]', expected: undefined },
    ].forEach(({ input, expected }, i) => {
      it(`safeDateParse ${i}: should return ${expected}`, () => {
        // Act
        const result = safeDateParse(input);
        // Assert
        expect(result).toStrictEqual(expected);
      });
      it(`dateFns ${i}: should return ${expected}`, () => {
        // Act
        const result = dateFnsSafeParse(input);
        // Assert
        expect(result).toStrictEqual(expected);
      });
      it(`zod ${i}: should return ${expected}`, () => {
        // Act
        const result = zodSafeParse(input);
        // Assert
        expect(result).toStrictEqual(expected);
      });
    });
  });
  describe('ISO 8601 strings that do not have a time while defaulting to the Local Timezone', () => {
    [
      { input: '2023-01-01', expected: new Date(1672552800000) },
      { input: '2023-01', expected: new Date(1672552800000) },
    ].forEach(({ input, expected }, i) => {
      it(`dateFnsParseISO ${i}: should return ${expected}`, () => {
        // Act
        const result = dateFnsParseISO(input);
        // Assert
        expect(result).toStrictEqual(expected); // dateFnsParseISO _does_ coerce to Local Timezone
      });
    });
  });
  describe('Date objects', () => {
    [
      { input: new Date(), expected: new Date() },
      { input: Date.now(), expected: new Date(Date.now()) },
      { input: new Date(2023, 0, 1), expected: new Date(2023, 0, 1) },
      { input: new Date(null as any), expected: new Date(0) }, // allowed unless "strict": true is set in tsconfig
      { input: new Date(1674432000000), expected: new Date(1674432000000) },
      { input: new Date('2023-01-01'), expected: new Date('2023-01-01') },
      {
        input: new Date(2023, 10, 6, 2, 20),
        expected: new Date(2023, 10, 6, 2, 20),
      },
      { input: new Date(''), expected: undefined },
      { input: new Date(NaN), expected: undefined },
      { input: new Date(undefined as any), expected: undefined },
    ].forEach(({ input, expected }, i) => {
      it(`safeDateParse ${i}: should return ${expected}`, () => {
        // Act
        const result = safeDateParse(input);
        // Assert
        expect(result).toStrictEqual(expected);
      });
      it(`dateFns ${i}: should return ${expected}`, () => {
        // Act
        const result = dateFnsSafeParse(input);
        // Assert
        expect(result).toStrictEqual(expected);
      });
      it(`zod ${i}: should return ${expected}`, () => {
        // Act
        const result = zodSafeParse(input);
        // Assert
        expect(result).toStrictEqual(expected);
      });
    });
  });
  describe('numbers (timestamps)', () => {
    [
      { input: 0, expected: new Date(0) },
      { input: -0, expected: new Date(-0) },
      { input: -1, expected: new Date(-1) },
      { input: 1674432000000, expected: new Date(1674432000000) },
      { input: -1674432000000, expected: new Date(-1674432000000) },
      { input: parseFloat('1674432000000'), expected: new Date(1674432000000) },
      {
        input: parseFloat('-1674432000000'),
        expected: new Date(-1674432000000),
      },
      { input: 12142352463456346345, expected: undefined },
      { input: -12142352463456346345, expected: undefined },
    ].forEach(({ input, expected }, i) => {
      it(`safeDateParse ${i}: should return ${expected}`, () => {
        // Act
        const result = safeDateParse(input);
        // Assert
        expect(result).toStrictEqual(expected);
      });
      it(`dateFns ${i}: should return ${expected}`, () => {
        // Act
        const result = dateFnsSafeParse(input);
        // Assert
        expect(result).toStrictEqual(expected);
      });
      it(`zod ${i}: should return ${expected}`, () => {
        // Act
        const result = zodSafeParse(input);
        // Assert
        expect(result).toStrictEqual(expected);
      });
    });
  });
  describe('null', () => {
    it(`safeDateParse: should return undefined`, () => {
      // Act
      const result = safeDateParse(null);
      // Assert
      expect(result).toStrictEqual(undefined);
    });
    it(`dateFns: should return undefined`, () => {
      // Act
      const result = dateFnsSafeParse(null);
      // Assert
      expect(result).toStrictEqual(undefined);
    });
    it(`zod: should return the Unix Epoch start`, () => {
      // Act
      const result = zodSafeParse(null);
      // Assert
      /* zod allows null to be coerced into a Date. 
      Invoking new Date(null) generates an TypeScript error when "strict": true is set in the tsconfig.
      However, no error is thrown here with zod because of the `coerce`.
      */
      expect(result).toStrictEqual(new Date(0));
    });
  });
  describe('other primitives', () => {
    [
      { input: undefined, expected: undefined },
      { input: Infinity, expected: undefined },
      { input: -Infinity, expected: undefined },
      { input: NaN, expected: undefined },
      { input: -NaN, expected: undefined },
      { input: parseFloat('abc'), expected: undefined },
    ].forEach(({ input, expected }, i) => {
      it(`safeDateParse ${i}: should return ${expected}`, () => {
        // Act
        const result = safeDateParse(input);
        // Assert
        expect(result).toStrictEqual(expected);
      });
      it(`dateFns ${i}: should return ${expected}`, () => {
        // Act
        const result = dateFnsSafeParse(input);
        // Assert
        expect(result).toStrictEqual(expected);
      });
      it(`zod ${i}: should return ${expected}`, () => {
        // Act
        const result = zodSafeParse(input);
        // Assert
        expect(result).toStrictEqual(expected);
      });
    });
  });
});
