import {Activities} from '../../../types/interfaces/activities';

export const removeActivity = (
  {activities, activitiesIDs}: Activities,
  activityName: string,
): Activities => {
  const newActivities = {
    activities: {...activities},
    activitiesIDs: [...activitiesIDs.filter(val => val !== activityName)],
  };

  delete newActivities.activities[activityName];

  return newActivities;
};
