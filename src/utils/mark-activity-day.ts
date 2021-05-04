import {cloneDeep} from 'lodash';
import {Activities} from '../../types/interfaces/activities';
import {PatchActivityBody} from '../../types/interfaces/patch-activity-body';
import {createActivityDay} from './create-activity-day';

export const markActivityDay = (
  activities: Activities,
  {name, dayID}: PatchActivityBody,
) => {
  const completedDays = activities.activities[name].daysIDs;
  const isDayCompleted = completedDays.includes(dayID);

  const activitiesCopy: Activities = cloneDeep(activities);

  const removeDay = () => {
    activitiesCopy.activities[name].daysIDs = sortDays(
      filterDayCompleted(completedDays, dayID),
    );
    delete activitiesCopy.activities[name].days[dayID];
  };

  const addDayAsCompleted = () => {
    activitiesCopy.activities[name].daysIDs = sortDays(
      addCompletedDay(completedDays, dayID),
    );
    activitiesCopy.activities[name].days[dayID] = createActivityDay(dayID);
  };

  if (isDayCompleted) {
    removeDay();
  } else {
    addDayAsCompleted();
  }

  return activitiesCopy;
};

const filterDayCompleted = (completedDays: string[], dayID: string) =>
  completedDays.filter(day => day !== dayID);

const addCompletedDay = (completedDays: string[], dayID: string) => [
  ...completedDays,
  dayID,
];

const sortDays = (days: string[]) => [...days].sort();
