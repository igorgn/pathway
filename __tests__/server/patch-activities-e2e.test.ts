import fetch from 'node-fetch';
import {initializeServer} from '../../server/server-app';
import {Server} from 'node:http';
import {envVariables} from '../../server/env/envVariables';
import {writeToTestActivities} from '../../test-utils/write-to-test-activities';
import {mockActivitiesStorageData} from '../../test-utils/mock-activities-storage-data';

describe('patch activities e2e', () => {
  let server: Server | null = null;

  const requestToMarkActivity = () =>
    fetch('http://localhost:3000/activities', {
      method: 'PATCH',
      body: JSON.stringify({
        name: mockActivitiesStorageData.activityName,
        dayID: mockActivitiesStorageData.dayToMark,
      }),
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

  it('should respond with activity with one day completed', async () => {
    await writeToTestActivities(
      mockActivitiesStorageData.oneActivityZeroDaysCompleted,
    );

    const response = await requestToMarkActivity();

    expect(response.status).toEqual(200);

    const data = await response.json();

    expect(data).toEqual(
      mockActivitiesStorageData.oneActivityOneDayCompleted.activities[
        mockActivitiesStorageData.activityName
      ],
    );
  });

  it('should respond with activity with zero days completed', async () => {
    await writeToTestActivities(
      mockActivitiesStorageData.oneActivityOneDayCompleted,
    );

    const response = await requestToMarkActivity();

    expect(response.status).toEqual(200);

    const data = await response.json();

    expect(data).toEqual(
      mockActivitiesStorageData.oneActivityZeroDaysCompleted.activities[
        mockActivitiesStorageData.activityName
      ],
    );
  });

  it('Should respond with error with status 409 and errorMessage: Activity not found', async () => {
    await writeToTestActivities(mockActivitiesStorageData.emptyActivities);

    const response = await requestToMarkActivity();

    expect(response.status).toEqual(409);

    const data = await response.json();

    expect(data).toEqual({errorMessage: 'Activity not found'});
  });
});
