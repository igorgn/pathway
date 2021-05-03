import axios from 'axios';
import {Activity} from '../../../../types/interfaces/activities';
import {endpoints} from '../../../utils/endpoints';
import {RootThunk} from '../../reduxStore';
import {addActivities} from '../activities-slice';

export const addActivity = (name: string): RootThunk => async dispatch => {
  const {data} = await axios.post<Activity>(endpoints.activities, {name});

  dispatch(addActivities(data));
};
