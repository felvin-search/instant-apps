import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import MarkdownPreview from "@uiw/react-markdown-preview";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  justify-content: center;
  align-items: center;
`;
const Area = styled.div`
  display: flex;
  width: 70vw;
  height: 20rem;
  @media (max-width: 564px) {
    flex-direction: column;
  }
`;
const Input = styled.textarea`
  flex: 1;
  resize: none;
  overflow-y: auto;
  word-break: break-word;
  border: 1px #00000 solid;
  font-size: 1rem;
  margin: 0.1rem;
  padding: 0.5rem;
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
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [text, setText] = useState("**Hello World**");

  return (
    <Container>
      <Area>
        <Input
          value={text}
          name="Input Text"
          onChange={(e) => setText(e.target.value)}
        ></Input>

        <Output source={text} />
      </Area>
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
