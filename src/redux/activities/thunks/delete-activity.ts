import axios from 'axios';
import {Activities} from '../../../../types/interfaces/activities';
import {endpoints} from '../../../utils/endpoints';
import {RootThunk} from '../../reduxStore';
import {setActivities} from '../activities-slice';

export const deleteActivity = (name: string): RootThunk => async dispatch => {
  const {data} = await axios.delete<Activities>(endpoints.activities, {
    data: {name},
  });

  dispatch(setActivities(data));
};
