import {format, isSameMonth} from 'date-fns';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {ActivityDay} from '../../../../types/interfaces/activities';

const DATE_FORMAT = 'dd';
interface DayItemProps {
  day?: ActivityDay;
  dayID: string;
  onPress: (dayID: string) => void;
  activeMonth: string;
}

export const DayItem = React.memo(
  ({day, dayID, onPress, activeMonth}: DayItemProps) => {
    const active = isSameMonth(new Date(dayID), new Date(activeMonth));

    const markDay = () => (active ? onPress(dayID) : null);
    const completed = !!day?.completed;

    return (
      <Pressable onPress={markDay}>
        <View
          center
          marginV-10
          br100
          style={styles({completed, active}).container}>
          <Text>{format(new Date(dayID), DATE_FORMAT)}</Text>
        </View>
      </Pressable>
    );
  },
);

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
