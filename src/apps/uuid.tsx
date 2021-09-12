import { v4 as uuidv4 } from "uuid";

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
const shouldRunMyApp = async ({ query }) => {
  const triggerQueries = ["uuid", "uuidv4", "unique id"];

  for (const triggerQuery of triggerQueries) {
    if (query.toLowerCase().trim() === triggerQuery) {
      return { uuid: uuidv4() };
    }
  }

  return;
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
