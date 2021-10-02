import Tetris from "killing-time-react-tetris";
import styled, { keyframes } from "styled-components";
import { matchTriggerQueries } from "../lib/utilityApis";

//------------Styled Components-------------

const sbinnala = keyframes`
	from {
		transform: rotate(10deg);
	}
	to {
		transform: rotate(80deg);
	}
`;

const rangDe = keyframes`
	0% { fill: rgba(251, 87, 58, 1); }
  50% { fill: rgba(251, 87, 58, 1); }
  51% { fill: rgba(50, 153, 79, 1); }
  100% { fill: rgba(50, 153, 79, 1); }
`;

const Logo = styled.svg`
  animation: ${sbinnala} 1s linear infinite alternate;
  path {
    animation: ${rangDe} 2s linear infinite;
  }
`;

//=========================================

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
