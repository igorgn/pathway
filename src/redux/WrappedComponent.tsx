import React from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {Provider} from 'react-redux';
import store from './store';

// I believe this is the component that failed your component.options()
// implementation. try hoisting non react statics as I've mentioned in the chat
// and let me know how it goes, otherwise there might be a bug with react-native-navigation

// Naming should reflect the purpose of HOC
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
