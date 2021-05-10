import {format, isSameMonth} from 'date-fns';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from 'wix-react-native-ui-lib';
import {ActivityDay} from '../../../../types/interfaces/activities';

const DATE_FORMAT = 'dd';

export const DAY_ITEM_TEST_IDS = {
  LABEL: 'DAY_ITEM_LABEL',
  VIEW_CONTAINER: 'DAY_ITEM_VIEW_CONTAINER',
  PRESSABELE: 'DAY_ITEM_PRESSABELE',
};

interface DayItemProps {
  day?: ActivityDay;
  dayID: string;
  onPress: (dayID: string) => void;
  activeMonth: string;
  activityID: string;
}

export const DayItem = React.memo(
  ({day, dayID, onPress, activeMonth, activityID}: DayItemProps) => {
    const active = isSameMonth(new Date(dayID), new Date(activeMonth));

    const markDay = () => (active ? onPress(dayID) : null);
    const completed = !!day?.completed;

    return (
      <Pressable
        onPress={markDay}
        testID={`${DAY_ITEM_TEST_IDS.PRESSABELE}.${activityID}-${dayID}`}>
        <View
          center
          marginV-10
          br100
          style={styles({completed, active}).container}
          testID={`${DAY_ITEM_TEST_IDS.VIEW_CONTAINER}.${activityID}-${dayID}`}>
          <Text testID={`${DAY_ITEM_TEST_IDS.LABEL}.${activityID}-${dayID}`}>
            {format(new Date(dayID), DATE_FORMAT)}
          </Text>
        </View>
      </Pressable>
    );
  },
);

// todo change to not to recreate instance
const styles = ({completed, active}: {completed: boolean; active: boolean}) => {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      width: 30,
      height: 30,
      backgroundColor: completed ? 'red' : 'transparent',
      opacity: active ? 1 : 0.3,
    },
  });
};
