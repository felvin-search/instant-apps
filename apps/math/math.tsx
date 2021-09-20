import { evaluate as mathjsEvaluate } from "mathjs";
import { isTriggered } from "../lib/utilityApis";
import { InstantApp, InstantAppProps } from "./types";

function Renderer(props: InstantAppProps) {
  return <h1>{props.data?.result}</h1>;
}

const shouldRunMyApp = async ({ query }) => {
  if (
    !isTriggered(query, ["+", "-", "*", "/", "%", "^"], {
      substringMatch: true,
    })
  )
    return;

  try {
    const result = JSON.stringify(mathjsEvaluate(query));
    return { result };
  } catch (err) {
    return;
  }
};

const MyApp: InstantApp = {
  // queryToData takes in the query and returns data which
  // the Component displays on the website.
  // If queryToData returns no data, we do not display the app.
  queryToData: shouldRunMyApp,
  Component: Renderer,
};

export default MyApp;
