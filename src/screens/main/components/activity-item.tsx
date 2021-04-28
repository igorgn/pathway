import {format} from 'date-fns';
import React, {useCallback} from 'react';
import {Alert} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {deleteActivity} from '../../../redux/activities/thunks/delete-activity';
import {markActivityCompleted} from '../../../redux/activities/thunks/mark-activity-completed';
import {useAppDispatch} from '../../../redux/reduxStore';
import {Activity} from '../../../types/interfaces/activities';
import {DayItem} from './day-item';

interface ActivityItemProps {
  activity: Activity;
}

export const ActivityItem = React.memo(
  ({activity: {months, name}}: ActivityItemProps) => {
    const dispatch = useAppDispatch();

    const markDay = useCallback(
      (weekKey: string, dayKey: string) => {
        dispatch(markActivityCompleted({weekKey, dayKey, name}));
      },
      [dispatch, name],
    );

    const handleDelete = useCallback(() => {
      Alert.alert(`Delete activity "${name}"`, 'This action is irreversible', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => dispatch(deleteActivity(name)),
          style: 'destructive',
        },
      ]);
    }, [dispatch, name]);

    const renderWeekRow = useCallback(
      (weekKey: string) => {
        const {days, keys} = months.weeks[weekKey];
        return (
          <View row spread key={weekKey}>
            {keys.map(dayKey => {
              return (
                <DayItem key={dayKey} day={days[dayKey]} onPress={markDay} />
              );
            })}
          </View>
        );
      },
      [markDay, months.weeks],
    );

    return (
      <View marginB-s4>
        <View row spread>
          <View>
            <Text text60BO>{name}</Text>
            <Text text80>{format(new Date(), 'MMMM')}</Text>
          </View>
          <Text text80 red30 onPress={handleDelete}>
            Delete
          </Text>
        </View>
        <View>{months.keys.map(renderWeekRow)}</View>
      </View>
    );
  },
);
