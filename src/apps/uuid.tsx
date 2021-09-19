import { v4 as uuidv4 } from "uuid";
import { isTriggered } from "../lib/utilityApis";

type Props = {
  data: {
    uuid: string;
  };
};

function Renderer(props: Props) {
  return (
    <h1>
      <pre>{props.data.uuid}</pre>
    </h1>
  );
}

// @DoNotCacheMe
const shouldRunMyApp = async ({ query }: { query: string }) => {
  const triggerQueries = ["uuid", "uuidv4"];
  if (!isTriggered(query, triggerQueries, { substringMatch: true })) return;
  return { uuid: uuidv4() };
};

const MyApp = {
  name: "uuid",
  description: "I generate uuid strings",
  // queryToData takes in the query and returns data which
  // the Component displays on the website.
  // If queryToData returns no data, we do not display the app.
  queryToData: shouldRunMyApp,
  Component: Renderer,
};

export default MyApp;
