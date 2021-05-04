import {ActivityDay} from '../../types/interfaces/activities';

export const createActivityDay = (dayID: string): ActivityDay => ({
  completed: true,
  id: dayID,
});
