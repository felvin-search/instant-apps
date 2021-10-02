import Tetris from "killing-time-react-tetris";
import { matchTriggerQueries } from "../lib/utilityApis";

function Renderer() {
  return (
    <div>
      <h1>Tetris</h1>
      <Tetris>
        {({ HeldPiece, Gameboard, PieceQueue, points, linesCleared }) => {
          // Render it however you'd like
          return (
            <div>
              <HeldPiece />
              <div>
                <p>Points: {points}</p>
                <p>Lines Cleared: {linesCleared}</p>
              </div>
              <Gameboard />
              <PieceQueue />
            </div>
          );
        }}
      </Tetris>
    </div>
  );
}

const shouldRunMyApp = async ({ query }) => {
  const triggerQueries = ["my app"];

  for (const triggerQuery of triggerQueries) {
    if (query.toLowerCase() === triggerQuery) {
      return { query };
    }
  }

  return;
};

const MyApp = {
  name: "MyApp",
  description: "I am a template app, please change this description",
  // queryToData takes in the query and returns data which
  // the Component displays on the website.
  // If queryToData returns no data, we do not display the app.
  queryToData: matchTriggerQueries([
    "tetris",
    "play tetris",
    "play tetris game",
  ]),
  Component: Renderer,
};

export default MyApp;
