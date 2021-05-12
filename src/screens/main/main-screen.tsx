import React, {useCallback, useEffect} from 'react';
import {View, Text} from 'wix-react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {selectActivities} from '../../redux/activities/activities-selectors';
import {ActivityItem} from './components/activity-item';
import {FlatList, ListRenderItem} from 'react-native';
import {icons} from '../../assets/icons/icons';
import {getActivities} from '../../redux/activities/thunks/get-activities';
import {useNavigationButtonPressed} from '../../utils/hooks/use-navigation-button-pressed';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {Screens} from '../../../types/enums/screens';
import {withReduxProvider} from '../../redux/with-redux-provider';

export const MAIN_SCREEN_TEST_IDS = {
  EMPTY_STATE_CONTAINER: 'MAIN_SCREEN_EMPTY_STATE_CONTAINER',
  ACTIVITIES_LIST: 'MAIN_SCREEN_ACTIVITIES_LIST',
  MAIN_SCREEN: 'MAIN_SCREEN',
  ADD_BUTTON: 'ADD_BUTTON',
};

const TAB_BAR_BUTTON_ID = 'MAIN_SCREEN_TAB_BAR_BUTTON';

const strings = {
  activities: 'Activities',
  youHaveNoActivities: 'You have no activities',
  toAddAnActivity: 'To add an activity press + button',
};

export const MainScreenComponent: NavigationFunctionComponent = React.memo(
  ({componentId}) => {
    const {activities, activitiesIDs} = useSelector(selectActivities);
    const dispatch = useDispatch();

    const pushAddActivityScreen = useCallback(
      (buttonId: string) => {
        switch (buttonId) {
          case TAB_BAR_BUTTON_ID:
            Navigation.push(componentId, {
              component: {name: Screens.AddActivity},
            });
            break;
          case 'dismiss':
            Navigation.pop(componentId);
            break;
          default:
            break;
        }
      },
      [componentId],
    );

    useNavigationButtonPressed(pushAddActivityScreen);

    const renderItem: ListRenderItem<string> = useCallback(
      ({item}) => (
        <ActivityItem key={activities[item].name} activity={activities[item]} />
      ),
      [activities],
    );

    const keyExtractor = useCallback((item: string) => item, []);

    useEffect(() => {
      dispatch(getActivities());
    }, []);

    useEffect(() => {}, []);

    const renderActivityList = useCallback(
      () => (
        <FlatList
          data={activitiesIDs}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          testID={MAIN_SCREEN_TEST_IDS.ACTIVITIES_LIST}
        />
      ),
      [activitiesIDs, keyExtractor, renderItem],
    );

    const renderEmptyState = useCallback(
      () => (
        <View
          center
          marginT-s4
          testID={MAIN_SCREEN_TEST_IDS.EMPTY_STATE_CONTAINER}>
          <Text text70BO>{strings.youHaveNoActivities}</Text>
          <Text marginT-s4>{strings.toAddAnActivity}</Text>
        </View>
      ),
      [],
    );

    return (
      <View flex useSafeArea testID={MAIN_SCREEN_TEST_IDS.MAIN_SCREEN}>
        <View flex padding-s4>
          {activitiesIDs.length ? renderActivityList() : renderEmptyState()}
        </View>
      </View>
    );
  },
);

export const MainScreen = withReduxProvider(MainScreenComponent);

MainScreen.options = {
  topBar: {
    title: {text: strings.activities},
    rightButtons: [
      {
        icon: icons.buttons.add,
        id: TAB_BAR_BUTTON_ID,
        testID: MAIN_SCREEN_TEST_IDS.ADD_BUTTON,
      },
    ],
  },
};
