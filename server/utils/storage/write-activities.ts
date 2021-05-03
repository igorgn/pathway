import fs from 'fs';
import {Activities} from '../../../types/interfaces/activities';
import {env} from '../../env/env';
import {serverConfig} from '../serverConfig';

export const writeActivities = (activities: Activities) =>
  new Promise<null>((resolve, reject) => {
    fs.writeFile(
      env.isTest
        ? serverConfig.testActivitiesFilePath
        : serverConfig.activitiesFilePath,
      JSON.stringify(activities),
      'utf8',
      err => {
        if (err) {
          reject(err);
        }
        resolve(null);
      },
    );
  });
