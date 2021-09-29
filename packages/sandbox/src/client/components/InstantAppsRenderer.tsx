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
    const response = await fetch(`/instant-apps?q=${query}`);
    const { html, scriptSrc } = await response.json();
    if (scriptSrc) {
      var script = document.createElement("script");
      script.src = scriptSrc;
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
