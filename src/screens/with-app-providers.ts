import {NavigationFunctionComponent} from 'react-native-navigation';
import {withNavigationProvider} from 'react-native-navigation-hooks/dist';
import {withReduxProvider} from '../redux/with-redux-provider';

export const withAppProviders = (Component: NavigationFunctionComponent) =>
  withNavigationProvider(withReduxProvider(Component));
