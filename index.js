import {Navigation} from 'react-native-navigation';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {EScreens} from './src/types/enums/EScreens';
import MainScreen from './src/screens/main/MainScreen';
import AddActivityScreen from './src/screens/addActivity/AddActivityScreen';
import {withNavigationProvider} from 'react-native-navigation-hooks/dist';

Navigation.registerComponent(EScreens.Main, () =>
  withNavigationProvider(MainScreen),
);
Navigation.registerComponent(EScreens.AddActivity, () =>
  withNavigationProvider(AddActivityScreen),
);

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

AppRegistry.registerComponent(appName, () => App);
