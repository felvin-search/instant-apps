import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const { height, width } = window.screen;
  return (
    <Container>
      <p>Your screen resolution is : <strong>{width}x{height} px</strong></p>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (
    !isTriggered(query, [
      "What is my screen resolution?",
      "What is my screen resolution",
      "what is the resolution of my screen?",
      "what is the resolution of my screen",
      "my screen resolution",
      "screen resolution",
      "what is my display resolution",
      "what is my display resolution?",
      "what is the size of screen",
      "what is the size of screen?",
      "size of my screen",
      "screen size",
    ])
  ) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
