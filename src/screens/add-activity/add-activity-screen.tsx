import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectActivities} from '../../redux/activities/activities-selectors';
import {Button, View, Text, TextField} from 'react-native-ui-lib';
import {useNavigation} from 'react-native-navigation-hooks/dist';
import {testIDs} from '../../utils/test-ids';
import {addActivity} from '../../redux/activities/thunks/add-activity';
import {withAppProviders} from '../with-app-providers';

const strings = {
  enterNameOfActivity: 'Enter name of activity',
  suchActivityAlreadyExists: 'Such activity already exists',
  addActivity: 'Add activity',
};

const AddActivityScreenComponent = () => {
  const {pop} = useNavigation();
  const {activitiesIDs} = useSelector(selectActivities);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAddActivity = useCallback(() => {
    if (!name) {
      setError(strings.enterNameOfActivity);
      return;
    }
    if (activitiesIDs.includes(name)) {
      setError(strings.suchActivityAlreadyExists);
      return;
    }
    dispatch(addActivity(name));
    pop();
  }, [activitiesIDs, dispatch, name, pop]);

  const handleNameFieldChange = useCallback((text: string) => {
    setError('');
    setName(text);
  }, []);

  return (
    <View flex useSafeArea testID={testIDs.addActivityScreen}>
      <View padding-s4 flex>
        <Text text70BO marginB-s3>
          {strings.enterNameOfActivity}
        </Text>
        <TextField
          onChangeText={handleNameFieldChange}
          error={error}
          autoFocus
          testID={testIDs.activityNameInput}
        />
        <Button
          onPress={handleAddActivity}
          bg-grey40
          label={strings.addActivity}
          testID={testIDs.addActivityScreenButton}
        />
      </View>
    </View>
  );
};

export const AddActivityScreen = withAppProviders(AddActivityScreenComponent);

AddActivityScreen.options = {
  topBar: {
    title: {text: strings.addActivity},
  },
};
