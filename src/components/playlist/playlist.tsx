import React, {useCallback, useEffect} from 'react';
import {FlatList} from 'react-native';
import {AddTrack} from 'react-native-track-player';
import {useTrackPlayerContext} from '@providers/track-player-context';
import {SongItem} from './song-item/song-item';

type Props = {
  playlist: AddTrack[];
};

export const Playlist = ({playlist}: Props) => {
  const {setCurrentPlaylist, play, playlistAdded, currentTrack} =
    useTrackPlayerContext();

  useEffect(() => {
    setCurrentPlaylist(playlist);
  }, [setCurrentPlaylist, playlist]);

  const onSongPress = useCallback(
    (track: AddTrack) => {
      play(track);
    },
    [play],
  );

  const renderItem = useCallback(
    ({item}: {item: AddTrack}) => (
      <SongItem
        track={item}
        onPress={onSongPress}
        isActive={item.url === currentTrack?.url}
      />
    ),
    [onSongPress, currentTrack],
  );

  if (!playlistAdded) {
    return null;
  }

  return (
    <FlatList
      data={playlist}
      renderItem={renderItem}
      keyExtractor={track => track.url}
    />
  );
};
