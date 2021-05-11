import {Activities} from '../types/interfaces/activities';

const emptyActivities: Activities = {
  activities: {},
  activitiesIDs: [],
};

const oneActivityZeroDaysCompleted: Activities = {
  activities: {
    ['test-uuid']: {
      daysIDs: [],
      id: 'test-uuid',
      name: 'Yoga',
      days: {},
    },
  },
  activitiesIDs: ['test-uuid'],
};

const oneActivityOneDayCompleted: Activities = {
  activities: {
    ['test-uuid']: {
      daysIDs: ['2021-05-01'],
      id: 'test-uuid',
      name: 'Yoga',
      days: {
        '2021-05-01': {
          id: '2021-05-01',
          completed: true,
        },
      },
    },
  },
  activitiesIDs: ['test-uuid'],
};

const emptyActivitiesState = {
  activities: emptyActivities,
};

export const mockActivitiesStorageData = {
  emptyActivitiesState,
  emptyActivities,
  oneActivityZeroDaysCompleted,
  oneActivityOneDayCompleted,
  activityName: 'Yoga',
  dayToMark: '2021-05-01',
  id: 'test-uuid',
};
