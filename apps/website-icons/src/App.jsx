import React, { useState, useRef } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [url, setUrl] = useState(data);
  const [iconUrl, setIconUrl] = useState(data);
  const inputRef = useRef();
  const submitHandler = e => {
    e.preventDefault();
    setIconUrl(inputRef.current.value);
  }
  return (
    <Container>
      <h2>Website Icons</h2>
      <form onSubmit={submitHandler}>
        <input ref={inputRef} value={url} onChange={() => setUrl(inputRef.current.value)}/>
        <button type="submit">Get Icon</button>
      </form>
      <img src={`https:/icon.horse/icon/${iconUrl}`} alt={iconUrl}></img>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (!isTriggered(query, [ "icon","favicon","icons","favicons" ], {
    substringMatch: true
  })) {
    return Promise.resolve(false);
  }
  const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const url = query.match(urlRegex)?.[0].toString();
  if(url) return Promise.resolve(url)
  return Promise.resolve("felvin.com");
}

export { queryToData, Component };
