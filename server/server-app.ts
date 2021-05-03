import express from 'express';
import {getActivitiesHandler} from './endpoints/get-activities';
import {postActivitiesHandler} from './endpoints/post-activities';
import {deleteActivitiesHandler} from './endpoints/delete-activities';
import {patchActivitiesHandler} from './endpoints/patch-activities';
import {env} from './env/env';

export const initializeServer = (isTest?: boolean) => {
  if (isTest) {
    env.setIsTest(true);
  }
  const serverApp = express();

  serverApp.use(express.json());

  getActivitiesHandler(serverApp);
  postActivitiesHandler(serverApp);
  deleteActivitiesHandler(serverApp);
  patchActivitiesHandler(serverApp);

  return serverApp;
};
