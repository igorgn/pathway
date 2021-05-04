import {format, startOfMonth} from 'date-fns';
import React, {useCallback, useMemo} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  ListRenderItem,
  Platform,
  StyleSheet,
} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {deleteActivity} from '../../../redux/activities/thunks/delete-activity';
import {markActivityCompleted} from '../../../redux/activities/thunks/mark-activity-completed';
import {useAppDispatch} from '../../../redux/reduxStore';
import {
  Activity,
  ActivityMonth,
  ActivityMonths,
} from '../../../../types/interfaces/activities';
import {generateMonths} from '../../../utils/generate-months';
import {WeekRow} from './week-row';
import {useSnapHorizontalFlatList} from '../../../utils/hooks/use-months-list-handler';
import {constants} from '../../../utils/constants';

const CALENDAR_WIDTH = Dimensions.get('window').width - 32;

const DATE_FORMAT = 'MMMM';

const strings = {
  delete: 'Delete',
};

const CURRENT_MONTH_ID = format(
  startOfMonth(new Date()),
  constants.DAY_ID_DATE_FORMAT,
);
interface ActivityItemProps {
  activity: Activity;
}

export const ActivityItem = React.memo(
  ({activity: {name, daysIDs, days}}: ActivityItemProps) => {
    const dispatch = useAppDispatch();
    const months: ActivityMonths = useMemo(() => generateMonths(daysIDs), [
      daysIDs,
    ]);

    const initialActiveMonth = useMemo(
      () => months.monthsIDs.indexOf(CURRENT_MONTH_ID),
      [],
    );

    const {activeListIndex, flatListProps} = useSnapHorizontalFlatList(
      CALENDAR_WIDTH,
    );

    const activeMonth = useMemo(() => months.monthsIDs[activeListIndex], [
      activeListIndex,
      months.monthsIDs,
    ]);

    const markDay = useCallback(
      (dayID: string) => {
        dispatch(markActivityCompleted({name, dayID}));
      },
      [name],
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
    }, [name]);

    const renderWeekRow = useCallback(
      (weeks: string[], index: number) => (
        <WeekRow
          activeMonth={activeMonth}
          days={days}
          onPress={markDay}
          weeks={weeks}
          key={index}
        />
      ),
      [activeMonth, days, markDay],
    );

    const renderMonths: ListRenderItem<ActivityMonth> = useCallback(
      ({item: {weeks}, index}) => (
        <View paddingH-s2 key={index} style={styles.monthContainer}>
          {weeks.map(renderWeekRow)}
        </View>
      ),
      [renderWeekRow],
    );

    return (
      <View marginB-s4>
        <View row spread>
          <View>
            <Text text60BO>{name}</Text>
            <Text text80>{format(new Date(activeMonth), DATE_FORMAT)}</Text>
          </View>
          <Text text80 red30 onPress={handleDelete}>
            {strings.delete}
          </Text>
        </View>
        <Animated.FlatList
          initialScrollIndex={initialActiveMonth}
          data={months.moths}
          renderItem={renderMonths}
          horizontal={true}
          snapToInterval={CALENDAR_WIDTH}
          viewabilityConfig={{itemVisiblePercentThreshold: 90}}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate={Platform.OS === 'ios' ? 0 : 0.9}
          snapToAlignment="start"
          scrollEventThrottle={16}
          disableIntervalMomentum={true}
          {...flatListProps}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    borderWidth: 1,
  },
  monthContainer: {
    width: CALENDAR_WIDTH,
  },
});
