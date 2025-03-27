import { useState } from "react";

import { createSpeechEngine, PlayingState } from "./speech";
import { fetchContent } from "./content";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([
    0, 0,
  ]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const options = {};
  const {
    state,
    cancel,
    load,
    pause: speechPause,
    play: speechPlay,
  } = createSpeechEngine({
    onBoundary: (e) => {
      const charIndex = e.charIndex;
      const wordLength = e.charLength;
      const wordStart = charIndex;
      const wordEnd = charIndex + wordLength;

      setCurrentWordRange([wordStart, wordEnd]);
    },
    onEnd: (e) => {
      setPlaybackState("ended");
      setCurrentSentenceIdx(0);
    },
    onStateUpdate(state) {
      setPlaybackState(state);
    },
  });

  const play = async () => {
    // initiatlize state
    setPlaybackState("initialized");

    for (let x = currentSentenceIdx; x < sentences.length; x++) {
      // get current text
      const text = sentences[x];
      setPlaybackState("playing");
      setCurrentSentenceIdx(x);
      // load text to speech
      load(text);

      if (state.utterance !== null) {
        await new Promise((resolve) => {
          //play text to speech
          state.utterance.onend = resolve;
          speechPlay();
        });
      }
    }
    // end play and reset index
    setPlaybackState("ended");
    setCurrentSentenceIdx(0);
  };

  const pause = () => {
    //pause index
    speechPause();
    setPlaybackState("paused");
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
