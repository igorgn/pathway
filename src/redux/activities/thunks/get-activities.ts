import axios from 'axios';
import {Activities} from '../../../types/interfaces/activities';
import {RootThunk} from '../../reduxStore';
import {setActivities} from '../activities-slice';

export const getActivities = (): RootThunk => async dispatch => {
  const {data} = await axios.get<Activities>(
    'http://localhost:3000/activities',
  );

  dispatch(setActivities(data));
};
