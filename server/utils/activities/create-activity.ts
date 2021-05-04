import {Activity} from '../../../types/interfaces/activities';

export const createActivity = (name: string): Activity => ({
  daysIDs: [],
  id: name,
  name,
  days: {},
});
