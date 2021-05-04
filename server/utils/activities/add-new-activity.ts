import {Activities} from '../../../types/interfaces/activities';
import {createActivity} from './create-activity';

export const addNewActivity = (
  {activities, activitiesIDs}: Activities,
  activityName: string,
) => ({
  activities: {
    ...activities,
    [activityName]: createActivity(activityName),
  },
  activitiesIDs: [...activitiesIDs, activityName],
});
