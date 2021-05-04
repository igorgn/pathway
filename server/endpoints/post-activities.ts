import {Activities} from '../../types/interfaces/activities';
import {ServerApp} from '../server';
import {addNewActivity} from '../utils/activities/add-new-activity';
import {findActivityFromName} from '../utils/activities/find-activity-from-name';
import {endpoints} from '../utils/endpoints';
import {activitiesStorage} from '../utils/storage/activities-storage';

export const postActivitiesHandler = (server: ServerApp) => {
  server.post(endpoints.activities, async (req, res) => {
    const name = req.body.name;
    const activities = await activitiesStorage.read();

    if (findActivityFromName(activities, name)) {
      res.status(409).send({errorMessage: 'Activity already exists'});
      return;
    }

    const newActivities: Activities = addNewActivity(activities, name);

    await activitiesStorage.write(newActivities);

    res.send(findActivityFromName(newActivities, name));
  });
};
