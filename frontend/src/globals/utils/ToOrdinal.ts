export function toOrdinal(n: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const value = n % 100;
  const suffix = value >= 11 && value <= 13 ? suffixes[0] : suffixes[n % 10] || suffixes[0];
  return `${n}${suffix}`;
}
