jest.mock('uuid', () => {
  return {v4: () => 'test-uuid'};
});

jest.mock('react-native-navigation', () => {
  return {Navigation: {pop: () => {}}};
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
