import { useEffect } from "react";
import ReactDOM from "react-dom";
import apps from "../apps";
import styled from "styled-components";

const InstantAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 95%;
  justify-content: center;
  align-items: center;
`;

function renderApps(query: string) {
  apps.every(async (app) => {
    // Question: Not all apps need to return data.
    // TODO: Clearly define what is success and what is failure criteria for these apps somewhere.
    const data = await app.queryToData({ query });
    console.log("data from dictionary app", data);
    // TODO: This will always render the first app
    if (!!data) {
      ReactDOM.render(
        <app.Component data={data} query={query} />,
        document.getElementById("instant_apps_root")
      );
      return false;
    }
    return true;
  });
}

type RendererProps = {
  query: string;
};

const InstantAppRenderer = (props: RendererProps) => {
  useEffect(() => {
    console.log("inside useEffect of rendered");
    console.log("props.query", props.query);

    if (!props.query) {
      return;
    }

    renderApps(props.query);
  }, [props.query]);

  return (
    <InstantAppContainer>
      <div id="instant_apps_root"></div>
    </InstantAppContainer>
  );
};

export default InstantAppRenderer;
