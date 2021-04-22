import {createAction, createReducer} from '@reduxjs/toolkit';
import {IActivity} from '../../types/interfaces/IActivities';

interface IState {
  activities: IActivity[];
}

export const addActivity = createAction<IActivity>('addActivity');

export const initialActivitiesState: IState = {
  activities: [],
};

const activitiesReducer = createReducer(initialActivitiesState, builder =>
  builder.addCase(addActivity, (state, action) => {
    state.activities.push(action.payload);
  }),
);

export default activitiesReducer;
