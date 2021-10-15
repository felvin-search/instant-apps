import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import MarkdownPreview from "@uiw/react-markdown-preview";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: center;
`;

const Div = styled.div`
  height: 15rem;
  width: 20rem;
`;

const TextArea = styled.textarea`
  height:100%;
  width: 90%;
  resize: none;
`;

const P=styled.p`
border:1px solid;
word-break: break-all;
white-space: normal;
overflow:auto;
height:100%;
margin:0;
auto-scroll:on;
`

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [text, setText] = useState("**Hello World**");

  return (
    <Container>
      <Div>
        <TextArea
          value={text}
          name="Input Text"
          onChange={(e) => setText(e.target.value)}
        ></TextArea>
      </Div>

      <Div>
        <P>
          <MarkdownPreview source={text} />
        </P>
      </Div>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (!isTriggered(query, ["markdown","live markdown preview"],{substringMatch:true})) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
