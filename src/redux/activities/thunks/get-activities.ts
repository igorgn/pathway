import axios from 'axios';
import {Activities} from '../../../../types/interfaces/activities';
import {endpoints} from '../../../utils/endpoints';
import {RootThunk} from '../../redux-store';
import {setActivities} from '../activities-slice';

export const getActivities = (): RootThunk => async dispatch => {
  const {data} = await axios.get<Activities>(endpoints.activities);

  dispatch(setActivities(data));
};
