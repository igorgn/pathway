import {Assets} from 'wix-react-native-ui-lib';

import * as ExtraInitialiser from './ExtraInitialiser';

export default class ExampleModule {
  // This initializes the login-state.
  // It is only allowed here because this is demo module. Real modules must not have an
  // inits here what-so-ever.
  __unsafe__initializeDemoModule() {
    ExtraInitialiser.init();

    const mockTools = require('wix-one-app-engine/lib/MockTools');

    const mockMode = mockTools.getLoginMode();
    //provide the mock data depending on what mock level the packager is running at
    switch (mockMode) {
      case 'quickLogin':
        // Takes configuration from file: one-app-engine.private.js
        mockTools.setLoginDataFromLocalConfigFile();
        break;
      case 'offline':
        // Should be set in e2e tests
        break;

      default:
        console.warn('Unhandled mock Mode: ' + mockMode);
    }
  }

  // returns an array of components that your example module provides
  // [{id: string, generator: () => Component, description: string}]
  components() {
    return [
      {
        id: 'demo.DemoTab',
        generator: () => require('./DemoTab').DemoTab,
        description: 'A demo tab used in the example project',
      },
    ];
  }

  // returns an array of methods that your example module provides
  // [{id: string, generator: () => function, description: string}]
  methods() {
    return [];
  }

  // returns a string that will be used as a prefix for your example module's exports
  prefix() {
    return 'demo';
  }

  // will be called whenever the app's state is changed with the new state
  onAppStateChanged(appState) {}

  // should return the tabs the example module wishes to display for a given app state
  tabs() {
    return [
      {
        id: 'demoTab', // this should match the tab id in the package.json oneAppEngine section
        label: 'DEMO',
        biLabel: 'demo',
        screen: 'demo.DemoTab',
        icon: Assets.icons.general.help,
        selectedIcon: Assets.icons.general.help,
        title: 'DEMO',
        testID: 'wix.example.BOTTOM_TAB_DEMO',
      },
    ];
  }
}
