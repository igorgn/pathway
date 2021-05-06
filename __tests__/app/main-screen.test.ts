import {act} from 'react-test-renderer';
import {createStore} from '../../src/redux/redux-store';
import {MainScreenDriver} from '../../src/screens/main/main-screen.driver';
import {mockActivitiesStorageData} from '../../test-utils/mock-activities-storage-data';
import axios from 'axios';
import {mockDays} from '../../test-utils/mock-day-items-data';
import {Alert} from 'react-native';
import {Activities} from '../../types/interfaces/activities';

const createDriver = () => {
  const store = createStore(mockActivitiesStorageData.emptyActivitiesState);
  const componentID = 'activity_screen';

  return new MainScreenDriver(store).setProps({
    componentId: componentID,
  });
};

const initiateScreen = async (activities: Activities) => {
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: activities,
    }),
  );

  const screen = createDriver();

  await screen.renderAsync();

  return screen;
};

const pressAlertActionButton = async () =>
  await act(async () => await Alert.alert.mock.calls[0][2][1].onPress());

describe('Main screen component test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render empty list container', async () => {
    const screen = await initiateScreen(
      mockActivitiesStorageData.emptyActivities,
    );

    expect(screen.getEmptyStateContainer()).toBeDefined();
  });

  it('Should render list container', async () => {
    const screen = await initiateScreen(
      mockActivitiesStorageData.oneActivityZeroDaysCompleted,
    );

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/activities');

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(screen.getListContainer()).toBeDefined();
  });

  it('Activity card should render correct name', async () => {
    const screen = await initiateScreen(
      mockActivitiesStorageData.oneActivityZeroDaysCompleted,
    );

    expect(
      screen.getActivityCardNameLabel(mockActivitiesStorageData.id)?.children,
    ).toStrictEqual([mockActivitiesStorageData.activityName]);
  });

  it('Activity card should render correct month', async () => {
    const screen = await initiateScreen(
      mockActivitiesStorageData.oneActivityZeroDaysCompleted,
    );

    expect(
      screen.getActivityCardMonthLabel(mockActivitiesStorageData.id)?.children,
    ).toStrictEqual(['May']);
  });

  it('Activity card should render correct days labels', async () => {
    const screen = await initiateScreen(
      mockActivitiesStorageData.oneActivityZeroDaysCompleted,
    );

    mockDays.forEach(item =>
      expect(screen.getActivityCardDayLabel(item.key)?.children).toStrictEqual([
        item.displayValue,
      ]),
    );
  });

  it('Activity card should render active days as active or inactive ', async () => {
    axios.patch.mockImplementation(
      () =>
        new Promise(resolve => {
          resolve({
            data: mockActivitiesStorageData.oneActivityZeroDaysCompleted,
          });
        }),
    );

    const screen = await initiateScreen(
      mockActivitiesStorageData.oneActivityZeroDaysCompleted,
    );
    mockDays.forEach(item => {
      expect(screen.getDayItem(item.key)).toBeDefined();

      if (item.active) {
        screen.pressOnDayItem(item.key);
        expect(axios.patch).toHaveBeenCalledTimes(1);
        axios.patch.mockClear();
      } else {
        screen.pressOnDayItem(item.key);
        expect(axios.patch).toHaveBeenCalledTimes(0);
        axios.patch.mockClear();
      }
    });
  });

  it('Should mark day as active', async () => {
    const day = mockDays[9];

    axios.patch.mockImplementation(
      () =>
        new Promise(resolve => {
          resolve({
            data: mockActivitiesStorageData.oneActivityZeroDaysCompleted,
          });
        }),
    );

    const screen = await initiateScreen(
      mockActivitiesStorageData.oneActivityZeroDaysCompleted,
    );

    expect(screen.getDayPressable(day.key)).toBeDefined();

    await act(async () => await screen.pressOnDayItem(day.key));

    expect(axios.patch).toHaveBeenCalledWith(
      'http://localhost:3000/activities',
      {
        id: mockActivitiesStorageData.id,
        dayID: day.dayID,
      },
    );

    expect(axios.patch).toHaveBeenCalledTimes(1);

    expect(screen.getDayItemContainerStyle(day.key).backgroundColor).toEqual(
      'red',
    );
  });

  it('Activity card should delete activity', async () => {
    const screen = await initiateScreen(
      mockActivitiesStorageData.oneActivityZeroDaysCompleted,
    );

    axios.delete.mockImplementation(() =>
      Promise.resolve({
        data: mockActivitiesStorageData.emptyActivities,
      }),
    );

    screen.pressOnDeleteButton(mockActivitiesStorageData.id);

    expect(Alert.alert).toBeCalled();

    await pressAlertActionButton();

    expect(axios.delete).toHaveBeenCalledWith(
      'http://localhost:3000/activities',
      {
        data: {id: 'test-uuid'},
      },
    );

    expect(axios.delete).toHaveBeenCalledTimes(1);

    expect(
      screen.getActivityCard(mockActivitiesStorageData.id),
    ).toBeUndefined();
  });
});
