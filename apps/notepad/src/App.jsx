import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import Editor from "rich-markdown-editor";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 55rem;
  min-height: 20rem;
  border: 1px solid black;
  padding: 1rem 1.5rem;
  border-radius: 10px;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {

  const [text, setText] = useState("");

  useEffect(() => {

    if(localStorage.getItem("felvin_note") !== null) setText(localStorage.getItem("felvin_note"));
  }, []);

  const textChangeHandler = (text) => {
    localStorage.setItem("felvin_note", text());
    setText(text);
  }

  return (
    <Container>
      <Editor
        defaultValue={localStorage.getItem("felvin_note")}
        placeholder="Take a note...."
        onChange={(changeFunc) => textChangeHandler(changeFunc)}
      />
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, [ "notes","notepad","take notes" ])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
}

export { queryToData, Component };
