
# General info
1. I didnt use any state management because it would be a slight overkill for an app that small. Just for simplicity i used react context.
2. I added some ui-library for few components so its not all ugly, i didnt spend much time on UI, but UX in general should be friendly.
3. I also skipped any artist images or any improvement to UI in general, i focused only on functionality.
4. Whole project uses typescript, there are some small things for better development like import aliases, eslint etc.


This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Install packages & Start Metro

```sh
npm install
```

Then, you will need to run **Metro**

```sh
npm start
```

## Step 2: Build your app

### Android

`
open project via android studio and build it, then run on emulator
`

### iOS

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```
Then

`
run app via xcode
`


# Challenges encountered:

1. React-native-track-player has issues with new react-native architecture, so i had to disable it (there is ongoing issue on github about that)
2. Achieving proper performance while dragging the timeline player required some unusual approach and was a bit tricky to implement
3. I had to figure out by myself a lot of things regarding react-native-track-player so it took me a while to understand the package and use it properly, especially on android sometimes it didnt work for no reason, but should be fine now.


# Testing the app

There are 5 hardcoded songs, on app open it should activate the first one and load whole playlist to queue. 
User is able to:
1. play/pause the song
2. skip forward / skip to previous
3. drag the timeline to change the song's current time
4. clearly see song duration that is left to play and duration that was already played during "dragging"

All of the above is also supported while application is in background