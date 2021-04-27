import axios from 'axios';
import {Activities} from '../../../types/interfaces/Activities';
import {RootThunk} from '../../store';
import {setActivities} from '../activitiesSlice';

const getActivities = (): RootThunk => async dispatch => {
  const {data} = await axios.get<Activities>(
    'http://localhost:3000/activities',
  );

  dispatch(setActivities(data));
};

export default getActivities;
