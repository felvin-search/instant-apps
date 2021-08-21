import { useEffect } from "react";
import ReactDOM from "react-dom";
import apps from "./processor";

type RendererProps = {
  query: string;
};

const InstantAppRenderer = (props: RendererProps) => {
  useEffect(() => {
    const DictionaryAppComponent = apps[0].Component;
    console.log(`Calling dictionary app with ${props.query}`);
    if (!props.query) {
      return;
    }
    apps[0].queryToData({ query: props.query }).then((data: Array<any>) => {
      if (data) {
        ReactDOM.render(
          <DictionaryAppComponent data={data} />,
          document.getElementById("instant_app_root")
        );
      }
    });
    // call each instant apps one by one
    // Instant apps processor can do magic and render stuff.
    // Render the first matching app
    // Show the name of other apps which are trying to render for the query.
  }, [props.query]);

  return <div id="instant_app_root"></div>;
};

export default InstantAppRenderer;
