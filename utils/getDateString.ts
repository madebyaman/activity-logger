/**
 * Convert date to string
 * @param date Date to be converted to string
 * @returns Date in 'mm/dd/yyyy' format
 */
export const getDateString = (date: Date = new Date()) => {
  let today = date;
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // b/c Jan == 0
  const yyyy = today.getFullYear();
  return mm + '/' + dd + '/' + yyyy;
};
