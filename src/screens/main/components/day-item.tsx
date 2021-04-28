import {format, isThisMonth} from 'date-fns';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {ActivityDay} from '../../../types/interfaces/activities';

interface DayItemProps {
  day: ActivityDay;
  onPress: (weekKey: string, dayKey: string) => void;
}

export const DayItem = React.memo(
  ({day: {completed, dayKey, weekKey}, onPress}: DayItemProps) => {
    const active = isThisMonth(new Date(dayKey));

    const markDay = () => (active ? onPress(weekKey, dayKey) : null);

    return (
      <Pressable onPress={markDay}>
        <View
          center
          marginV-10
          br100
          style={styles({completed, active}).container}>
          <Text>{format(new Date(dayKey), 'dd')}</Text>
        </View>
      </Pressable>
    );
  },
);

const styles = ({completed, active}: {completed: boolean; active: boolean}) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      width: 30,
      height: 30,
      backgroundColor: completed ? 'red' : 'transparent',
      opacity: active ? 1 : 0.3,
    },
  });
