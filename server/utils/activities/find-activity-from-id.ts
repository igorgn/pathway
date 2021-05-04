import {Activities} from '../../../types/interfaces/activities';

export const findActivityFromId = (activities: Activities, id: string) =>
  activities.activities[id];
