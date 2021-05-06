jest.mock(
  './node_modules/react-native/Libraries/Animated/NativeAnimatedHelper',
);
jest.mock('axios');

jest.mock('uuid', () => {
  return {v4: () => 'test-uuid'};
});

jest.mock('react-native', () => {
  const ReactNative = jest.requireActual('react-native');
  const Alert = {alert: jest.fn()};

  return Object.setPrototypeOf(
    {
      Alert,
    },
    ReactNative,
  );
});

jest.mock('react-native-navigation', () => {
  const events = () => ({
    registerNavigationButtonPressedListener: () => {},
  });
  return {Navigation: {pop: () => {}, push: () => {}, events}};
});

jest.mock('react-native-ui-lib', () => {
  const React = require('react');
  const UI = jest.requireActual('react-native-ui-lib');
  function mockComponent(name) {
    return class extends React.PureComponent {
      static displayName = name;
      render() {
        return React.createElement(name, this.props);
      }
    };
  }
  const mocks = {
    View: mockComponent('View'),
    Text: mockComponent('Text'),
    TextField: mockComponent('TextField'),
    Button: mockComponent('Button'),
  };
  return new Proxy(UI, {
    get(obj, key) {
      return key in mocks ? mocks[key] : obj[key];
    },
  });
});
