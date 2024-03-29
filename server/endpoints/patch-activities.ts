import {Activities} from '../../types/interfaces/activities';
import {ServerApp} from '../server';
import {markActivityDay} from '../utils/activities/mark-activity-day';
import {PatchActivityBody} from '../../types/interfaces/patch-activity-body';
import {findActivity} from '../utils/activities/find-activity';
import {endpoints} from '../utils/endpoints';
import {activitiesStorage} from '../utils/storage/activities-storage';

export const patchActivitiesHandler = (server: ServerApp) => {
  server.patch(endpoints.activities, async (req, res) => {
    const requestBody: PatchActivityBody = req.body;

    const activities = await activitiesStorage.read();

    if (!findActivity(activities, requestBody.name)) {
      res.status(409).send({errorMessage: 'Activity not found'});
      return;
    }

    const newActivities: Activities = markActivityDay(activities, requestBody);

    await activitiesStorage.write(newActivities);
    res.send(findActivity(newActivities, requestBody.name));
  });
};
