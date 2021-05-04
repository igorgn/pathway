import {Activities} from '../../types/interfaces/activities';
import {ServerApp} from '../server';
import {readActivities} from '../utils/storage/read-activities';
import {writeActivities} from '../utils/storage/write-activities';
import {removeActivity} from '../utils/activities/remove-activity';
import {findActivityFromId} from '../utils/activities/find-activity-from-id';
import {endpoints} from '../utils/endpoints';

export const deleteActivitiesHandler = (server: ServerApp) => {
  server.delete(endpoints.activities, async (req, res) => {
    const id: string = req.body.id;
    const activities = await readActivities();

    if (!findActivityFromId(activities, id)) {
      res.status(409).send({errorMessage: 'Activity not found'});
      return;
    }

    const newActivities: Activities = removeActivity(activities, id);

    await writeActivities(newActivities);

    res.send(newActivities);
  });
};
