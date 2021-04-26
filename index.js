import {Navigation} from 'react-native-navigation';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {EScreens} from './src/types/enums/EScreens';
import MainScreen from './src/screens/main/MainScreen';
import AddActivityScreen from './src/screens/addActivity/AddActivityScreen';

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
