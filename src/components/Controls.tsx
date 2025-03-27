import { PlayingState } from "../lib/speech";

/*
 * Implement a component that provides basic UI options such as playing, pausing and loading new content
 * This component should have the following,
 * - A button with text "Play" if the player is not playing
 * - A button with text "Pause" if the player is playing
 * - A button with text "Load new content" that loads new content from the API
 */
export const Controls = ({
  play,
  pause,
  loadNewContent,
  state,
}: {
  play: () => void;
  pause: () => void;
  loadNewContent: () => void;
  state: PlayingState;
}) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          state === "playing" ? pause() : play();
        }}
      >
        {state === "playing" ? "Pause" : "Play"}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          loadNewContent();
        }}
      >
        Load more
      </button>
    </div>
  );
};
