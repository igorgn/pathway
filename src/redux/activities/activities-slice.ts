import {CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {markActivityDay} from '../../../server/utils/activities/mark-activity-day';
import {Activities, Activity} from '../../../types/interfaces/activities';
import {PatchActivityBody} from '../../../types/interfaces/patch-activity-body';

const initialActivitiesState: Activities = {
  activities: {},
  activitiesIDs: [],
};

const addActivityReducer: CaseReducer<Activities, PayloadAction<Activity>> = (
  state,
  {payload},
) => {
  state.activities[payload.id] = payload;
  state.activitiesIDs.push(payload.id);
};

const setActivitiesReducer: CaseReducer<
  Activities,
  PayloadAction<Activities>
> = (state, {payload}) => {
  return (state = payload);
};

const markActivityReducer: CaseReducer<
  Activities,
  PayloadAction<PatchActivityBody>
> = (state, {payload}) => {
  console.log(payload);
  return (state = markActivityDay(state, payload));
};

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState: initialActivitiesState,
  reducers: {
    setActivities: setActivitiesReducer,
    addActivities: addActivityReducer,
    markActivity: markActivityReducer,
  },
});

export const {
  setActivities,
  markActivity,
  addActivities,
} = activitiesSlice.actions;

export const activitiesReducer = activitiesSlice.reducer;
