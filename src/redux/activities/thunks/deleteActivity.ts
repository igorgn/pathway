import axios from 'axios';
import {Activities} from '../../../types/interfaces/Activities';
import {RootThunk} from '../../store';
import {setActivities} from '../activitiesSlice';

const addActivity = (name: string): RootThunk => async dispatch => {
  const {data} = await axios.post<Activities>(
    'http://localhost:3000/activities',
    {name},
  );

  dispatch(setActivities(data));
};

export default addActivity;