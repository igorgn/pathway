import {Activities} from '../../types/interfaces/activities';
import {ServerApp} from '../server';
import {removeActivity} from '../utils/activities/remove-activity';
import {findActivity} from '../utils/activities/find-activity';
import {endpoints} from '../utils/endpoints';
import {activitiesStorage} from '../utils/storage/activities-storage';

export const deleteActivitiesHandler = (server: ServerApp) => {
  server.delete(endpoints.activities, async (req, res) => {
    const activityName: string = req.body.name;
    const activities = await activitiesStorage.read();

    if (!findActivity(activities, activityName)) {
      res.status(409).send({errorMessage: 'Activity not found'});
      return;
    }

    const newActivities: Activities = removeActivity(activities, activityName);

    await activitiesStorage.write(newActivities);

    res.send(newActivities);
  });
};
