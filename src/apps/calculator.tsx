import { evaluate as mathjsEvaluate } from "mathjs";
import { InstantAppProps } from "./types";

function Renderer(props: InstantAppProps) {
  return <h1>{props.data?.result}</h1>;
}

const shouldRunMyApp = async ({ query }) => {
  const mathOperators = ["+", "-", "*", "/", "%", "^"];

  let foundMathExpression = false;
  for (const operator of mathOperators) {
    if (query.includes(operator)) foundMathExpression = true;
  }
  if (!foundMathExpression) return;

  try {
    const result = JSON.stringify(mathjsEvaluate(query));
    return { result };
  } catch (err) {
    return;
  }
};

const MyApp = {
  name: "math",
  description: "App which can do math stuff",
  // queryToData takes in the query and returns data which
  // the Component displays on the website.
  // If queryToData returns no data, we do not display the app.
  queryToData: shouldRunMyApp,
  Component: Renderer,
};

export default MyApp;
