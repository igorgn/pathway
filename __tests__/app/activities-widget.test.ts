import {createStore} from '../../src/redux/redux-store';
import {mockActivitiesStorageData} from '../../test-utils/mock-activities-storage-data';
import axios from 'axios';
import {Activities} from '../../types/interfaces/activities';
import {ViewActivitiesWidgetDriver} from '../../src/widgets/view-activities-widget/view-activities-widget.driver';
import {Navigation} from 'react-native-navigation';
import {Screens} from '../../types/enums/screens';
import {mockViewActivitiesData} from '../../test-utils/mock-view-activities-data';

const componentId = 'activity_widget';

const createDriver = () => {
  const store = createStore(mockActivitiesStorageData.emptyActivitiesState);

  return new ViewActivitiesWidgetDriver(store).setProps({
    componentId,
  });
};

const initiateWidget = async (activities: Activities) => {
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: activities,
    }),
  );

  const screen = createDriver();

  await screen.renderAsync();

  return screen;
};

jest.spyOn(Navigation, 'push');

describe('Main screen component test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should make request to fetch data', async () => {
    await initiateWidget(mockActivitiesStorageData.emptyActivities);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/activities');

    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('Should not render progress container', async () => {
    const screen = await initiateWidget(
      mockActivitiesStorageData.emptyActivities,
    );

    expect(screen.getProgressContainer()).toBeUndefined();
  });

  it('Should render add activity action label', async () => {
    const screen = await initiateWidget(
      mockActivitiesStorageData.emptyActivities,
    );

    expect(screen.getActionLabelValue()).toEqual('+ Add activity');
  });

  it('Should navigate to add activity screen if there is no activities', async () => {
    const screen = await initiateWidget(
      mockActivitiesStorageData.emptyActivities,
    );

    screen.pressOnActionLabel();

    expect(Navigation.push).toBeCalledWith(componentId, {
      component: {name: Screens.AddActivity},
    });
  });

  it('Should render progress container', async () => {
    const screen = await initiateWidget(
      mockActivitiesStorageData.oneActivityOneDayCompleted,
    );

    expect(screen.getProgressContainer()).toBeDefined();
  });

  it('Should render view activities action label', async () => {
    const screen = await initiateWidget(
      mockActivitiesStorageData.oneActivityOneDayCompleted,
    );

    expect(screen.getActionLabelValue()).toEqual('View Activities');
  });

  it('Should navigate to view activities screen', async () => {
    const screen = await initiateWidget(
      mockActivitiesStorageData.oneActivityOneDayCompleted,
    );

    screen.pressOnActionLabel();

    expect(Navigation.push).toBeCalledWith(componentId, {
      component: {name: Screens.Main},
    });
  });

  it('Should render activity with one day completed', async () => {
    const activity = mockViewActivitiesData[0];
    const screen = await initiateWidget(
      mockActivitiesStorageData.oneActivityOneDayCompleted,
    );

    expect(screen.getActivityLabelValue(activity.id)).toEqual(activity.name);
    expect(screen.getActivityCountValue(activity.id)).toEqual(
      `${activity.daysCompleted}`,
    );
  });
});
