import { sub, format } from 'date-fns';

export function dateString(offset: number) {
  const date = sub(new Date(), { minutes: offset });
  return format(date, 'MM/dd/y');
}
