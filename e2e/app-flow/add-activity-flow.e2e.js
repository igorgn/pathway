/* eslint-env detox/detox, jest */

describe('Add activity flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Should create new activity and display in list', async () => {});
});
