import Pong from "react-pong";
import { matchTriggerQueries } from "../lib/utilityApis";

function Component({ data }) {
  return <Pong />;
}

const PongGame = {
  name: "pong",
  description: "Play Pong",
  // queryToData takes in the query and returns data which
  // the Component displays on the website.
  // If queryToData returns no data, we do not display the app.
  queryToData: matchTriggerQueries(["pong", "play pong"]),
  tags: "games",
  Component: Component,
};

export default PongGame;
