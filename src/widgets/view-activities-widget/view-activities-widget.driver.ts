import {Action, Store} from 'redux';
import {ReduxComponentDriver} from 'redux-component-driver';
import {RootState} from '../../redux/redux-store';
import {
  ViewActivitiesWidget,
  VIEW_ACTIVITIES_WIDGET_TES_IDS,
} from './view-activities-widget';

export class ViewActivitiesWidgetDriver extends ReduxComponentDriver<
  typeof ViewActivitiesWidget,
  RootState,
  Action<any>
> {
  constructor(store: Store) {
    super(ViewActivitiesWidget, store);
  }

  getProgressContainer() {
    return this.getByID(VIEW_ACTIVITIES_WIDGET_TES_IDS.PROGRESS_CONTAINER);
  }

  getActionLabel() {
    return this.getByID(VIEW_ACTIVITIES_WIDGET_TES_IDS.ACTION_LABEL);
  }

  getActionLabelValue() {
    return this.getActionLabel()?.children[0];
  }

  pressOnActionLabel() {
    this.getActionLabel()?.props.onPress();
  }

  getActivityLabel(id: string) {
    return this.getByID(
      `${VIEW_ACTIVITIES_WIDGET_TES_IDS.ACTIVITY_LABEL}${id}`,
    );
  }

  getActivityLabelValue(id: string) {
    return this.getActivityLabel(id)?.children[0];
  }

  getActivityCount(id: string) {
    return this.getByID(
      `${VIEW_ACTIVITIES_WIDGET_TES_IDS.ACTIVITY_COUNT}${id}`,
    );
  }

  getActivityCountValue(id: string) {
    return this.getActivityCount(id)?.children[0];
  }
}
