import {ServerApp} from '../server';
import {endpoints} from '../utils/endpoints';
import {readActivities} from '../utils/storage/read-activities';

export const getActivitiesHandler = (server: ServerApp) =>
  server.get(endpoints.activities, async (req, res) => {
    const activities = await readActivities();
    res.send(activities);
  });
