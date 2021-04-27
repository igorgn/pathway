import {format} from 'date-fns';
import React, {useCallback} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {useAppDispatch} from '../../../redux/store';
import {Activity} from '../../../types/interfaces/Activities';
import {markCompleted} from '../../../redux/activities/activitiesReducer';
import DayItem from './DayItem';

// Do not use generic naming, this should be ActivityItemProps
interface Props {
  activity: Activity;
}

// No memo?
const ActivityItem = ({activity: {months, name}}: Props) => {
  const dispatch = useAppDispatch();

  //use callback is not needed if all of the dependencies are component props which are already wrapped in useMemo.
  const markDay = useCallback(
    (weekKey: string, dayKey: string) => {
      dispatch(markCompleted({weekKey, dayKey, name}));
    },
    // are you sure about using dispatch function as a dependency?
    [dispatch, name],
  );

  // render function is too complex (nested loop), and it can be split it to separate functions, like renderWeekRow and similar, to make it more readable
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
                // anonymous function bellow, - useCallback wraps only the result of this function, but not the onPress function which is passed to child component.
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

// same comment about default exports
export default ActivityItem;
