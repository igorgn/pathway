import React from 'react';
import {
  NavigationComponentProps,
  NavigationFunctionComponent,
} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {reduxStore} from './redux-store';

export const withReduxProvider = (Component: NavigationFunctionComponent) => {
  return <T extends NavigationComponentProps>(props: T) => {
    const EnhancedComponent = () => (
      <Provider store={reduxStore}>
        <Component {...props} />
      </Provider>
    );
    return <EnhancedComponent />;
  };
};
