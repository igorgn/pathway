import {Activities} from '../../types/interfaces/activities';
import {ServerApp} from '../server';
import {addNewActivity} from '../utils/activities/add-new-activity';
import {findActivity} from '../utils/activities/find-activity';
import {endpoints} from '../utils/endpoints';
import {readActivities} from '../utils/storage/read-activities';
import {writeActivities} from '../utils/storage/write-activities';

export const postActivitiesHandler = (server: ServerApp) => {
  server.post(endpoints.activities, async (req, res) => {
    const activityName = req.body.name;
    const activities = await readActivities();

    if (findActivity(activities, activityName)) {
      res.status(409).send({errorMessage: 'Activity already exists'});
      return;
    }

    const newActivities: Activities = addNewActivity(activities, activityName);

    await writeActivities(newActivities);

    res.send(findActivity(newActivities, activityName));
  });
};
