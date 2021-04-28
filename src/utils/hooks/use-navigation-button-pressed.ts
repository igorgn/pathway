import {useEffect, useRef} from 'react';
import {EmitterSubscription} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useNavigation} from 'react-native-navigation-hooks/dist';
import {Screens} from '../../types/enums/screens';

export const useNavigationButtonPressed = (buttonId: string) => {
  const {push} = useNavigation();
  const navigationEventListener = useRef<null | EmitterSubscription>(null);

  useEffect(() => {
    if (!navigationEventListener.current) {
      navigationEventListener.current = Navigation.events().registerNavigationButtonPressedListener(
        event => {
          if (event.buttonId === buttonId) {
            push(Screens.AddActivity);
          }
        },
      );
    }

    return () => {
      navigationEventListener.current?.remove();
    };
  }, [buttonId, push]);
};
