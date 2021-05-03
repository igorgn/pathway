import {Activities} from '../types/interfaces/activities';

const emptyActivities: Activities = {
  activities: {},
  activitiesIDs: [],
};

const oneActivityZeroDaysCompleted: Activities = {
  activities: {
    ['Yoga']: {
      daysIDs: [],
      id: 'Yoga',
      name: 'Yoga',
      days: {},
    },
  },
  activitiesIDs: ['Yoga'],
};

const oneActivityOneDayCompleted: Activities = {
  activities: {
    ['Yoga']: {
      daysIDs: ['2021-05-01'],
      id: 'Yoga',
      name: 'Yoga',
      days: {
        '2021-05-01': {
          id: '2021-05-01',
          completed: true,
        },
      },
    },
  },
  activitiesIDs: ['Yoga'],
};

export const mockActivitiesStorageData = {
  emptyActivities,
  oneActivityZeroDaysCompleted,
  oneActivityOneDayCompleted,
  activityName: 'Yoga',
  dayToMark: '2021-05-01',
};
