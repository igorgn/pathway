import {Activities} from '../../../types/interfaces/activities';
import {serverConfig} from '../server-config';
import {StorageService} from '../services/storage-service';

export const activitiesStorage = new StorageService<Activities>(
  serverConfig.activitiesFilePath,
  serverConfig.testActivitiesFilePath,
);
