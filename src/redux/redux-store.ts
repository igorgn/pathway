import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {activitiesReducer} from './activities/activities-slice';

export const rootReducer = combineReducers({
  activities: activitiesReducer,
});

export const createStore = (initialState?: RootState) =>
  configureStore({reducer: rootReducer, preloadedState: initialState});

export const reduxStore = createStore();

export type RootState = ReturnType<typeof rootReducer>;
export type RootThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
