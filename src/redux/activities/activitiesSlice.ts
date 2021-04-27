import {CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Activities} from '../../types/interfaces/Activities';
import {MarkCompletedPayload} from '../../types/interfaces/MarkCompletedPayload';

interface State extends Activities {}

export const initialActivitiesState: State = {
  activities: {},
  activitiesKeys: [],
};

const initialState: State = {
  activities: {},
  activitiesKeys: [],
};

const setActivitiesReducer: CaseReducer<State, PayloadAction<Activities>> = (
  state,
  action,
) => {
  return {...state, ...action.payload};
};

const markActivityReducer: CaseReducer<
  State,
  PayloadAction<MarkCompletedPayload>
> = (state, {payload: {dayKey, name, weekKey}}) => {
  const day = state.activities[name].months.weeks[weekKey].days[dayKey];
  day.completed = !day.completed;
};

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setActivities: setActivitiesReducer,
    markActivity: markActivityReducer,
  },
});

export const {setActivities, markActivity} = activitiesSlice.actions;

export default activitiesSlice.reducer;
