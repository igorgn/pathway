import {componentDriver} from 'react-component-driver';
import {
  DayItem,
  DAY_ITEM_TEST_IDS,
} from '../../src/screens/main/components/day-item';

jest.mock('react-native-ui-lib', () => {
  const {View} = require('react-native');
  return {
    View,
  };
});

const dayItemDriver = () =>
  componentDriver(DayItem, {
    getContainer() {
      return this.getByID(DAY_ITEM_TEST_IDS.CONTAINER);
    },
  });

describe('DayItem component test', () => {
  it('Should render container', () => {
    expect(dayItemDriver().getContainer()).toBeDefined();
  });
});
