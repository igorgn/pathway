import React from 'react';

import {View} from 'react-native-ui-lib';
import {ActivityDay} from '../../../../types/interfaces/activities';
import {DayItem} from './day-item';

interface WeekRowProps {
  weeks: string[];
  activeMonth: string;
  days: Record<string, ActivityDay>;
  onPress: (dayID: string) => void;
  activityID: string;
}

export const WeekRow = React.memo(
  ({weeks, activeMonth, onPress, days, activityID}: WeekRowProps) => {
    return (
      <View flex row spread>
        {weeks.map(dayID => (
          <DayItem
            key={dayID}
            dayID={dayID}
            day={days[dayID]}
            activeMonth={activeMonth}
            onPress={onPress}
            activityID={activityID}
          />
        ))}
      </View>
    );
  },
);
