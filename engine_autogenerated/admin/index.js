const engineConfig = require('./config');
const moduleGenerators = require('./modules').default;
const components = require('./components');
const methods = require('./methods');
const observables = require('./observables');
const deepLinks = require('./deepLinks');
const consumedServices = require('./consumedServices');
const eagerModules = require('./eagerModules');
const deprecatedAPIs = require('./deprecatedAPIs');
const modes = require('./modes');
const biSources = require('./biSources');
const tabModules = require('./tabModules');
const dbSchemes = require('./dbSchemes');
const moduleAPIJSON = {components, methods, observables, deepLinks, eagerModules, consumedServices, deprecatedAPIs, modes, biSources, tabModules, dbSchemes};

require('../../node_modules/wix-one-app-engine/index').run({
  app: 'admin',
  engineConfig,
  moduleGenerators,
  moduleAPIJSON,
  appsJsonInjectedConfig: {
  appsInfo: {
    admin: {
      openURLScheme: "wixadmin"
    },
    places: {
      openURLScheme: "wix"
    },
    fitness: {
      openURLScheme: "wixfitness"
    },
    restaurants: {
      openURLScheme: "wixrestaurants"
    },
    branded: {
      openURLScheme: "branded.abee4b7f1b3e403e82dde59d0552257a"
    }
  },
  branchHosts: {
    admin: {
      test: "vgal2.test-app.link",
      live: "vgal2.app.link"
    },
    places: {
      test: "j4z6.test-app.link",
      live: "j4z6.app.link"
    },
    fitness: {
      test: "s2jch.test-app.link",
      live: "s2jch.app.link"
    },
    restaurants: {
      test: "1ov5b.test-app.link",
      live: "1ov5b.app.link"
    },
    branded: {
      test: "j4z6.test-app.link",
      live: "j4z6.app.link"
    }
  }
}
});
