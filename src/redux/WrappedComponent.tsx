import React from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {Provider} from 'react-redux';
import store from './store';

const WrappedComponent = (Component: NavigationFunctionComponent) => {
  return function inject(props: any) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
    return <EnhancedComponent />;
  };
};

export default WrappedComponent;
