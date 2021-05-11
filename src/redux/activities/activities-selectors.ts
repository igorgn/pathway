import {createSelector} from 'reselect';
import {Activity, ActivityData} from '../../../types/interfaces/activities';
import {RootState} from '../redux-store';

export const selectActivities = (state: RootState) => state.activities;

const formatActivityData = (activity: Activity): ActivityData => ({
  name: activity.name,
  daysCompleted: activity.daysIDs.length,
  id: activity.id,
});

export const selectActivitiesWidgetData = createSelector(
  selectActivities,
  ({activities, activitiesIDs}) =>
    activitiesIDs.map(id => formatActivityData(activities[id])),
);
