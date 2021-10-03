import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const InstantAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 95%;
  justify-content: center;
  align-items: center;
`;

type RendererProps = {
  query: string;
};

const InstantAppRenderer = (props: RendererProps) => {
  const [instantAppMarkup, setInstantAppMarkup] = useState("");
  const [instantAppCss, setInstantAppCss] = useState("");

  const renderApps = async (query: string) => {
    const response = await fetch(
      `/instant-apps?q=${encodeURIComponent(query)}`
    );
    const { html, scriptUrl } = await response.json();
    if (scriptUrl) {
      console.log("Setting script for the app from source", scriptUrl);
      var script = document.createElement("script");
      script.src = scriptUrl;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
    if (html) {
      setInstantAppMarkup(html);
    } else {
      setInstantAppMarkup("");
    }

    return;
  };

  useEffect(() => {
    if (!props.query) {
      return;
    }

    renderApps(props.query);
  }, [props.query]);

  return (
    <InstantAppContainer key={props.query}>
      <div dangerouslySetInnerHTML={{ __html: instantAppMarkup }}></div>
    </InstantAppContainer>
  );
};

export default InstantAppRenderer;
