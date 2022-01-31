// Initialize a blank state to start tracking activities
// Why did I use two loops? One for initializing state and other for rendering state
// B/c I don't want to reinitialize initial state every time react re-renders the component. This would create lot of overhead problem.

type TimeLog = {
  from: Date;
  to: Date;
  hour: number;
};

export const getToday = (date: Date = new Date()) => {
  let today = date;
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // b/c Jan == 0
  const yyyy = today.getFullYear();
  return mm + '/' + dd + '/' + yyyy;
};

export default function timeBlocks(noOfBlocksPerHour: number) {
  let initialTimeLog: TimeLog[] = [];

  Array.from(Array(24).keys()).map((hour) => {
    Array.from(Array(noOfBlocksPerHour).keys()).map((block) => {
      let fromMinutes;
      // toMinutes will always be 15, 30, 45 or 60.
      const toMinutes = (60 / noOfBlocksPerHour) * (block + 1);
      if (block === 0) {
        fromMinutes = 0;
      } else {
        fromMinutes = (60 / noOfBlocksPerHour) * block + 1;
      }
      const from = new Date(Date.now());
      from.setHours(hour);
      from.setMinutes(fromMinutes);
      from.setSeconds(0);
      const to = new Date(Date.now());
      to.setHours(hour);
      to.setMinutes(toMinutes);
      to.setSeconds(0);
      initialTimeLog.push({
        from,
        to,
        hour,
      });
    });
  });
  return initialTimeLog;
}
