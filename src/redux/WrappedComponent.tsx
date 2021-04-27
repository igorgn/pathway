import React from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {Provider} from 'react-redux';
import store from './store';

// Generic name. No idea what it wraps or does without looking at the implementation.
const WrappedComponent = (Component: NavigationFunctionComponent) => {
  // inject name is very generic and ambigous, we can figure out a better naming.
  // props are any type, - you could you generics <T> => props: T, or you could even use interface provided by Navigation, T extends NavigationComponentProps or smth similar.
  return function inject(props: any) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
    return <EnhancedComponent />;
  };
};

//Consider stop using default exports because:
// 1. it makes much easier to search and to refactor with named exports.
// 2. by having named export you are making sure that the name you defined is consistent across the project and is not changed when importing it elsewhere.
export default WrappedComponent;
