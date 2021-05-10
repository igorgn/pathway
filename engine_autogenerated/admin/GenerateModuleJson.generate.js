const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const isCI = Boolean(process.env.CI || process.env.IS_BUILD_AGENT);
const mockWixStorage = require('@wix/wix-one-app-storage/src/jest/storage-mock');

describe('Generate module.json', () => {
  let config;

  beforeEach(async () => {
    config = JSON.parse(process.env.MODULE_JSON_CONFIG);
    __DEV__ = true;
  });

  it('should generate module.json', async () => {
    config.missing_module_names.forEach((moduleName) => {
      applyGenericMocks();
      applyModuleMocks(moduleName);
      const json = generateModuleJson(moduleName, config.app);
      writeModuleJson(moduleName, config.module_roots_map[moduleName], config.artifacts_folder, json, config.app);
    });
  });


  function applyGenericMocks() {
    // TODO: Module specific mocks should be moved to the appropriate moduels
    const mockUiLib = {
      Assets: {
        icons: {
          tabs: {},
          general: {},
          navigation: {},
          apps: {},
          quickActions: {}
        },
        illustrations: {}
      },
      Typography: {},
      Colors: {
        rgba: jest.fn()
      },
      Shadows: {
        white30: {},
        white40: {},
        dark20: {bottom: {}},
        sh10: {}
      },
      Constants: {
        isIOS: true
      },
      Ids: {},
      Toast: {
        presets: {}
      },
      BorderRadiuses: {},
      Spacings: {},
      Dividers: {},
      withConnectionState: jest.fn((...args) => args),
      asWixScreen: jest.fn(),
      asConnectedKeyboard: jest.fn(),
    };

    try {
      jest.mock('@wix/wix-react-native-ui-lib', () => (mockUiLib), {virtual: true});
      jest.mock('wix-react-native-ui-lib', () => (mockUiLib), {virtual: true});
    } catch {}

    try {
      const mockAsset = {
        Assets: {
          icons: {
            tabs: {},
            general: {},
            navigation: {},
            apps: {}
          },
          illustrations: {}
        },
      };
      jest.mock('@wix/wix-react-native-ui-lib/src', () => (mockAsset), {virtual: true});
      jest.mock('wix-react-native-ui-lib/src', () => (mockAsset), {virtual: true});
    } catch {}

    try {
      jest.mock('react-native-ui-lib', () => ({
        Colors: {},
        PureBaseComponent: class A {},
        BaseComponent: class A {}
      }));
    } catch {}

    try {
      jest.mock('react-native-wix-media', () => ({WixMediaApi: jest.fn()}), {virtual: true});
      jest.mock('@wix/react-native-wix-media', () => ({WixMediaApi: jest.fn()}), {virtual: true});
    } catch {}

    try {
      jest.mock('wix-one-app-storage', () => mockWixStorage, {virtual: true});
      jest.mock('@wix/wix-one-app-storage', () => mockWixStorage, {virtual: true});
    } catch {}

    try {
      jest.mock('wix-one-app-engine/lib/NativeComponents', () => ({
        __esModule: true,
        namedExport: jest.fn(),
        NativeComponents: {
          VideoView: {}
        }
      }));
    } catch {}

    try {
      jest.mock('wix-one-app-engine/lib/MockTools');
    } catch {}

    try {
      jest.mock('@react-native-community/async-storage', () => ({
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
      }));
    } catch {}

    try {
      jest.mock('@react-native-community/slider', () => ({}));
    } catch {}

    try {
      jest.mock('@react-native-community/blur', () => ({}));
    } catch {}

    try {
      jest.mock('@react-native-community/audio-toolkit', () => ({}));
    } catch {}

    try {
      jest.mock('wix-react-native-storybook-template', () => ({}), {virtual: true});
      jest.mock('@wix/wix-react-native-storybook-template', () => ({}), {virtual: true});
    } catch {}

    try {
      jest.mock('recompose', () => ({
        compose: () => () => () => {},
        hoistStatics: jest.fn(),
        withProps: jest.fn(),
        withHandlers: jest.fn(),
        withState: jest.fn(),
        lifecycle: jest.fn(),
        renderComponent: jest.fn(),
        branch: jest.fn(),
      }));
    } catch {}

    try {
      jest.mock('react-native-navigation', () => ({
        Navigation: {
          setRoot: jest.fn(),
          setDefaultOptions: jest.fn(),
          push: jest.fn(),
          pop: jest.fn(),
          popTo: jest.fn(),
          popToRoot: jest.fn(() => Promise.resolve(true)),
          mergeOptions: jest.fn(),
          showModal: jest.fn(),
          dismissModal: jest.fn(),
          dismissAllModals: jest.fn(),
          showOverlay: jest.fn(),
          dismissOverlay: jest.fn(),
          setStackRoot: jest.fn(),
          registerComponent: jest.fn(),
          setLazyComponentRegistrator: jest.fn(),
          events: jest.fn().mockReturnValue({
            registerBottomTabSelectedListener: () => {
              return {
                remove: jest.fn()
              };
            },
            registerComponentDidAppearListener: () => {
              return {
                remove: jest.fn()
              };
            },
            registerComponentDidDisappearListener: () => {
              return {
                remove: jest.fn()
              };
            },
            registerCommandListener: () => {
              return {
                remove: jest.fn()
              };
            },
            registerNavigationButtonPressedListener: () => ({remove: jest.fn()}),
            componentEventsObserver: {
              listeners: [],
            },
          })
        },
      }));
    } catch {}

    try {
      jest.mock('react-native-notifications', () => ({
        Notifications: {
          postLocalNotification: jest.fn(() => Promise.resolve(true))
        }
      }));
    } catch {}

    try {
      jest.mock('react-redux', () => ({
        connect: () => jest.fn(() => {})
      }));
    } catch {}

    try {
      jest.mock('remote-redux-devtools', () => ({
        composeWithDevTools: jest.fn()
      }));
    } catch {}

    try {
      jest.mock('react-native-fs', () => {});
    } catch {}

    try {
      jest.mock('promote-mobile-common', () => ({
        createCommonStore: jest.fn(),
        layoutHelper: {getTopContainerWidth: jest.fn()},
        analytics: {actions: {}},
        navigation: {actions: {}},
        utils: {commons: {}},
      }));
    } catch {}

    try {
      jest.mock('wix-react-native-social', () => {}, {virtual: true});
      jest.mock('@wix/wix-react-native-social', () => {}, {virtual: true});
    } catch {}

    jest.mock('react-native', () => ({
      NativeModules: {
        RNMediaManager: {}
      },
      NativeEventEmitter: {},
      Platform: {
        OS: 'ios',
        select: jest.fn()
      },
      requireNativeComponent: jest.fn(),
      Dimensions: {get: jest.fn(() => ({width: 0, height: 0}))},
      PixelRatio: {get: jest.fn()},
      Alert: {alert: jest.fn()},
      StyleSheet: {create: jest.fn((o) => o), flatten: jest.fn()},
      Animated: {
        timing: jest.fn()
      }
    }));
    jest.mock('react-native-device-info', () => ({}));
    jest.mock('react-native-simple-store', () => ({}));
    jest.mock('react-native-share', () => ({}));
    jest.mock('react-native-keyboard-input', () => ({}));
    jest.mock('react-native-video', () => ({}));
    jest.mock('@react-native-firebase/analytics', () => {
      return () => {
        return {logEvent: jest.fn()};
      };
    });
    global.engine = {
      createFedops: jest.fn(() => ({
        interactionStarted: jest.fn(),
        appLoadStarted: jest.fn()
      })),
      state: {
        system: {
          app: {
            __value: config.app,
            select: (selector) => selector[config.app]()
          }
        },
        user: {
          email: 'user@email.com'
        },
        experiments: {
          isEnabled: jest.fn(() => false)
        },
        businesses: {
          onBusinessListChange: jest.fn()
        },
      },
      moduleRegistry: {
        invoke: jest.fn(),
        registeredComponents: {},
        registeredMethods: {},
        hasMethod: jest.fn()
      },
      bi: {
        logger: jest.fn(() => () => {}),
        log: jest.fn()
      }
    };
    global.window = {};
  }

  function applyModuleMocks(moduleName) {
    const modulePath = config.module_roots_map[moduleName];
    if (!modulePath) {
      return;
    }
    const moduleMocksFile = path.resolve(config.module_roots_map[moduleName], 'engineModuleMocks.js');
    if (fs.existsSync(moduleMocksFile)) {
      console.log(`Found additional mocks file for ${moduleName}`);
      const applyMocks = require(moduleMocksFile).applyMocks;
      if (_.isFunction(applyMocks)) {
        try {
          applyMocks();
        } catch {}
      }
    }
  }

  function hasValues(result) {
    return result && _.isArray(result) && result.length > 0;
  }

  function generateModuleJson(moduleName, appName) {
    const module = new (require(`${moduleName}`).default)();
    const prefix = module.prefix();
    const components = module.components && module.components();
    const methods = module.methods && module.methods();
    const observables = module.observables && module.observables();
    const deeplinks = module.deepLinks && module.deepLinks();
    const consumedServices = module.consumedServices && module.consumedServices();
    const providedServices = module.providedServices && module.providedServices();
    const modes = module.modes && module.modes();
    const biSources = module.biSources ? module.biSources() : undefined;
    const dbSchemes = module.dbSchemes ? {[module.prefix()]: module.dbSchemes()} : {};
    return {
      name: moduleName,
      prefix,
      components: hasValues(components) ? components.map((c) => c.id) : undefined,
      methods: hasValues(methods) ? methods.map((m) => m.id) : undefined,
      observables: observables ? Object.keys(observables) : undefined,
      deepLinks: hasValues(deeplinks) ? deeplinks
        .filter((l) => l.apps ? l.apps.includes(appName) : true)
        .map((l) => ({
          linkPattern: l.linkPattern,
          externalPatterns: l.externalPatterns,
          pushNotificationCategories: l.pushNotificationCategories
        })) : undefined,
      hasTabs: !!(module.getTabs) || !!(module.tabs),
      consumedServices: consumedServices ? Object.keys(consumedServices).map((cs) => {
        return _.isFunction(cs) ? cs() : cs;
      }) : undefined,
      providedServices: providedServices ? Object.keys(providedServices).map((ps) => {
        return _.isFunction(ps) ? ps() : ps;
      }) : undefined,
      hasDemoInit: !!(module.__unsafe__initializeDemoModule),
      hasManagerApps: !!(module.managerApps),
      hasClientApps: !!(module.clientApps),
      hasInstallableApps: !!(module.installableApps) || !!(module.getInstallableApps),
      hasQuickActions: !!(module.quickActions),
      hasActivityScreens: !!(module.activityScreens) || !!(module.getActivityScreens),
      modes: modes ? Object.keys(modes).filter(m => modes[m].apps ? modes[m].apps.includes(appName) : true) : undefined,
      defaultMode: modes ? Object.keys(modes).find((m) => modes[m].isDefault === true) : undefined,
      biSources,
      dbSchemes
    };
  }

  function writeModuleJson(moduleName, targetFolder, artifactsFolder, moduleJson, appName) {
    fs.writeFileSync(`${targetFolder}/module.${appName}.json`, JSON.stringify(moduleJson || {}, null, 2));
    if (isCI && artifactsFolder) {
      fs.writeFileSync(`${artifactsFolder}/module_js/${moduleName.replace('/', '_')}.${appName}.json`, JSON.stringify(moduleJson || {}, null, 2));
    }
  }

});
