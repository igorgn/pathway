import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectActivities} from '../../redux/activities/activities-selectors';
import {Button, View, Text, TextField} from 'wix-react-native-ui-lib';
import {addActivity} from '../../redux/activities/thunks/add-activity';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {findActivityFromName} from '../../utils/find-activity-from-name';
import {withReduxProvider} from '../../redux/with-redux-provider';

const strings = {
  enterNameOfActivity: 'Enter name of activity',
  suchActivityAlreadyExists: 'Such activity already exists',
  addActivity: 'Add activity',
};

export const ADD_ACTIVITY_SCREEN_TEST_IDS = {
  CONTAINER: 'CONTAINER',
  LABEL: 'LABEL',
  TEXT_FIELD: 'TEXT_FIELD',
  CTA: 'CTA',
};

const AddActivityScreenComponent: NavigationFunctionComponent = ({
  componentId,
}) => {
  const activities = useSelector(selectActivities);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAddActivity = useCallback(() => {
    if (!name) {
      setError(strings.enterNameOfActivity);
      return;
    }

    if (findActivityFromName(activities, name)) {
      setError(strings.suchActivityAlreadyExists);
      return;
    }

    dispatch(addActivity(name));

    Navigation.pop(componentId);
  }, [activities, componentId, name]);

  const handleNameFieldChange = useCallback((text: string) => {
    setError('');
    setName(text);
  }, []);

  return (
    <View flex useSafeArea testID={ADD_ACTIVITY_SCREEN_TEST_IDS.CONTAINER}>
      <View padding-s4 flex>
        <Text text70BO marginB-s3 testID={ADD_ACTIVITY_SCREEN_TEST_IDS.LABEL}>
          {strings.enterNameOfActivity}
        </Text>
        <TextField
          onChangeText={handleNameFieldChange}
          value={name}
          error={error}
          autoFocus
          testID={ADD_ACTIVITY_SCREEN_TEST_IDS.TEXT_FIELD}
        />
        <Button
          onPress={handleAddActivity}
          bg-grey40
          label={strings.addActivity}
          testID={ADD_ACTIVITY_SCREEN_TEST_IDS.CTA}
        />
      </View>
    </View>
  );
};

export const AddActivityScreen = withReduxProvider(AddActivityScreenComponent);

AddActivityScreen.options = {
  topBar: {
    title: {text: strings.addActivity},
  },
};
