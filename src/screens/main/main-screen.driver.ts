import {act} from 'react-test-renderer';
import {Action, Store} from 'redux';
import {ReduxComponentDriver} from 'redux-component-driver';
import {RootState} from '../../redux/redux-store';
import {ACTIVITY_ITEM_TEST_IDS} from './components/activity-item';
import {DAY_ITEM_TEST_IDS} from './components/day-item';
import {MainScreen, MAIN_SCREEN_TEST_IDS} from './main-screen';

export class MainScreenDriver extends ReduxComponentDriver<
  typeof MainScreen,
  RootState,
  Action<any>
> {
  constructor(store: Store) {
    super(MainScreen, store);
  }

  getEmptyStateContainer() {
    return this.getByID(MAIN_SCREEN_TEST_IDS.EMPTY_STATE_CONTAINER);
  }

  getListContainer() {
    return this.getByID(MAIN_SCREEN_TEST_IDS.ACTIVITIES_LIST);
  }

  getActivityCard(id: string) {
    return this.getByID(`${ACTIVITY_ITEM_TEST_IDS.CARD}.${id}`);
  }

  getActivityCardNameLabel(id: string) {
    return this.getByID(`${ACTIVITY_ITEM_TEST_IDS.NAME_LABEL}.${id}`);
  }

  getActivityCardMonthLabel(id: string) {
    return this.getByID(`${ACTIVITY_ITEM_TEST_IDS.MONTH_LABEL}.${id}`);
  }

  getActivityCardDayLabel(id: string) {
    return this.getByID(`${DAY_ITEM_TEST_IDS.LABEL}.${id}`);
  }

  getDayItem(id: string) {
    return this.getByID(`${DAY_ITEM_TEST_IDS.VIEW_CONTAINER}.${id}`);
  }

  getDayItemContainerStyle(id: string) {
    return this.getDayItem(id)?.props.style;
  }

  getDayPressable(id: string) {
    return this.getByID(`${DAY_ITEM_TEST_IDS.PRESSABELE}.${id}`);
  }

  getDeleteButton(id: string) {
    return this.getByID(`${ACTIVITY_ITEM_TEST_IDS.DELETE_BUTTON}.${id}`);
  }

  pressOnDeleteButton(id: string) {
    this.getDeleteButton(id)?.props.onPress();
  }

  pressOnDayItem(id: string) {
    this.getDayPressable(id)?.props.onClick();
  }
}
