import {Activities} from '../../types/interfaces/activities';
import {ServerApp} from '../server';
import {readActivities} from '../utils/storage/read-activities';
import {writeActivities} from '../utils/storage/write-activities';
import {markActivityDay} from '../utils/activities/mark-activity-day';
import {PatchActivityBody} from '../../types/interfaces/patch-activity-body';
import {findActivityFromId} from '../utils/activities/find-activity-from-id';
import {endpoints} from '../utils/endpoints';

export const patchActivitiesHandler = (server: ServerApp) => {
  server.patch(endpoints.activities, async (req, res) => {
    const requestBody: PatchActivityBody = req.body;

    const activities = await readActivities();

    if (!findActivityFromId(activities, requestBody.id)) {
      res.status(409).send({errorMessage: 'Activity not found'});
      return;
    }

    const newActivities: Activities = markActivityDay(activities, requestBody);

    await writeActivities(newActivities);
    res.send(findActivityFromId(newActivities, requestBody.id));
  });
};
