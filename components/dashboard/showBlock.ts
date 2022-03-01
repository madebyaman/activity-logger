/**
 * Returns if a block should be allowed to edit.
 * @param to Date -- time where the current block ends
 * @returns boolean -- true if `to` is less than current time
 */
export const showBlock = (to: Date): boolean => {
  const currentTime = new Date(Date.now());
  // Why?
  // B/c server stores time in zero zone, but client has current time in local zone. So we need to remove 'Z' from the end of the string.
  const removeTimeZoneSignifier = to
    .toString()
    .substring(0, to.toString().length - 1);
  return new Date(removeTimeZoneSignifier) <= currentTime;
};
