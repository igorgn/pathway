import {useEffect, useRef} from 'react';
import {EmitterSubscription} from 'react-native';
import {Navigation} from 'react-native-navigation';

export const useNavigationButtonPressed = (
  onPress: (buttonId: string) => void,
) => {
  const navigationEventListener = useRef<null | EmitterSubscription>(null);

  useEffect(() => {
    if (!navigationEventListener.current) {
      navigationEventListener.current =
        Navigation.events().registerNavigationButtonPressedListener(event => {
          console.log(event);
          onPress(event.buttonId);
        });
    }

    return () => {
      navigationEventListener.current?.remove();
    };
  }, [onPress]);
};
