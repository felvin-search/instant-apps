import apps from "@felvin-search/apps";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
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
    // Will try to render an app if it returns a "truthy" value
    // App should return falsy values of throw an error if it doesn't want to serve a query.
    let data;
    try {
      data = await app.queryToData({ query });
    } catch (err) {
      // This doesn't have to be an actual error.
      console.warn(`error received from app "${app.name}" on query "${query}"`);
      console.warn(err);
      return false;
    }
    // TODO: This will always render the first app
    if (!!data) {
      ReactDOM.render(
        <app.Component data={data} />,
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
    if (!props.query) {
      return;
    }

    renderApps(props.query);
  }, [props.query]);

  return (
    <InstantAppContainer key={props.query}>
      <div id="instant_apps_root"></div>
    </InstantAppContainer>
  );
};

export default InstantAppRenderer;
