/**
 * A function to combine class names
 * @param classes string
 * @returns classnames string joined together by space
 */
export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(' ');
