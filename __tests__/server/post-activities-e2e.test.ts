import fetch from 'node-fetch';
import {initializeServer} from '../../server/server-app';
import {Server} from 'node:http';
import {envVariables} from '../../server/env/envVariables';
import {writeToTestActivities} from '../../test-utils/write-to-test-activities';
import {mockActivitiesStorageData} from '../../test-utils/mock-activities-storage-data';

describe('post activities e2e', () => {
  let server: Server | null = null;

  const requestToAddActivity = () =>
    fetch('http://localhost:3000/activities', {
      method: 'POST',
      body: JSON.stringify({name: mockActivitiesStorageData.activityName}),
      headers: {'Content-Type': 'application/json'},
    });

  beforeEach(() => {
    server = initializeServer(envVariables.test).listen(3000, () => {});
  });

  afterEach(() => {
    if (server) {
      server.close();
      server = null;
    }
  });

  it('should respond with activity', async () => {
    await writeToTestActivities(mockActivitiesStorageData.emptyActivities);

    const response = await requestToAddActivity();

    expect(response.status).toEqual(200);

    const data = await response.json();

    expect(data).toEqual(
      mockActivitiesStorageData.oneActivityZeroDaysCompleted.activities[
        mockActivitiesStorageData.id
      ],
    );
  });

  it('should respond with error with status 409 and errorMessage: Activity already exists', async () => {
    await writeToTestActivities(
      mockActivitiesStorageData.oneActivityZeroDaysCompleted,
    );

    const response = await requestToAddActivity();

    expect(response.status).toEqual(409);

    const data = await response.json();

    expect(data).toEqual({errorMessage: 'Activity already exists'});
  });
});
