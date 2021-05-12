jest.mock(
  './node_modules/react-native/Libraries/Animated/src/NativeAnimatedHelper',
);
jest.mock('axios');

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('uuid', () => {
  return {v4: () => 'test-uuid'};
});

jest.mock('react-native-device-info', () => {
  return {isTablet: () => false};
});

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  jest
    .spyOn(RN.AccessibilityInfo, 'isScreenReaderEnabled')
    .mockResolvedValue(false);
  const mocks = {
    NativeModules: {
      StatusBarManager: {getHeight: jest.fn()},
      KeyboardTrackingViewManager: {},
      KeyboardTrackingViewTempManager: {},
      RNGestureHandlerModule: {},
      RNMediaManager: {SendBIEvent: jest.fn()},
    },
    Alert: {
      alert: jest.fn(),
    },
  };
  return new Proxy(RN, {
    get(obj, name) {
      if (name in mocks) {
        return mocks[name];
      }
      return obj[name];
    },
  });
});

jest.mock('react-native-navigation', () => {
  let _component;
  const allEvents = {
    registerCommandListener: jest.fn(),
    registerCommandCompletedListener: jest.fn(),
    registerModalDismissedListener: jest.fn(),
    registerNavigationButtonPressedListener: jest.fn(),
    bindComponent(component) {
      _component = component;
    },
    registerBottomTabSelectedListener: jest.fn(),
    componentEventsObserver: {
      notifyNavigationButtonPressed(event) {
        _component.navigationButtonPressed(event);
      },
    },
  };
  return {
    Navigation: {
      registerComponent: jest.fn(),
      push: jest.fn(),
      showModal: jest.fn(),
      dismissModal: jest.fn(),
      dismissAllModals: jest.fn(),
      events: () => allEvents,
      mergeOptions: jest.fn(),
      setStackRoot: jest.fn(),
      setRoot: jest.fn(),
      popTo: jest.fn(),
      pop: jest.fn(),
      showOverlay: jest.fn(),
      dismissOverlay: jest.fn(),
      addOptionProcessor: jest.fn(),
      addLayoutProcessor: jest.fn(),
    },
    getDeviceLocale: () => 'en',
  };
});

jest.mock('wix-react-native-ui-lib', () => {
  const React = require('react');
  const UI = jest.requireActual('wix-react-native-ui-lib');
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
