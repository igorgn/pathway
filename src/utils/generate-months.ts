import {
  endOfMonth,
  eachDayOfInterval,
  format,
  eachWeekOfInterval,
  endOfWeek,
} from 'date-fns';
import {eachMonthOfInterval} from 'date-fns/esm';
import {constants} from './constants';

export const generateIDs = (dates: Date[]) =>
  dates.map(day => format(day, constants.DAY_ID_DATE_FORMAT));

const formatWeeks = (weeks: Date[]) =>
  weeks.map(firstDayOfAWeek => {
    const lastDayOfAWeek = endOfWeek(firstDayOfAWeek);
    const days = eachDayOfInterval({
      start: firstDayOfAWeek,
      end: lastDayOfAWeek,
    });

    return generateIDs(days);
  });

const formatMonths = (months: Date[]) =>
  months.map(fistDayOfAMonth => {
    const lastDayOfAMonth = endOfMonth(fistDayOfAMonth);

    const weeks = eachWeekOfInterval({
      start: fistDayOfAMonth,
      end: lastDayOfAMonth,
    });
    return {weeks: formatWeeks(weeks), weeksIDs: generateIDs(weeks)};
  });

export const generateMonths = (daysIDs: string[]) => {
  const startDay = daysIDs[0] || new Date();
  const endDay = daysIDs[daysIDs.length - 1] || new Date();

  const months = eachMonthOfInterval({
    start: new Date(startDay),
    end: new Date(endDay),
  });

  return {moths: formatMonths(months), monthsIDs: generateIDs(months)};
};
