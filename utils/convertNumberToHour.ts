/**
 * Convert number to hour format
 * @param number Enum of type 0, ..., 23
 * @returns hour in string format like 12AM
 */
export const convertNumberToHour = (number: number): string => {
  const period = number >= 12 ? 'PM' : 'AM';
  const hour = number > 12 ? number - 12 : number === 0 ? 12 : number;
  return `${hour}${period}`;
};
