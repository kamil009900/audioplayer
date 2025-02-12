import {AddTrack} from 'react-native-track-player';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, Text} from '@react-native-material/core';
import {mapDuration} from '@utils/map-duration';
import React from 'react';

type SongItemProps = {
  track: AddTrack;
  onPress: (track: AddTrack) => void;
  isActive: boolean;
};

export const SongItem = ({track, onPress, isActive}: SongItemProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(track)}>
      <View
        style={{
          backgroundColor: isActive ? '#cccccc' : '#FFFFFF',
          ...styles.textWrapper,
        }}>
        <Text>{track.title}</Text>
        <Text>{mapDuration({seconds: track.duration})}</Text>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    height: 50,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
