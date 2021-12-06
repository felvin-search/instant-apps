import apps from "@felvin-search/apps";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const Screenshot = styled.img`
  object-fit: contain;

  width: 50%;
  aspect-ratio: 1/1;
  margin: 1rem;
`;

const Info = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const CarouselContainer = styled.div`
  width: 100%;

  @media (min-width: 900px) {
    width: 600px;
  }
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  function getAppById(id) {
    const app = data.filter((app) => app.id === id);
    return app[0];
  }

  function copyJSON() {
    navigator.clipboard.writeText(JSON.stringify(data));
  }

  const [currentApp, setCurrentApp] = useState(data[0]);
  const inputRef = useRef();
  return (
    <Container>
      {/* <button onClick={copyJSON}>Copy all JSON data to clipboard</button> */}
      {/* this button is not for prod */}
      <Info>Felvin currently has {data.length} instant apps!</Info>
      {/* TODO: make the arrows visible without the need of hover on desktop */}
      <CarouselContainer as={Carousel} showIndicators={false}>
        {data.map((currentApp) => (
          <div key={currentApp.id}>
            <h3>{currentApp.name}</h3>
            <p>{currentApp.description}</p>
            <p>
              <a
                href={
                  "https://felvin.com/search?q=" +
                  currentApp.exampleSearchQueries[0]
                }
                rel="noreferrer noopener"
                target="_blank"
              >
                {currentApp.exampleSearchQueries[0]}
              </a>
            </p>
            <Screenshot
              alt="screenshot showing the instant app"
              src={currentApp.screenshotPath}
            ></Screenshot>
          </div>
        ))}
      </CarouselContainer>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["instant apps"], { substringMatch: true })) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = apps.map(
    ({ id, name, description, screenshotPath, exampleSearchQueries }) => {
      const details = { id, name, description, exampleSearchQueries };
      details.screenshotPath =
        "https://raw.githubusercontent.com/felvin-search/instant-apps/master/apps/" +
        id.split("/")[1] +
        "/src" +
        screenshotPath.substring(1);
      return details;
    }
  );

  return data;
};

export { queryToData, Component };
