import {Activities} from '../../../types/interfaces/activities';
import {PatchActivityBody} from '../../../types/interfaces/patch-activity-body';
import {cloneDeep} from 'lodash';
import {createActivityDay} from './create-activity-day';

export const markActivityDay = (
  activities: Activities,
  {id, dayID}: PatchActivityBody,
) => {
  const completedDays = activities.activities[id].daysIDs;
  const isDayCompleted = completedDays.includes(dayID);

  const activitiesCopy: Activities = cloneDeep(activities);

  if (isDayCompleted) {
    activitiesCopy.activities[id].daysIDs = sortDays(
      filterDayCompleted(completedDays, dayID),
    );
    delete activitiesCopy.activities[id].days[dayID];
  } else {
    activitiesCopy.activities[id].daysIDs = sortDays(
      addCompletedDay(completedDays, dayID),
    );
    activitiesCopy.activities[id].days[dayID] = createActivityDay(dayID);
  }

  return activitiesCopy;
};

const filterDayCompleted = (completedDays: string[], dayID: string) =>
  completedDays.filter(day => day !== dayID);

const addCompletedDay = (completedDays: string[], dayID: string) => [
  ...completedDays,
  dayID,
];

const sortDays = (days: string[]) => days.sort();
