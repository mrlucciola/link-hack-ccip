export const fmtCenterEllipsis = (
  text: string,
  charsI: number = 5,
  charsF: number | null = null
): string => {
  const charsCtF = charsF ? charsF : charsI;
  // first 5 chars
  const startStr = text.slice(0, charsI + 1);
  const endStr = text.slice(text.length - charsCtF);
  return `${startStr}...${endStr}`;
};
