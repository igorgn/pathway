import {CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Activities} from '../../types/interfaces/activities';
import {MarkCompletedPayload} from '../../types/interfaces/mark-completed-payload';

const initialActivitiesState: Activities = {
  activities: {},
  activitiesKeys: [],
};

const setActivitiesReducer: CaseReducer<
  Activities,
  PayloadAction<Activities>
> = (state, action) => {
  return {...state, ...action.payload};
};

const markActivityReducer: CaseReducer<
  Activities,
  PayloadAction<MarkCompletedPayload>
> = (state, {payload: {dayKey, name, weekKey}}) => {
  const day = state.activities[name].months.weeks[weekKey].days[dayKey];
  day.completed = !day.completed;
};

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState: initialActivitiesState,
  reducers: {
    setActivities: setActivitiesReducer,
    markActivity: markActivityReducer,
  },
});

export const {setActivities, markActivity} = activitiesSlice.actions;

export const activitiesReducer = activitiesSlice.reducer;
