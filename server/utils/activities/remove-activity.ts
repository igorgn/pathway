import {Activities} from '../../../types/interfaces/activities';

export const removeActivity = (
  {activities, activitiesIDs}: Activities,
  id: string,
): Activities => {
  const newActivities = {
    activities: {...activities},
    activitiesIDs: [...activitiesIDs.filter(val => val !== id)],
  };

  delete newActivities.activities[id];

  return newActivities;
};
