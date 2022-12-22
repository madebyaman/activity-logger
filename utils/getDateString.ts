import { add, format } from 'date-fns';

// Date in 12/16/2022
export function dateString(offset: number) {
  const date = add(new Date(), { minutes: 720 - offset });
  return format(date, 'MM/dd/y');
}
