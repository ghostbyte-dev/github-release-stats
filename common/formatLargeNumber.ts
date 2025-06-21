export const formatLargeNumber = (number: number): string => {
  return new Intl.NumberFormat(undefined, { notation: 'compact' }).format(number);
};
