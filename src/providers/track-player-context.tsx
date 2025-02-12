import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
  Capability,
  AddTrack,
  AppKilledPlaybackBehavior,
  useActiveTrack,
} from 'react-native-track-player';

type ContextType = {
  currentTrack?: AddTrack;
  currentPlaylist?: AddTrack[];
  play: (track: AddTrack) => Promise<void>;
  pause: () => Promise<void>;
  next: () => Promise<void>;
  previous: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  setCurrentPlaylist: React.Dispatch<React.SetStateAction<AddTrack[]>>;
  playerState: State | null;
  playlistAdded: boolean;
};

const TrackPlayerContext = createContext<ContextType | null>(null);

export const useTrackPlayerContext = () => {
  const context = useContext(TrackPlayerContext);
  if (!context) {
    throw new Error('Player context only usable withing track player provider');
  }

  return context;
};

const events = [Event.PlaybackState, Event.PlaybackError];
const capabilities = [
  Capability.Play,
  Capability.Stop,
  Capability.Pause,
  Capability.SkipToNext,
  Capability.SkipToPrevious,
  Capability.SeekTo,
];

export const TrackPlayerProvider = ({children}: PropsWithChildren) => {
  const [currentPlaylist, setCurrentPlaylist] = useState<AddTrack[]>([]);
  const [playerState, setPlayerState] = useState<State | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [playlistAdded, setPlaylistAdded] = useState(false);

  const currentTrack = useActiveTrack();

  useEffect(() => {
    const initialize = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        },
        capabilities,
        notificationCapabilities: capabilities,
        compactCapabilities: capabilities,
      });
      setInitialized(true);
    };

    initialize();
  }, []);

  useEffect(() => {
    const setPlaylist = async () => {
      if (currentPlaylist && initialized) {
        setPlaylistAdded(false);
        await TrackPlayer.add(currentPlaylist);
        await TrackPlayer.load(currentPlaylist[0]);
        setPlaylistAdded(true);
      }
    };
    setPlaylist();
  }, [currentPlaylist, initialized]);

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
  });

  const play = useCallback(
    async (track: AddTrack) => {
      if (currentTrack && currentTrack.url !== track.url) {
        const index = currentPlaylist.findIndex(
          trackPlaylist => trackPlaylist.url === track.url,
        );
        await TrackPlayer.skip(index);
      }
      await TrackPlayer.play();
    },
    [currentTrack, currentPlaylist],
  );

  const pause = useCallback(async () => {
    return TrackPlayer.pause();
  }, []);

  const next = useCallback(async () => {
    return TrackPlayer.skipToNext();
  }, []);

  const previous = useCallback(async () => {
    return TrackPlayer.skipToPrevious();
  }, []);

  const seekTo = useCallback(async (position: number) => {
    return TrackPlayer.seekTo(position);
  }, []);

  const value = useMemo(
    () => ({
      currentTrack,
      currentPlaylist,
      setCurrentPlaylist,
      play,
      playerState,
      pause,
      next,
      previous,
      seekTo,
      playlistAdded,
    }),
    [
      currentTrack,
      currentPlaylist,
      setCurrentPlaylist,
      play,
      playerState,
      pause,
      next,
      previous,
      seekTo,
      playlistAdded,
    ],
  );

  if (!initialized) {
    return null;
  }

  return (
    <TrackPlayerContext.Provider value={value}>
      {children}
    </TrackPlayerContext.Provider>
  );
};
