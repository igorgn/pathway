import {format, isThisMonth} from 'date-fns';
import React, {useMemo} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {ActivityDay} from '../../../types/interfaces/Activities';

interface Props {
  day: ActivityDay;
  onPress: () => void;
}

const DayItem = ({day: {completed, dayKey}, onPress}: Props) => {
  const active = useMemo(() => isThisMonth(new Date(dayKey)), [dayKey]);

  return (
    <Pressable onPress={active ? onPress : null}>
      <View
        center
        marginV-10
        br100
        style={styles({completed, active}).container}>
        <Text>{format(new Date(dayKey), 'dd')}</Text>
      </View>
    </Pressable>
  );
};

export default React.memo(DayItem);

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
