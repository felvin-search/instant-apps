import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered, Breakpoints } from "@felvin-search/core";
import MarkdownPreview from "@uiw/react-markdown-preview";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  width: 70vw;
  height: 20rem;
  @media (min-width: ${Breakpoints.large || "992px"}) {
    flex-direction: row;
  }
`;
const Input = styled.textarea`
  flex: 1;
  resize: none;
  overflow-y: auto;
  word-break: break-word;
  font-size: 1rem;
  margin: 0.1rem;
  padding: 0.5rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
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
  const [text, setText] = useState("**Hello World**");

  return (
    <Container>
      <Input
        value={text}
        name="Input Text"
        onChange={(e) => setText(e.target.value)}
      ></Input>

      <Output source={text} />
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (
    !isTriggered(query, ["markdown", "live markdown preview"], {
      substringMatch: true,
    })
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
