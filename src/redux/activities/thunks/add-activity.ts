import axios from 'axios';
import {Activities} from '../../../types/interfaces/activities';
import {RootThunk} from '../../reduxStore';
import {setActivities} from '../activities-slice';

export const addActivity = (name: string): RootThunk => async dispatch => {
  const {data} = await axios.post<Activities>(
    'http://localhost:3000/activities',
    {name},
  );

  dispatch(setActivities(data));
};
