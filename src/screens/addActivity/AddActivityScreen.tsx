import React, {useState} from 'react';
import {View, Text, TextInput, SafeAreaView, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectActivities} from '../../redux/activities/activitiesSelectors';
import {addActivity} from '../../redux/activities/activitiesReducer';

const AddActivityScreen = () => {
  const activities = useSelector(selectActivities);
  console.log(activities);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const add = () => {
    dispatch(addActivity({name}));
  };
  return (
    <SafeAreaView>
      <View>
        <Text>Activity name</Text>
        <TextInput onChangeText={setName} />
        <View style={{marginTop: 'auto', marginBottom: 16}}>
          <Button title="Add" onPress={add} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddActivityScreen;
