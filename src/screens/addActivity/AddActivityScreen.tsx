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

  // generic and not clear naming, could be improved.
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

  // naming can also be improved here as well
  const handleChangeText = useCallback((text: string) => {
    setError('');
    setName(text);
  }, []);

  useEffect(() => {
    // the code bellow could be extracted to navigation-utils.ts, e.g. setTopBar(options: object), or even setTopBarTitle(title: string)
    mergeOptions({
      topBar: {
        // All of the strings could be moved to constants at the top of the file. Also, this specific string is duplicated bellow.
        title: {text: 'Add activity'},
      },
    });
    // are you sure about using functions as dependencies?
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

// There is duplication in all of the screens when wrapping ad hocs. You can create a common screen wrapper function which would use all of these wrappers required for all screens (redux & navigation), and then use this common wrapper when registering screens at /index.js.
const AddActivityScreen = withNavigationProvider(
  WrappedComponent(AddActivityScreenComponent),
);

// same comment about default exports
export default AddActivityScreen;

AddActivityScreen.options = {
  topBar: {
    title: {text: 'Add activity'},
  },
};
