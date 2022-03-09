export function calculateDiffInYears(d2: Date, d1: Date): number {
  return Math.floor(
    (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );
}

export function calculateDiffInMonths(d2: Date, d1: Date): number {
  // https://stackoverflow.com/a/2536445
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months % 12;
}

export function calculateDiffInWeeks(d2: Date, d1: Date) {
  return (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24 * 7);
}

export function convertDateForDatePicker(date: Date) {
  return date.toISOString().substring(0, 10);
}
