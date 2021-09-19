import Snake from "snake-game-react";
import { matchTriggerQueries } from "../lib/utilityApis";

function Component({ data }) {
  return <Snake color1="#248ec2" color2="#1d355e" backgroundColor="#ebebeb" />;
}

const SnakeGame = {
  name: "snake-game",
  description: "Play snake game",
  queryToData: matchTriggerQueries([
    "snake game",
    "play snake",
    "play snake game",
  ]),
  tags: "games",
  Component: Component,
};

export default SnakeGame;
