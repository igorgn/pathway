import {createAction, createReducer} from '@reduxjs/toolkit';
import {Activity} from '../../types/interfaces/Activities';
import generateMonths from '../../utils/generateMonths';

// State typings should be put under types, rather than defining them inline here.
// This particular type State is ambigous, since you already have RootState. State is very generic, and in this case this is activities reducer state, so it should reflected in naming/typings as well, e.g. ActivitiesState.
interface State {
  activities: Record<string, Activity>;
  activitiesKeys: string[];
}

interface MarkCompletedPayload {
  weekKey: string;
  dayKey: string;
  name: string;
}

//Action names can be moved to consts at the top of the file.
export const addActivity = createAction<string>('addActivity');
export const markCompleted = createAction<MarkCompletedPayload>(
  'markCompleted',
);

export const initialActivitiesState: State = {
  activities: {},
  activitiesKeys: [],
};

// For better readability you could move reducer logic to a separate functions, (i.e. addCase(addActivity, insertActivityReducer) ) rather than doing in inline in a singular block of code.
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
