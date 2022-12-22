/**
 * Returns if a block should be allowed to edit.
 */
export const showBlock = (to: Date): boolean => {
  const currentTime = new Date();
  const currentTimeInUTC = currentTime.toUTCString();
  const toTime = new Date(to);
  const toTimeInUTC = toTime.toUTCString();
  console.log(currentTimeInUTC, toTimeInUTC);
  return new Date(currentTimeInUTC) > new Date(toTimeInUTC);
};
