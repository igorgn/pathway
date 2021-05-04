import {Activities} from '../../../types/interfaces/activities';
import {serverConfig} from '../serverConfig';
import {StorageService} from '../services/storage-service';

export const activitiesStorage = new StorageService<Activities>(
  serverConfig.activitiesFilePath,
  serverConfig.testActivitiesFilePath,
);
