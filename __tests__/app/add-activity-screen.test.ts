import {createStore} from '../../src/redux/redux-store';
import {mockActivitiesStorageData} from '../../test-utils/mock-activities-storage-data';
import {Navigation} from 'react-native-navigation';
import {AddActivityScreenDriver} from '../../src/screens/add-activity/add-activity-screen.driver';

describe('Activities widget test', () => {
  const componentID = 'activity_widget';

  const store = createStore({
    activities: mockActivitiesStorageData.oneActivityOneDayCompleted,
  });

  jest.spyOn(Navigation, 'pop');

  let screen: AddActivityScreenDriver;

  beforeEach(() => {
    screen = new AddActivityScreenDriver(store).setProps({
      componentId: componentID,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should enter activity name', () => {
    screen.setInputText('Activity');

    expect(screen.getTextInputValue()).toBe('Activity');
  });

  it('Should return an error with empty activity name', () => {
    screen.setInputText('');

    screen.initiateActivityCreation();

    expect(screen.getTextInputError()).toBe('Enter name of activity');
  });

  it('Should return an error with activity name that already exists', () => {
    screen.setInputText('Yoga');

    screen.initiateActivityCreation();

    expect(screen.getTextInputError()).toBe('Such activity already exists');
  });

  it('Should pop screen', () => {
    screen.setInputText('Activity');

    screen.initiateActivityCreation();

    expect(Navigation.pop).toBeCalledWith(componentID);
  });
});
