// Please separate code utils from test utils, we usualy have utils specific for tests, under test-utils or smth, and regular utils for code, where code and tests do not share functions between them.
import {ActivityWeek} from '../types/interfaces/Activities';

const day1 = new Date();
const day2 = new Date();
const day3 = new Date();
const day4 = new Date();
const day5 = new Date();

day1.setFullYear(2021, 2, 29);
day2.setFullYear(2021, 3, 5);
day3.setFullYear(2021, 3, 12);
day4.setFullYear(2021, 3, 19);
day5.setFullYear(2021, 3, 26);

const weeks = [day1, day2, day3, day4, day5];

const week1: ActivityWeek = {
  keys: [
    '2021-03-29',
    '2021-03-30',
    '2021-03-31',
    '2021-04-01',
    '2021-04-02',
    '2021-04-03',
    '2021-04-04',
  ],
  days: {
    '2021-03-29': {
      dayKey: '2021-03-29',
      weekKey: '2021-03-29',
      completed: false,
    },
    '2021-03-30': {
      dayKey: '2021-03-30',
      weekKey: '2021-03-29',
      completed: false,
    },
    '2021-03-31': {
      dayKey: '2021-03-31',
      weekKey: '2021-03-29',
      completed: false,
    },
    '2021-04-01': {
      dayKey: '2021-04-01',
      weekKey: '2021-03-29',
      completed: false,
    },
    '2021-04-02': {
      dayKey: '2021-04-02',
      weekKey: '2021-03-29',
      completed: false,
    },
    '2021-04-03': {
      dayKey: '2021-04-03',
      weekKey: '2021-03-29',
      completed: false,
    },
    '2021-04-04': {
      dayKey: '2021-04-04',
      weekKey: '2021-03-29',
      completed: false,
    },
  },
};

const week2: ActivityWeek = {
  keys: [
    '2021-04-05',
    '2021-04-06',
    '2021-04-07',
    '2021-04-08',
    '2021-04-09',
    '2021-04-10',
    '2021-04-11',
  ],
  days: {
    '2021-04-05': {
      dayKey: '2021-04-05',
      weekKey: '2021-04-05',
      completed: false,
    },
    '2021-04-06': {
      dayKey: '2021-04-06',
      weekKey: '2021-04-05',
      completed: false,
    },
    '2021-04-07': {
      dayKey: '2021-04-07',
      weekKey: '2021-04-05',
      completed: false,
    },
    '2021-04-08': {
      dayKey: '2021-04-08',
      weekKey: '2021-04-05',
      completed: false,
    },
    '2021-04-09': {
      dayKey: '2021-04-09',
      weekKey: '2021-04-05',
      completed: false,
    },
    '2021-04-10': {
      dayKey: '2021-04-10',
      weekKey: '2021-04-05',
      completed: false,
    },
    '2021-04-11': {
      dayKey: '2021-04-11',
      weekKey: '2021-04-05',
      completed: false,
    },
  },
};

const week3: ActivityWeek = {
  keys: [
    '2021-04-12',
    '2021-04-13',
    '2021-04-14',
    '2021-04-15',
    '2021-04-16',
    '2021-04-17',
    '2021-04-18',
  ],
  days: {
    '2021-04-12': {
      dayKey: '2021-04-12',
      weekKey: '2021-04-12',
      completed: false,
    },
    '2021-04-13': {
      dayKey: '2021-04-13',
      weekKey: '2021-04-12',
      completed: false,
    },
    '2021-04-14': {
      dayKey: '2021-04-14',
      weekKey: '2021-04-12',
      completed: false,
    },
    '2021-04-15': {
      dayKey: '2021-04-15',
      weekKey: '2021-04-12',
      completed: false,
    },
    '2021-04-16': {
      dayKey: '2021-04-16',
      weekKey: '2021-04-12',
      completed: false,
    },
    '2021-04-17': {
      dayKey: '2021-04-17',
      weekKey: '2021-04-12',
      completed: false,
    },
    '2021-04-18': {
      dayKey: '2021-04-18',
      weekKey: '2021-04-12',
      completed: false,
    },
  },
};

const week4: ActivityWeek = {
  keys: [
    '2021-04-19',
    '2021-04-20',
    '2021-04-21',
    '2021-04-22',
    '2021-04-23',
    '2021-04-24',
    '2021-04-25',
  ],
  days: {
    '2021-04-19': {
      dayKey: '2021-04-19',
      weekKey: '2021-04-19',
      completed: false,
    },
    '2021-04-20': {
      dayKey: '2021-04-20',
      weekKey: '2021-04-19',
      completed: false,
    },
    '2021-04-21': {
      dayKey: '2021-04-21',
      weekKey: '2021-04-19',
      completed: false,
    },
    '2021-04-22': {
      dayKey: '2021-04-22',
      weekKey: '2021-04-19',
      completed: false,
    },
    '2021-04-23': {
      dayKey: '2021-04-23',
      weekKey: '2021-04-19',
      completed: false,
    },
    '2021-04-24': {
      dayKey: '2021-04-24',
      weekKey: '2021-04-19',
      completed: false,
    },
    '2021-04-25': {
      dayKey: '2021-04-25',
      weekKey: '2021-04-19',
      completed: false,
    },
  },
};

const week5: ActivityWeek = {
  keys: [
    '2021-04-26',
    '2021-04-27',
    '2021-04-28',
    '2021-04-29',
    '2021-04-30',
    '2021-05-01',
    '2021-05-02',
  ],
  days: {
    '2021-04-26': {
      dayKey: '2021-04-26',
      weekKey: '2021-04-26',
      completed: false,
    },
    '2021-04-27': {
      dayKey: '2021-04-27',
      weekKey: '2021-04-26',
      completed: false,
    },
    '2021-04-28': {
      dayKey: '2021-04-28',
      weekKey: '2021-04-26',
      completed: false,
    },
    '2021-04-29': {
      dayKey: '2021-04-29',
      weekKey: '2021-04-26',
      completed: false,
    },
    '2021-04-30': {
      dayKey: '2021-04-30',
      weekKey: '2021-04-26',
      completed: false,
    },
    '2021-05-01': {
      dayKey: '2021-05-01',
      weekKey: '2021-04-26',
      completed: false,
    },
    '2021-05-02': {
      dayKey: '2021-05-02',
      weekKey: '2021-04-26',
      completed: false,
    },
  },
};

const weekKeys = [
  '2021-03-29',
  '2021-04-05',
  '2021-04-12',
  '2021-04-19',
  '2021-04-26',
];

const formattedWeeks = {
  ['2021-03-29']: week1,
  ['2021-04-05']: week2,
  ['2021-04-12']: week3,
  ['2021-04-19']: week4,
  ['2021-04-26']: week5,
};

const today = day2;

export const formatWeeksMockData = {weeks, formattedWeeks, weekKeys, today};
