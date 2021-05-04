import {Activities} from '../../../types/interfaces/activities';

export const findActivityFromName = (activities: Activities, name: string) => {
  const activitiesArr = activities.activitiesIDs.map(
    id => activities.activities[id],
  );

  const activity = activitiesArr.find(val => val.name === name);

  return activity;
};
