/* eslint-env detox/detox, jest */

const {default: testIDs} = require('../src/utils/testIDs');

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('add activity flow', async () => {
    await expect(element(by.id(testIDs.mainScreen))).toBeVisible();
    await expect(element(by.id(testIDs.addActivityTabBarButton))).toBeVisible();
    await element(by.id(testIDs.addActivityTabBarButton)).tap();
    await expect(element(by.id(testIDs.addActivityScreen))).toBeVisible();
    await element(by.id(testIDs.activityNameInput)).tap();
    await element(by.id(testIDs.activityNameInput)).typeText('activity');
    await element(by.id(testIDs.addActivityScreenButton)).tap();
    await expect(element(by.id(testIDs.activitiesList))).toBeVisible();
  });
});
