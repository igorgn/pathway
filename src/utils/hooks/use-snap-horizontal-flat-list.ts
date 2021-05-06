import {useCallback, useMemo, useRef, useState} from 'react';
import {Animated, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

export const useSnapHorizontalFlatList = (itemWidth: number) => {
  const [activeListIndex, setActiveListIndex] = useState(0);
  const flatListRef = useRef<Animated.FlatList<any>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = useCallback(
    ({
      nativeEvent: {contentOffset},
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.floor((contentOffset.x + 16) / itemWidth);
      if (index !== activeListIndex) {
        setActiveListIndex(index);
      }
    },
    [activeListIndex, itemWidth],
  );

  const onScroll = useMemo(
    () =>
      Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: true,
        listener: handleScroll,
      }),
    [handleScroll, scrollX],
  );

  const keyExtractor = useCallback(
    (item: any, index: number) => index.toString(),
    [],
  );

  const getItemLayout = useCallback(
    (data, index) => ({
      length: itemWidth,
      offset: itemWidth * index,
      index,
    }),
    [itemWidth],
  );

  return useMemo(
    () => ({
      flatListProps: {
        ref: flatListRef,
        onScroll,
        keyExtractor,
        getItemLayout,
      },
      activeListIndex,
    }),
    [activeListIndex, getItemLayout, keyExtractor, onScroll],
  );
};
