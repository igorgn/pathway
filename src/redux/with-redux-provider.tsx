import React from 'react';
import {
  NavigationComponentProps,
  NavigationFunctionComponent,
} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {reduxStore} from './reduxStore';
import hoistNonReactStatics from 'hoist-non-react-statics';

export const withReduxProvider = (Component: NavigationFunctionComponent) => {
  const EnhancedComponent = (props: NavigationComponentProps) => (
    <Provider store={reduxStore}>
      <Component {...props} />
    </Provider>
  );

  hoistNonReactStatics(EnhancedComponent, Component);

  return EnhancedComponent;
};
