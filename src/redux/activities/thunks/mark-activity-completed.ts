import axios from 'axios';
import {Activities} from '../../../types/interfaces/activities';
import {MarkCompletedPayload} from '../../../types/interfaces/mark-completed-payload';
import {RootThunk} from '../../reduxStore';
import {markActivity} from '../activities-slice';

export const markActivityCompleted = (
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
