import {Navigation} from 'react-native-navigation';
import {Screens} from '../../types/enums/screens';
import {withReduxProvider} from '../redux/with-redux-provider';
import {AddActivityScreen} from './add-activity/add-activity-screen';
import {MainScreen} from './main/main-screen';

export const registerScreens = () => {
  Navigation.registerComponent(Screens.Main, () =>
    withReduxProvider(MainScreen),
  );
  Navigation.registerComponent(Screens.AddActivity, () =>
    withReduxProvider(AddActivityScreen),
  );
};
