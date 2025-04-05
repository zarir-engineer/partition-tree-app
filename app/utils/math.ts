// utils/math.ts

/**
 * Rounds a number to 3 significant figures.
 * Example: 0.041666667 -> 0.042, 0.001736111 -> 0.002
 */

export const roundToSigFigs = (num: number, sigFigs = 3) => {
  if (num === 0) return 0;
  const digits = Math.floor(Math.log10(Math.abs(num))) + 1;
  const factor = Math.pow(10, sigFigs - digits);
  return Math.round(num * factor) / factor;
};

export function roundToThreeSignificantFigures(num: number): number {
  if (num === 0) return 0;
  const digits = 3 - Math.floor(Math.log10(Math.abs(num))) - 1;
  return parseFloat(num.toPrecision(digits + 1));
}

/**
 * Formats a number to remove trailing zeroes after decimal.
 * Example: 0.040 -> '0.04', 1.000 -> '1'
 */
export function formatNumber(num: number): string {
  return parseFloat(num.toString()).toString();
}

/**
 * Recalculates and assigns equal value to children based on parent's value.
 * Uses 3 significant figures and removes trailing zeroes.
 */
export function distributeValueEvenly(
  parentValue: number,
  childCount: number
): number {
  if (childCount === 0) return 0;
  const rawShare = parentValue / childCount;
  return roundToThreeSignificantFigures(rawShare);
}
