import {Activities} from '../../types/interfaces/activities';
import {ServerApp} from '../server';
import {readActivities} from '../utils/storage/read-activities';
import {writeActivities} from '../utils/storage/write-activities';
import {removeActivity} from '../utils/activities/remove-activity';
import {findActivity} from '../utils/activities/find-activity';
import {endpoints} from '../utils/endpoints';

export const deleteActivitiesHandler = (server: ServerApp) => {
  server.delete(endpoints.activities, async (req, res) => {
    const activityName: string = req.body.name;
    const activities = await readActivities();

    if (!findActivity(activities, activityName)) {
      res.status(409).send({errorMessage: 'Activity not found'});
      return;
    }

    const newActivities: Activities = removeActivity(activities, activityName);

    await writeActivities(newActivities);

    res.send(newActivities);
  });
};
