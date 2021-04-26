import {createAction, createReducer} from '@reduxjs/toolkit';
import {Activity} from '../../types/interfaces/Activities';
import generateMonths from '../../utils/generateMonths';

interface State {
  activities: Record<string, Activity>;
  activitiesKeys: string[];
}

interface MarkCompletedPayload {
  weekKey: string;
  dayKey: string;
  name: string;
}

export const addActivity = createAction<string>('addActivity');
export const markCompleted = createAction<MarkCompletedPayload>(
  'markCompleted',
);

export const initialActivitiesState: State = {
  activities: {},
  activitiesKeys: [],
};

const activitiesReducer = createReducer(initialActivitiesState, builder => {
  builder.addCase(addActivity, (state, action) => {
    state.activitiesKeys.push(action.payload);
    state.activities[action.payload] = {
      name: action.payload,
      months: generateMonths(new Date()),
    };
  });
  builder.addCase(
    markCompleted,
    (state, {payload: {dayKey, name, weekKey}}) => {
      const day = state.activities[name].months.weeks[weekKey].days[dayKey];
      day.completed = !day.completed;
    },
  );
});

export default activitiesReducer;
