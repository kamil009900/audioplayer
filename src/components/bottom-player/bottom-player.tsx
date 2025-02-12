import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@react-native-material/core';
import React, {useCallback, useRef, useState} from 'react';
import {SkipBack, SkipForward, Play, Pause} from 'lucide-react-native';
import {State, useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {useTrackPlayerContext} from '@providers/track-player-context';
import {Duration} from './duration/duration';
import throttle from 'lodash.throttle';

const windowWidth = Dimensions.get('window').width;

export const BottomPlayer = () => {
  const {
    pause,
    play,
    playerState,
    currentTrack,
    previous,
    next,
    seekTo,
    playlistAdded,
  } = useTrackPlayerContext();
  const {position, duration} = useProgress(200);
  const [localPosition, setLocalPosition] = useState(0);
  const timeoutRef = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setLocalPositionThrottled = useCallback(
    throttle(setLocalPosition, 50),
    [],
  );

  const onSlidingComplete = useCallback(
    (updatedPosition: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      seekTo(updatedPosition).then(
        () =>
          // in order to avoid small flicker on slider ->
          // wait for progress on slider to update after user releases finger (progress updates every 200ms so 400ms is for safety)
          // @ts-ignore, no typings for timeout available
          (timeoutRef.current = setTimeout(() => setLocalPosition(0), 400)),
      );
    },
    [seekTo],
  );

  if (!currentTrack || !playlistAdded) {
    return null;
  }

  const positionValue = localPosition || position;

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text variant="h3">{currentTrack.title}</Text>
        <Text variant="h5">{currentTrack.artist}</Text>
      </View>

      <View style={styles.sliderWrapper}>
        <View style={styles.durationWrapper}>
          <Duration
            remaining={false}
            position={positionValue}
            duration={currentTrack.duration}
          />
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          step={1}
          maximumValue={duration}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#808080"
          onSlidingComplete={onSlidingComplete}
          value={positionValue}
          onValueChange={setLocalPositionThrottled}
        />
        <View style={styles.durationWrapper}>
          <Duration
            remaining
            position={positionValue}
            duration={currentTrack.duration}
          />
        </View>
      </View>

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity onPress={previous} style={styles.button}>
          <SkipBack size={16} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            playerState === State.Playing ? pause : () => play(currentTrack)
          }
          style={styles.button}>
          {playerState === State.Playing ? (
            <Pause size={16} />
          ) : (
            <Play size={16} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={next} style={styles.button}>
          <SkipForward size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', paddingTop: 20},
  titleWrapper: {justifyContent: 'center', alignItems: 'center'},
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  durationWrapper: {
    width: 0.15 * windowWidth,
    alignItems: 'center',
  },
  slider: {
    width: 0.6 * windowWidth,
    height: 40,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    justifyContent: 'space-around',
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#808080',
  },
});
