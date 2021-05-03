import fs from 'fs';
import {Activities} from '../types/interfaces/activities';

export const writeToTestActivities = (data: Activities) =>
  new Promise(resolve =>
    fs.writeFile(
      'server/data/activities.test.json',
      JSON.stringify(data),
      'utf8',
      err => {
        if (err) {
          throw new Error();
        }
        resolve(null);
      },
    ),
  );
