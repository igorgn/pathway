import {Activities} from '../../../types/interfaces/activities';

export const findActivity = (activities: Activities, id: string) =>
  activities.activities[id];
