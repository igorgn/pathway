import {componentDriver} from 'react-component-driver';
import {
  ActivityItem,
  ACTIVITY_ITEM_TEST_IDS,
} from '../../src/screens/main/components/activity-item';

jest.mock('react-native-ui-lib', () => {
  const {View} = require('react-native');
  return {
    View,
  };
});

const dayItemDriver = () =>
  componentDriver(ActivityItem, {
    getContainer() {
      return this.getByID(ACTIVITY_ITEM_TEST_IDS.CONTAINER);
    },
  });

describe('Activity item', () => {
  it('Should render activity container', () => {
    expect(dayItemDriver().getContainer()).toBeDefined();
  });
});
