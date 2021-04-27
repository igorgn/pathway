import {format} from 'date-fns';
import React, {useCallback} from 'react';
import {Alert} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import deleteActivity from '../../../redux/activities/thunks/addActivity';
import markActivityCompleted from '../../../redux/activities/thunks/markActivityCompleted';
import {useAppDispatch} from '../../../redux/store';
import {Activity} from '../../../types/interfaces/Activities';
import DayItem from './DayItem';

interface Props {
  activity: Activity;
}

const ActivityItem = ({activity: {months, name}}: Props) => {
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
      <View>
        {months.keys.map(weekKey => {
          const {days, keys} = months.weeks[weekKey];
          return (
            <View row spread key={weekKey}>
              {keys.map(dayKey => {
                const onPress = () => markDay(weekKey, dayKey);
                return (
                  <DayItem key={dayKey} day={days[dayKey]} onPress={onPress} />
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ActivityItem;
