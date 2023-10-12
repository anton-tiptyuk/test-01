import { DateTime } from 'luxon';

// [
//   'Thu Jan 28 2021',
//   'Sun Feb 28 2021',
//   'Sun Mar 28 2021',
//   'Wed Apr 28 2021',
//   'Wed Apr 7 2021',
//   'Wed Apr 07 2021',
//   'Fri May 28 2021',
//   'Mon Jun 28 2021',
//   'Wed Jul 28 2021',
//   'Sat Aug 28 2021',
//   'Tue Sep 28 2021',
//   'Thu Oct 28 2021',
//   'Sun Nov 28 2021',
//   'Tue Dec 28 2021',
// ].forEach((dateStr) => {
//   console.log(dateStr, DateTime.fromFormat(dateStr, 'EEE MMM d yyyy').toISO());
// });

export const parseDumpDate = (dateStr: string) =>
  DateTime.fromFormat(dateStr, 'EEE MMM d yyyy', { zone: 'UTC' }).toJSDate();
