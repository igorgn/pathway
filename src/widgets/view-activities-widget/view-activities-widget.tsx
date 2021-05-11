import React, {useEffect, useCallback, useMemo} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import {Screens} from '../../../types/enums/screens';
import {useDispatch, useSelector} from 'react-redux';
import {getActivities} from '../../redux/activities/thunks/get-activities';
import {withReduxProvider} from '../../redux/with-redux-provider';
import {selectActivitiesWidgetData} from '../../redux/activities/activities-selectors';
import {ActivityData} from '../../../types/interfaces/activities';

const strings = {
  activities: 'Activities',
  viewActivities: 'View Activities',
  progress: 'Progress',
  addActivity: '+ Add activity',
};

export const VIEW_ACTIVITIES_WIDGET_TES_IDS = {
  PROGRESS_CONTAINER: 'PROGRESS_CONTAINER',
  ACTION_LABEL: 'ACTION_LABEL',
  ACTIVITY_LABEL: 'ACTIVITY_LABEL',
  ACTIVITY_COUNT: 'ACTIVITY_COUNT',
};

const ViewActivitiesWidgetComponent = ({componentId}) => {
  const activitiesData = useSelector(selectActivitiesWidgetData);
  const haveActivities = useMemo(
    () => !!activitiesData.length,
    [activitiesData],
  );
  const actionLabel = haveActivities
    ? strings.viewActivities
    : strings.addActivity;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  const openActivities = () => {
    const navigateTo = haveActivities ? Screens.Main : Screens.AddActivity;
    Navigation.push(componentId, {
      component: {name: navigateTo},
    });
  };

  const renderActivityInfo = useCallback(
    ({daysCompleted, name, id}: ActivityData) => (
      <View row key={id}>
        <Text
          text80
          marginR-s3
          testID={`${VIEW_ACTIVITIES_WIDGET_TES_IDS.ACTIVITY_LABEL}${id}`}>
          {name}
        </Text>
        <Text
          text80BO
          testID={`${VIEW_ACTIVITIES_WIDGET_TES_IDS.ACTIVITY_COUNT}${id}`}>
          {daysCompleted}
        </Text>
      </View>
    ),
    [],
  );

  const renderProgress = useCallback(
    () => (
      <View testID={VIEW_ACTIVITIES_WIDGET_TES_IDS.PROGRESS_CONTAINER}>
        <Text text80 grey30>
          {strings.progress}
        </Text>
        {activitiesData.map(renderActivityInfo)}
      </View>
    ),
    [activitiesData, renderActivityInfo],
  );

  return (
    <View paddingH-s4>
      <View row spread centerV>
        <Text text70BO>{strings.activities}</Text>
        <Text
          text80BO
          blue30
          onPress={openActivities}
          testID={VIEW_ACTIVITIES_WIDGET_TES_IDS.ACTION_LABEL}>
          {actionLabel}
        </Text>
      </View>
      {haveActivities ? renderProgress() : <></>}
    </View>
  );
};

export const ViewActivitiesWidget = withReduxProvider(
  ViewActivitiesWidgetComponent,
);
