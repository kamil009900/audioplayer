import {AddTrack} from 'react-native-track-player';

const track1: AddTrack = {
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  title: 'Sample one',
  artist: 'Artist one',
  date: '2014-05-20T07:00:00+00:00',
  duration: 372,
};

const track2: AddTrack = {
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  title: 'Sample two',
  artist: 'Artist two',
  date: '2014-05-20T07:00:00+00:00',
  duration: 425,
};

const track3: AddTrack = {
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  title: 'Sample three',
  artist: 'Artist three',
  date: '2014-05-20T07:00:00+00:00',
  duration: 344,
};

const track4: AddTrack = {
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  title: 'Sample four',
  artist: 'Artist four',
  date: '2014-05-20T07:00:00+00:00',
  duration: 302,
};

const track5: AddTrack = {
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  title: 'Sample five',
  artist: 'Artist five',
  date: '2014-05-20T07:00:00+00:00',
  duration: 353,
};

export const PLAYLIST = [track1, track2, track3, track4, track5];
