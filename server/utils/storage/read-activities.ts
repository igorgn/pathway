import fs from 'fs';
import {Activities} from '../../../types/interfaces/activities';
import {env} from '../../env/env';
import {serverConfig} from '../serverConfig';

export const readActivities = () =>
  new Promise<Activities>((resolve, reject) => {
    fs.readFile(
      env.isTest
        ? serverConfig.testActivitiesFilePath
        : serverConfig.activitiesFilePath,
      'utf8',
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(res));
      },
    );
  });
