import {format} from 'date-fns';
import React, {useCallback} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {useAppDispatch} from '../../../redux/store';
import {Activity} from '../../../types/interfaces/Activities';
import {markCompleted} from '../../../redux/activities/activitiesReducer';
import DayItem from './DayItem';

interface Props {
  activity: Activity;
}

const ActivityItem = ({activity: {months, name}}: Props) => {
  const dispatch = useAppDispatch();
  const markDay = useCallback(
    (weekKey: string, dayKey: string) => {
      dispatch(markCompleted({weekKey, dayKey, name}));
    },
    [dispatch, name],
  );

  return (
    <View marginB-s4>
      <Text text60BO>{name}</Text>
      <Text text80>{format(new Date(), 'MMMM')}</Text>
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
