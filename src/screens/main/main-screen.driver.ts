import {Action, Store} from 'redux';
import {ReduxComponentDriver} from 'redux-component-driver';
import {RootState} from '../../redux/redux-store';
import {
  AddActivityScreenComponent,
  ADD_ACTIVITY_SCREEN_TEST_IDS,
} from './add-activity-screen';

export class AddActivityScreenDriver extends ReduxComponentDriver<
  typeof AddActivityScreenComponent,
  RootState,
  Action<any>
> {
  constructor(store: Store) {
    super(AddActivityScreenComponent, store);
  }

  getTextInput() {
    return this.getByID(ADD_ACTIVITY_SCREEN_TEST_IDS.TEXT_FIELD);
  }

  getButton() {
    return this.getByID(ADD_ACTIVITY_SCREEN_TEST_IDS.CTA);
  }

  getTextInputError() {
    return this.getTextInput()?.props.error;
  }

  getTextInputValue() {
    return this.getTextInput()?.props.value;
  }

  setInputText(text: string) {
    this.getTextInput()?.props.onChangeText(text);
  }

  initiateActivityCreation() {
    this.getButton()?.props.onPress();
  }
}
