import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
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

const Img = styled.img`
  display: ${props => props.hide ? "none" : "block"};
`;

const RotateInfinitely = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  box-sizing: border-box;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border: 10px black solid;
  border-top-color: transparent;
  transform: rotate(0deg);
  animation: ${RotateInfinitely} 700ms ease-in-out infinite;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [url, setUrl] = useState(data);
  const [iconUrl, setIconUrl] = useState(data);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef();
  const submitHandler = e => {
    e.preventDefault();
    // if user changes the url, only then set loading to true, as otherwise it causes perpetual loading error
    if(inputRef.current.value !== iconUrl) setLoading(true);
    setIconUrl(inputRef.current.value);
  }
  return (
    <Container>
      <h2>Website Icons</h2>
      <form onSubmit={submitHandler}>
        <input ref={inputRef} value={url} onChange={() => setUrl(inputRef.current.value)}/>
        <button type="submit">Get Icon</button>
      </form>
      {loading ? <Loader/> : null}
      <Img hide={loading} onLoad={()=>setLoading(false)} src={`https://icon.horse/icon/${iconUrl}`} alt={iconUrl}></Img>
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
  if(url) return Promise.resolve(url);
  const words = query.split(" ").map(w => w.toLowerCase());
  if(words.includes("website") || words.includes("site")) return Promise.resolve("felvin.com");
  return Promise.resolve(false);
}

export { queryToData, Component };
