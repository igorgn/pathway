import {Activities} from '../../../types/interfaces/activities';
import {createActivity} from './create-activity';
import {v4 as uuidv4} from 'uuid';

export const addNewActivity = (
  {activities, activitiesIDs}: Activities,
  activityName: string,
) => {
  const id = uuidv4();

  return {
    activities: {
      ...activities,
      [id]: createActivity(activityName, id),
    },
    activitiesIDs: [...activitiesIDs, id],
  };
};
