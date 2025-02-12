import {Text} from '@react-native-material/core';
import {mapDuration} from '@utils/map-duration';
import {useMemo} from 'react';
import React from 'react';

type Props = {
  remaining: boolean;
  position: number;
  duration?: number;
};
export const Duration = ({remaining, position, duration}: Props) => {
  const time = useMemo(() => {
    if (duration) {
      return mapDuration({
        seconds: remaining ? duration - position : position,
        sign: remaining ? '-' : '',
      });
    }

    return 0;
  }, [duration, remaining, position]);

  return <Text>{time}</Text>;
};
