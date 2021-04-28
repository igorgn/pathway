import {Navigation} from 'react-native-navigation';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Screens} from './src/types/enums/screens';
import MainScreen from './src/screens/main/main-screen';
import {registerScreens} from './src/screens/register-screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.Main,
            },
          },
        ],
      },
    },
  });
});

AppRegistry.registerComponent(appName, () => MainScreen);
