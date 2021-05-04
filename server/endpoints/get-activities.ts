import {ServerApp} from '../server';
import {endpoints} from '../utils/endpoints';
import {activitiesStorage} from '../utils/storage/activities-storage';

export const getActivitiesHandler = (server: ServerApp) =>
  server.get(endpoints.activities, async (req, res) => {
    const activities = await activitiesStorage.read();
    res.send(activities);
  });
