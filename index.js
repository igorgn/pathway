import {Navigation} from 'react-native-navigation';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
// Same comment about naming, adding "E" in front if Enum and the file name.
import {EScreens} from './src/types/enums/EScreens';
import MainScreen from './src/screens/main/MainScreen';
import AddActivityScreen from './src/screens/addActivity/AddActivityScreen';

//Navigation setup could be moved out
Navigation.registerComponent(EScreens.Main, () => MainScreen);
Navigation.registerComponent(EScreens.AddActivity, () => AddActivityScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: EScreens.Main,
            },
          },
        ],
      },
    },
  });
});

AppRegistry.registerComponent(appName, () => MainScreen);
