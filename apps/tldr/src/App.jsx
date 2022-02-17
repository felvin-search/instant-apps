import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import MarkdownPreview from "@uiw/react-markdown-preview";


//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Output = styled(MarkdownPreview)`
  flex: 1;
  border: 1px solid;
  wrap: word-break;
  white-space: normal;
  overflow: auto;
  margin: 0;
  auto-scroll: on;
  margin: 0.1rem;
  padding: 0.5rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;
//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  return (
    <Container>
      <Output source={data.text} />
    </Container>
  );
}

//=========================================
const tldrURL = 'https://raw.githubusercontent.com/tldr-pages/tldr/master/pages'

const searchTLDR = async (command, platform = 'common') => {
  // Fetch the content from TLDR github repo
  const response = await fetch(`${tldrURL}/${platform}/${command}.md`);
  const data = response.text()
  return data;
}

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  console.log("Inside tldr app")
  const tokens = query.split(' ')
  if(tokens[0] === "tldr"){
    const command = tokens[1];
    const text = await searchTLDR(command)
    return {text}
  }
  return;
}

export { queryToData, Component };
