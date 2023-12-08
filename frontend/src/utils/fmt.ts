export const fmtMktValue = (
  mktValue: number,
  locale: Intl.LocalesArgument = "en-US",
  currency: string = "USD"
): string =>
  mktValue.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });

/** ### Format number value to a comma-separated string
 * @param input - Number may include decimal values.*/
export const fmtNumberCommas = (input: number): string =>
  input.toLocaleString();

/** Set precision for a given number
 * @param isRoundUp - When reducing precision, should number be rounded-down. Defaults to `false`
 */
// export const setPrecision = (input: number): number => {};
