import React, {useCallback, useEffect} from 'react';
import {View, Text} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {selectActivities} from '../../redux/activities/activities-selectors';
import {ActivityItem} from './components/activity-item';
import {FlatList, ListRenderItem} from 'react-native';
import {icons} from '../../assets/icons/icons';
import {testIDs} from '../../utils/test-ids';
import {getActivities} from '../../redux/activities/thunks/get-activities';
import {withAppProviders} from '../with-app-providers';
import {useNavigationButtonPressed} from '../../utils/hooks/use-navigation-button-pressed';

export const TAB_BAR_BUTTON_ID = 'AddActivity';

const strings = {
  activities: 'Activities',
  youHaveNoActivities: 'You have no activities',
  toAddAnActivity: 'To add an activity press + button',
};

const MainScreenComponent = () => {
  const {activities, activitiesKeys} = useSelector(selectActivities);
  const dispatch = useDispatch();
  useNavigationButtonPressed(TAB_BAR_BUTTON_ID);

  const renderItem: ListRenderItem<string> = useCallback(
    ({item}) => (
      <ActivityItem key={activities[item].name} activity={activities[item]} />
    ),
    [activities],
  );

  const keyExtractor = useCallback((item: string) => item, []);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const renderActivityList = useCallback(
    () => (
      <FlatList
        data={activitiesKeys}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        testID={testIDs.activitiesList}
      />
    ),
    [activitiesKeys, keyExtractor, renderItem],
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
        {activitiesKeys.length ? renderActivityList() : renderEmptyState()}
      </View>
    </View>
  );
};

export const MainScreen = withAppProviders(MainScreenComponent);

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
