export function removeTimezone(date: string): Date {
  return new Date(date.substring(0, 19));
}
