export const mktValueFmt = (
  mktValue: number,
  locale: Intl.LocalesArgument = "en-US",
  currency: string = "USD"
): string =>
  mktValue.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });
