import fetch from 'node-fetch';
import {Server} from 'node:http';
import {initializeServer} from '../../server/server-app';
import {envVariables} from '../../server/env/envVariables';
import {writeToTestActivities} from '../../test-utils/write-to-test-activities';
import {mockActivitiesStorageData} from '../../test-utils/mock-activities-storage-data';

describe('delete activities e2e', () => {
  let server: Server | null = null;

  const requestDeleteActivity = () =>
    fetch('http://localhost:3000/activities', {
      method: 'DELETE',
      body: JSON.stringify({id: mockActivitiesStorageData.id}),
      headers: {'Content-Type': 'application/json'},
    });

  beforeEach(() => {
    server = initializeServer(envVariables.test).listen(3000, () => {});
  });

  afterEach(() => {
    if (server) {
      server.close();
    }
  });

  it('Should respond with activity empty activities', async () => {
    await writeToTestActivities(
      mockActivitiesStorageData.oneActivityOneDayCompleted,
    );

    const response = await requestDeleteActivity();

    expect(response.status).toEqual(200);

    const data = await response.json();

    expect(data).toEqual(mockActivitiesStorageData.emptyActivities);
  });

  it('Should respond with error with status 409 and errorMessage: Activity not found', async () => {
    await writeToTestActivities(mockActivitiesStorageData.emptyActivities);

    const response = await requestDeleteActivity();

    expect(response.status).toEqual(409);

    const data = await response.json();

    expect(data).toEqual({errorMessage: 'Activity not found'});
  });
});
