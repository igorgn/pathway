import {Activity} from '../../../types/interfaces/activities';

export const createActivity = (name: string, id: string): Activity => ({
  daysIDs: [],
  id,
  name,
  days: {},
});
