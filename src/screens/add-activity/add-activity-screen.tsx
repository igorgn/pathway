import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectActivities} from '../../redux/activities/activities-selectors';
import {Button, View, Text, TextField} from 'react-native-ui-lib';
import {testIDs} from '../../utils/test-ids';
import {addActivity} from '../../redux/activities/thunks/add-activity';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';

const strings = {
  enterNameOfActivity: 'Enter name of activity',
  suchActivityAlreadyExists: 'Such activity already exists',
  addActivity: 'Add activity',
};

export const AddActivityScreen: NavigationFunctionComponent = React.memo(
  ({componentId}) => {
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
    }, [activitiesIDs, componentId, name]);

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
  },
);

AddActivityScreen.options = {
  topBar: {
    title: {text: strings.addActivity},
  },
};
