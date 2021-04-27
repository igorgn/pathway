import axios from 'axios';
import {Activities} from '../../../types/interfaces/Activities';
import {RootThunk} from '../../store';
import {setActivities} from '../activitiesSlice';

const deleteActivity = (name: string): RootThunk => async dispatch => {
  const {data} = await axios.delete<Activities>(
    'http://localhost:3000/activities',
    {data: {name}},
  );

  dispatch(setActivities(data));
};

export default deleteActivity;
