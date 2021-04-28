import axios from 'axios';
import {Activities} from '../../../types/interfaces/activities';
import {RootThunk} from '../../reduxStore';
import {setActivities} from '../activities-slice';

export const deleteActivity = (name: string): RootThunk => async dispatch => {
  const {data} = await axios.delete<Activities>(
    'http://localhost:3000/activities',
    {data: {name}},
  );

  dispatch(setActivities(data));
};
