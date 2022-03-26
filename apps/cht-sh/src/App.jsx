import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  background: black;
  color: #bbbbbb;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  .pre {
    font-family: Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace;
    font-size: 70%
  }
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  console.log(data)
  const markup = {"__html": data["html"]}
  return (
    <Container dangerouslySetInnerHTML={markup}>

    </Container>
  );
}

const getSnippet = async (query) => {
  const response = await fetch(`https://cheat-sh.felvin.com/${query}`);
  if(response.ok){
    const data = await response.text()
    return data;
  } else {
    return;
  }

}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  const html = await getSnippet(query)
  if(!html.includes("Unknown topic") && !html.includes("404 NOT FOUND")){
    return {html};
  } else {
    return;
  }
}

export { queryToData, Component };
