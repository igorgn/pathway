import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectActivities} from '../../redux/activities/activitiesSelectors';
import {addActivity} from '../../redux/activities/activitiesReducer';
import {Button, View, Text, TextField} from 'react-native-ui-lib';
import {
  useNavigation,
  withNavigationProvider,
} from 'react-native-navigation-hooks/dist';
import WrappedComponent from '../../redux/WrappedComponent';
import testIDs from '../../utils/testIDs';

const AddActivityScreenComponent = () => {
  const {pop, mergeOptions} = useNavigation();
  const {activitiesKeys} = useSelector(selectActivities);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const add = useCallback(() => {
    if (!name) {
      setError('Enter name of activity');
      return;
    }
    if (activitiesKeys.includes(name)) {
      setError('Such activity already exists');
      return;
    }
    dispatch(addActivity(name));
    pop();
  }, [activitiesKeys, dispatch, name, pop]);

  const handleChangeText = useCallback((text: string) => {
    setError('');
    setName(text);
  }, []);

  useEffect(() => {
    mergeOptions({
      topBar: {
        title: {text: 'Add activity'},
      },
    });
  }, [mergeOptions]);

  return (
    <View flex useSafeArea testID={testIDs.addActivityScreen}>
      <View padding-s4 flex>
        <Text text70BO marginB-s3>
          Enter activity name:
        </Text>
        <TextField
          onChangeText={handleChangeText}
          error={error}
          autoFocus
          testID={testIDs.activityNameInput}
        />
        <Button
          onPress={add}
          bg-grey40
          label="Add activity"
          testID={testIDs.addActivityScreenButton}
        />
      </View>
    </View>
  );
};

const AddActivityScreen = withNavigationProvider(
  WrappedComponent(AddActivityScreenComponent),
);

export default AddActivityScreen;

AddActivityScreen.options = {
  topBar: {
    title: {text: 'Add activity'},
  },
};
