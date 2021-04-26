/* eslint-env  jest */

import {AnyAction} from 'redux';
import activitiesReducer, {
  addActivity,
  initialActivitiesState,
} from '../../../src/redux/activities/activitiesReducer';
import {selectActivities} from '../../../src/redux/activities/activitiesSelectors';

// describe('activities slice', () => {
//   describe('reducer, actions and selectors', () => {
//     it('should return the initial state on first run', () => {
//       // Arrange
//       const nextState = initialActivitiesState;

//       // Act
//       const result = activitiesReducer(undefined, {} as AnyAction);

//       // Assert
//       expect(result).toEqual(nextState);
//     });

//     it('should properly set the state when sign in is made', () => {
//       // Arrange
//       const payload = {name: 'Activity three'};
//       const currentState = {
//         activities: [{name: 'Activity one'}, {name: 'Activity two'}],
//       };

//       // Act
//       const nextState = activitiesReducer(currentState, addActivity(payload));

//       // Assert
//       const rootState = {activities: nextState};
//       expect(selectActivities(rootState)).toEqual([
//         ...currentState.activities,
//         payload,
//       ]);
//     });
//   });
// });
