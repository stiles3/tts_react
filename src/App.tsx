import { useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { play, pause, playbackState, currentSentenceIdx, currentWordRange } =
    useSpeech(sentences);

  const loadNewQuestion = async () => {
    let newContent = await fetchContent();
    setSentences(parseContentIntoSentences(newContent));
  };
  useEffect(() => {
    loadNewQuestion();
  }, []);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentSentenceIdx={currentSentenceIdx}
          currentWordRange={currentWordRange}
        />
      </div>
      <div>
        <Controls
          pause={pause}
          play={play}
          loadNewContent={loadNewQuestion}
          state={playbackState}
        />
      </div>
    </div>
  );
}

export default App;
