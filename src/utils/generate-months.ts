import {
  endOfMonth,
  startOfMonth,
  eachDayOfInterval,
  format,
  eachWeekOfInterval,
  addDays,
} from 'date-fns';
import {
  ActivityDay,
  ActivityMonth,
  ActivityWeek,
} from '../types/interfaces/activities';

const DATE_FORMAT = 'yyyy-MM-dd';
const DAYS_TO_ADD_TO_WEEK = 6;

export const generateKey = (date: Date) => format(date, DATE_FORMAT);

export const generateKeysArr = (dates: Date[]) =>
  dates.map(day => format(day, DATE_FORMAT));

export const formatDay = (dayKey: string, weekKey: string): ActivityDay => ({
  dayKey,
  weekKey,
  completed: false,
});

export const formatDays = (dates: Date[], weekKey: string) => {
  return dates.reduce((acc, cv) => {
    const dayKey = generateKey(cv);
    return {
      ...acc,
      [dayKey]: formatDay(dayKey, weekKey),
    };
  }, {});
};

export const formatWeek = (days: Date[], weekKey: string): ActivityWeek => {
  return {
    keys: generateKeysArr(days),
    days: formatDays(days, weekKey),
  };
};

export const formatWeeks = (weeks: Date[]): Record<string, ActivityWeek> => {
  return weeks.reduce((acc, cv) => {
    const weekKey = generateKey(cv);
    const days = eachDayOfInterval({
      start: cv,
      end: addDays(cv, DAYS_TO_ADD_TO_WEEK),
    });

    return {
      ...acc,
      [weekKey]: formatWeek(days, weekKey),
    };
  }, {});
};

const generateMonths = (day: Date): ActivityMonth => {
  const firstDayOfAMonth = startOfMonth(new Date(day));
  const lastDayOfAMonth = endOfMonth(firstDayOfAMonth);

  const weeks = eachWeekOfInterval(
    {
      start: firstDayOfAMonth,
      end: lastDayOfAMonth,
    },
    {weekStartsOn: 1},
  );

  return {
    keys: generateKeysArr(weeks),
    weeks: formatWeeks(weeks),
  };
};

export default generateMonths;
