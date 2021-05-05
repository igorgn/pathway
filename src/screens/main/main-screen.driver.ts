import {Action, Store} from 'redux';
import {ReduxComponentDriver} from 'redux-component-driver';
import {RootState} from '../../redux/redux-store';
import {MainScreen} from './main-screen';

export class MainScreenDriver extends ReduxComponentDriver<
  typeof MainScreen,
  RootState,
  Action<any>
> {
  constructor(store: Store) {
    super(MainScreen, store);
  }
}
