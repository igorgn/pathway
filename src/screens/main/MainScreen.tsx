import React, {useCallback, useEffect, useRef} from 'react';
import {View, Text} from 'react-native-ui-lib';
import {
  useNavigation,
  withNavigationProvider,
} from 'react-native-navigation-hooks/dist';
import {EScreens} from '../../types/enums/EScreens';
import {useSelector} from 'react-redux';
import {selectActivities} from '../../redux/activities/activitiesSelectors';
import ActivityItem from './components/ActivityItem';
import {EmitterSubscription, FlatList, ListRenderItem} from 'react-native';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import icons from '../../assets/icons/icons';
import WrappedComponent from '../../redux/WrappedComponent';
import testIDs from '../../utils/testIDs';

export const TAB_BAR_BUTTON_ID = 'AddActivity';

const MainScreenComponent: NavigationFunctionComponent = ({componentId}) => {
  // wrapping navigation with abstraction could be a nice touch
  const {push} = useNavigation();
  const {activities, activitiesKeys} = useSelector(selectActivities);

  const renderItem: ListRenderItem<string> = useCallback(
    ({item}) => (
      <ActivityItem key={activities[item].name} activity={activities[item]} />
    ),
    [activities],
  );

  const keyExtractor = useCallback((item: string) => item, []);

  const navListener = useRef<null | EmitterSubscription>(null);

  useEffect(() => {
    if (!navListener.current) {
      navListener.current = Navigation.events().registerNavigationButtonPressedListener(
        event => {
          if (event.buttonId === TAB_BAR_BUTTON_ID) {
            push(EScreens.AddActivity);
          }
        },
      );
    }

    return () => {
      navListener.current?.remove();
    };
  }, [componentId, push]);

  return (
    <View flex useSafeArea testID={testIDs.mainScreen}>
      <View flex padding-s4>
        {activitiesKeys.length ? (
          <FlatList
            data={activitiesKeys}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            testID={testIDs.activitiesList}
          />
        ) : (
          <View center marginT-s4>
            <Text text70BO>You have no activities</Text>
            <Text marginT-s4>To add an activity press + button</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const MainScreen = withNavigationProvider(
  WrappedComponent(MainScreenComponent),
);

export default MainScreen;

MainScreen.options = {
  topBar: {
    title: {text: 'Activities'},
    rightButtons: [
      {
        icon: icons.buttons.add,
        id: TAB_BAR_BUTTON_ID,
        testID: testIDs.addActivityTabBarButton,
      },
    ],
  },
};
