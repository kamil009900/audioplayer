import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TrackPlayerProvider} from '@providers/track-player-context';
import {BottomPlayer} from '@components/bottom-player/bottom-player';
import {Playlist} from '@components/playlist/playlist';
import {PLAYLIST} from '@constants/tracks-list';
import React from 'react';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: backgroundStyle.backgroundColor,
        ...styles.container,
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TrackPlayerProvider>
        <Playlist playlist={PLAYLIST} />
        <BottomPlayer />
      </TrackPlayerProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
