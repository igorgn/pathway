import axios from 'axios';
import {Activities} from '../../../../types/interfaces/activities';
import {PatchActivityBody} from '../../../../types/interfaces/patch-activity-body';
import {endpoints} from '../../../utils/endpoints';
import {RootThunk} from '../../reduxStore';
import {markActivity} from '../activities-slice';

export const markActivityCompleted = (
  payload: PatchActivityBody,
): RootThunk => async dispatch => {
  dispatch(markActivity(payload));
  try {
    await axios.patch<Activities>(endpoints.activities, payload);
  } catch (e) {
    dispatch(markActivity(payload));
  }
};
