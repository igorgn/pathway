/* eslint-env  jest */

import {ActivityDay, ActivityWeek} from '../../src/types/interfaces/activities';
import generateMonths, {
  formatDay,
  formatDays,
  formatWeek,
  generateKey,
  generateKeysArr,
} from '../../src/utils/generate-months';
import {formatWeeksMockData} from '../mock-data/mock-data';

describe('generate month object consisting of week and weeks consisting of days', () => {
  it('should return date string e.g.: 2021-04-01', () => {
    const day = new Date();
    day.setFullYear(2021, 3, 1);
    expect(generateKey(day)).toEqual('2021-04-01');
  });

  it('should return array of date strings e.g.: [2021-04-01, 2021-04-02]', () => {
    const day1 = new Date();
    const day2 = new Date();

    day1.setFullYear(2021, 3, 1);
    day2.setFullYear(2021, 3, 2);

    const days = [day1, day2];

    expect(generateKeysArr(days)).toEqual(['2021-04-01', '2021-04-02']);
  });

  it('should return formatted activity day object', () => {
    const dayKey = '2021-04-01';
    const weekKey = '2021-04-01';

    const day: ActivityDay = {
      dayKey,
      weekKey,
      completed: false,
    };

    expect(formatDay(dayKey, weekKey)).toEqual(day);
  });

  it('should return formatted week object', () => {
    // weekKey is first day of week
    const weekKey = '2021-03-31';

    const day1 = new Date();
    const day2 = new Date();

    day1.setFullYear(2021, 2, 31);
    day2.setFullYear(2021, 3, 1);

    const days = [day1, day2];

    const weekDays: Record<string, ActivityDay> = {
      ['2021-03-31']: {
        dayKey: '2021-03-31',
        weekKey,
        completed: false,
      },
      ['2021-04-01']: {
        dayKey: '2021-04-01',
        weekKey,
        completed: false,
      },
    };

    expect(formatDays(days, weekKey)).toEqual(weekDays);
  });

  it('should return formatted week', () => {
    // weekKey is first day of week
    const weekKey = '2021-04-01';

    const day1 = new Date();
    const day2 = new Date();
    const day3 = new Date();
    const day4 = new Date();
    const day5 = new Date();
    const day6 = new Date();
    const day7 = new Date();

    day1.setFullYear(2021, 3, 1);
    day2.setFullYear(2021, 3, 2);
    day3.setFullYear(2021, 3, 3);
    day4.setFullYear(2021, 3, 4);
    day5.setFullYear(2021, 3, 5);
    day6.setFullYear(2021, 3, 6);
    day7.setFullYear(2021, 3, 7);

    const days = [day1, day2, day3, day4, day5, day6, day7];

    const week: ActivityWeek = {
      keys: [
        '2021-04-01',
        '2021-04-02',
        '2021-04-03',
        '2021-04-04',
        '2021-04-05',
        '2021-04-06',
        '2021-04-07',
      ],
      days: {
        '2021-04-01': {
          dayKey: '2021-04-01',
          weekKey: '2021-04-01',
          completed: false,
        },
        '2021-04-02': {
          dayKey: '2021-04-02',
          weekKey: '2021-04-01',
          completed: false,
        },
        '2021-04-03': {
          dayKey: '2021-04-03',
          weekKey: '2021-04-01',
          completed: false,
        },
        '2021-04-04': {
          dayKey: '2021-04-04',
          weekKey: '2021-04-01',
          completed: false,
        },
        '2021-04-05': {
          dayKey: '2021-04-05',
          weekKey: '2021-04-01',
          completed: false,
        },
        '2021-04-06': {
          dayKey: '2021-04-06',
          weekKey: '2021-04-01',
          completed: false,
        },
        '2021-04-07': {
          dayKey: '2021-04-07',
          weekKey: '2021-04-01',
          completed: false,
        },
      },
    };

    expect(formatWeek(days, weekKey)).toEqual(week);
  });

  it('should return formatted weeks', () => {
    expect(generateMonths(formatWeeksMockData.today)).toEqual({
      keys: formatWeeksMockData.weekKeys,
      weeks: formatWeeksMockData.formattedWeeks,
    });
  });
});
