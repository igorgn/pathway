import React, {useCallback, useEffect} from 'react';
import {View, Text} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {selectActivities} from '../../redux/activities/activities-selectors';
import {ActivityItem} from './components/activity-item';
import {FlatList, ListRenderItem} from 'react-native';
import {icons} from '../../assets/icons/icons';
import {testIDs} from '../../utils/test-ids';
import {getActivities} from '../../redux/activities/thunks/get-activities';
import {useNavigationButtonPressed} from '../../utils/hooks/use-navigation-button-pressed';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {Screens} from '../../../types/enums/screens';

export const TAB_BAR_BUTTON_ID = 'AddActivity';

const strings = {
  activities: 'Activities',
  youHaveNoActivities: 'You have no activities',
  toAddAnActivity: 'To add an activity press + button',
};

export const MainScreen: NavigationFunctionComponent = React.memo(
  ({componentId}) => {
    const {activities, activitiesIDs} = useSelector(selectActivities);
    const dispatch = useDispatch();

    const pushAddActivityScreen = useCallback(
      (buttonId: string) => {
        if (buttonId) {
          Navigation.push(componentId, {
            component: {name: Screens.AddActivity},
          });
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
          testID={testIDs.activitiesList}
        />
      ),
      [activitiesIDs, keyExtractor, renderItem],
    );

    const renderEmptyState = useCallback(
      () => (
        <View center marginT-s4>
          <Text text70BO>{strings.youHaveNoActivities}</Text>
          <Text marginT-s4>{strings.toAddAnActivity}</Text>
        </View>
      ),
      [],
    );

    return (
      <View flex useSafeArea testID={testIDs.mainScreen}>
        <View flex padding-s4>
          {activitiesIDs.length ? renderActivityList() : renderEmptyState()}
        </View>
      </View>
    );
  },
);

MainScreen.options = {
  topBar: {
    title: {text: strings.activities},
    rightButtons: [
      {
        icon: icons.buttons.add,
        id: TAB_BAR_BUTTON_ID,
        testID: testIDs.addActivityTabBarButton,
      },
    ],
  },
};
