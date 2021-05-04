import {Activities} from '../../types/interfaces/activities';
import {ServerApp} from '../server';
import {addNewActivity} from '../utils/activities/add-new-activity';
import {findActivityFromName} from '../utils/activities/find-activity-from-name';
import {endpoints} from '../utils/endpoints';
import {readActivities} from '../utils/storage/read-activities';
import {writeActivities} from '../utils/storage/write-activities';

export const postActivitiesHandler = (server: ServerApp) => {
  server.post(endpoints.activities, async (req, res) => {
    const name = req.body.name;
    const activities = await readActivities();

    if (findActivityFromName(activities, name)) {
      res.status(409).send({errorMessage: 'Activity already exists'});
      return;
    }

    const newActivities: Activities = addNewActivity(activities, name);

    await writeActivities(newActivities);

    res.send(findActivityFromName(newActivities, name));
  });
};
