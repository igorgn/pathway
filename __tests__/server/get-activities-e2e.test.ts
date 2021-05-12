import fetch from 'node-fetch';
import {envVariables} from '../../server/env/envVariables';
import {initializeServer} from '../../server/server-app';
import {mockActivitiesStorageData} from '../../test-utils/mock-activities-storage-data';
import {writeToTestActivities} from '../../test-utils/write-to-test-activities';

describe('get activities e2e', () => {
  let server: Server | null = null;

  beforeEach(() => {
    server = initializeServer(envVariables.test).listen(3000, () => {});
  });

  afterEach(() => {
    if (server) {
      server.close();
    }
  });

  it('should respond with one activity', async () => {
    await writeToTestActivities(
      mockActivitiesStorageData.oneActivityOneDayCompleted,
    );

    const response = await fetch('http://localhost:3000/activities');

    expect(response.status).toEqual(200);

    const data = await response.json();

    expect(data).toEqual(mockActivitiesStorageData.oneActivityOneDayCompleted);
  });
});
