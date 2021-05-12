/* eslint-env detox/detox, jest */

const {MAIN_SCREEN_TEST_IDS} = require('../../src/screens/main/main-screen');
const {
  ADD_ACTIVITY_SCREEN_TEST_IDS,
} = require('../../src/screens/add-activity/add-activity-screen');

describe('Add activity flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Should create new activity and display in list', async () => {
    await expect(
      element(by.id(MAIN_SCREEN_TEST_IDS.MAIN_SCREEN)),
    ).toBeVisible();

    await expect(element(by.id(MAIN_SCREEN_TEST_IDS.ADD_BUTTON))).toBeVisible();

    await element(by.id(MAIN_SCREEN_TEST_IDS.ADD_BUTTON)).tap();

    await expect(
      element(by.id(ADD_ACTIVITY_SCREEN_TEST_IDS.CONTAINER)),
    ).toBeVisible();

    await element(by.id(ADD_ACTIVITY_SCREEN_TEST_IDS.TEXT_FIELD)).tap();

    await element(by.id(ADD_ACTIVITY_SCREEN_TEST_IDS.TEXT_FIELD)).typeText(
      'activity',
    );

    await element(by.id(ADD_ACTIVITY_SCREEN_TEST_IDS.CTA)).tap();

    await expect(
      element(by.id(MAIN_SCREEN_TEST_IDS.ACTIVITIES_LIST)),
    ).toBeVisible();
  });
});
