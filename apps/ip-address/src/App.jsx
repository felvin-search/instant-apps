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
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  return (
    <Container>
      Your IP Address is: <strong> {data.ip}</strong> 
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, [ "What is my ip","What is my ip?","my ip address","ip address" ],{substringMatch:true})) {
    return;
  }

  const response = await fetch("https://api64.ipify.org?format=json", {
    headers: {
      Accept: "application/json",
      "User-Agent": "Felvin Search (felvin.com)",
    },
  });
  if (!response.ok) {
    return;
  }

  const responseJson = await response.json();
  return responseJson
}

export { queryToData, Component };
