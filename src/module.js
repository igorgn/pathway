export default class OneAppHabitsModule {
  components() {
    return [
      {
        id: 'one-app-module-habits.MainScreen',
        generator: () => require('./screens/main/main-screen').MainScreen,
      },
      {
        id: 'one-app-module-habits.AddActivityScreen',
        generator: () =>
          require('./screens/add-activity/add-activity-screen')
            .AddActivityScreen,
      },
    ];
  }

  prefix() {
    return 'one-app-module-habits';
  }
  consumedServices() {
    return {
      quickActions: () => {
        const {Assets} = require('wix-react-native-ui-lib');

        return [
          {
            id: 'main-screen-quick_action',
            label: 'Main screen',
            icon: Assets.icons.general.arrowRight,
            screenId: 'one-app-module-habits.MainScreen',
            testID: 'main-screen-quick_action',
          },
        ];
      },
    };
  }
}
