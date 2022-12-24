import { sub, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

// Date in 12/16/2022
export function dateString(offset: number) {
  const utcTime = zonedTimeToUtc(new Date(), 'Europe/London');
  const date = sub(utcTime, { minutes: offset });
  return format(date, 'MM/dd/y');
}
