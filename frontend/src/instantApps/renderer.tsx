import { useEffect } from "react";
import loadApps from "./processor";

type RendererProps = {
  query: string;
};

const SnippetAppRenderer = (props: RendererProps) => {
  useEffect(() => {
    loadApps();

    // call each instant apps one by one
    // Instant apps processor can do magic and render stuff.
    // Render the first matching app
    // Show the name of other apps which are trying to render for the query.
  }, []);

  return <div>Hello World</div>;
};

export default SnippetAppRenderer;
