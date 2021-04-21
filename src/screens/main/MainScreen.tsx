import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from 'react-native-navigation-hooks/dist';
import {EScreens} from '../../types/enums/EScreens';

const MainScreen = () => {
  const {push} = useNavigation();
  const openAddActivity = () => push(EScreens.AddActivity);

  return (
    <View testID="main-screen">
      <Text>Main Screen</Text>
      <Button onPress={openAddActivity} title={'Add activity'} />
    </View>
  );
};

export default MainScreen;
