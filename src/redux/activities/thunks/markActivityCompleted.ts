import axios from 'axios';
import {Activities} from '../../../types/interfaces/Activities';
import {MarkCompletedPayload} from '../../../types/interfaces/MarkCompletedPayload';
import {RootThunk} from '../../store';
import {markActivity} from '../activitiesSlice';

const markActivityCompleted = (
  payload: MarkCompletedPayload,
): RootThunk => async dispatch => {
  dispatch(markActivity(payload));
  try {
    const res = await axios.patch<Activities>(
      'http://localhost:3000/mark-activity',
      payload,
    );
    console.log(res);
  } catch (e) {
    dispatch(markActivity(payload));
  }
};

export default markActivityCompleted;
