import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import activitiesSlice from './activities/activitiesSlice';

const rootReducer = combineReducers({
  activities: activitiesSlice,
});

const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof rootReducer>;
export type RootThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
