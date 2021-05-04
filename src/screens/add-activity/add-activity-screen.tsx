import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectActivities} from '../../redux/activities/activities-selectors';
import {Button, View, Text, TextField} from 'react-native-ui-lib';
import {addActivity} from '../../redux/activities/thunks/add-activity';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
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

export const AddActivityScreenComponent: NavigationFunctionComponent = ({
  componentId,
}) => {
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

    Navigation.pop(componentId);
  }, [activitiesIDs, componentId, dispatch, name]);

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

export const AddActivityScreen: NavigationFunctionComponent = withReduxProvider(
  AddActivityScreenComponent,
);

AddActivityScreen.options = {
  topBar: {
    title: {text: strings.addActivity},
  },
};
