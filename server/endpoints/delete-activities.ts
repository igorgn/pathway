import {Activities} from '../../types/interfaces/activities';
import {ServerApp} from '../server';
import {removeActivity} from '../utils/activities/remove-activity';
import {findActivityFromId} from '../utils/activities/find-activity-from-id';
import {endpoints} from '../utils/endpoints';
import {activitiesStorage} from '../utils/storage/activities-storage';

export const deleteActivitiesHandler = (server: ServerApp) => {
  server.delete(endpoints.activities, async (req, res) => {
    const id: string = req.body.id;
    const activities = await activitiesStorage.read();

    if (!findActivityFromId(activities, id)) {
      res.status(409).send({errorMessage: 'Activity not found'});
      return;
    }

    const newActivities: Activities = removeActivity(activities, id);

    await activitiesStorage.write(newActivities);

    res.send(newActivities);
  });
};
