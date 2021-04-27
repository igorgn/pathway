/* eslint-env detox/detox, jest */
// File name is not describing this test suite, should be updated to reflect the tests.
// Also, it would be better to move these tests under directory in order to separate tests from config files. The new directory should have a meaningful name to reflect the tests under it.
const {default: testIDs} = require('../src/utils/testIDs');

// Its not "Example" anymore.
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });
  // Grammar. a should be capital letter - "Add activity flow"
  it('add activity flow', async () => {
    // Please add some spacings between lines to make this test more readable.
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
