/* eslint-env detox/detox, jest */
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display main screen', async () => {
    await expect(element(by.id('main-screen'))).toBeVisible();
  });
});
