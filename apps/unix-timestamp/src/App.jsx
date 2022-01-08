import React, { useState, useEffect, useRef } from "react";
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
  const [uts, setUts] = useState(Math.round(new Date().getTime() / 1000));
  const [ls, setLs] = useState(new Date().toLocaleString());
  const [input1, setInput1] = useState(ls);
  const [input2, setInput2] = useState(uts);
  useEffect(() => {
    const interval = setInterval(() => {
      setUts(Math.round(new Date().getTime() / 1000));
      setLs(new Date().toLocaleString());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const datetimeInput = useRef();
  const utsInput = useRef();
  return (
    <Container>
      <h2>Unix Timestamp Conversion</h2>
      <Container>
        <p>Current Unix Timestamp is: {uts}</p>
        <p>Current Date and Time is: {ls}</p>
      </Container>
      <Container>
        <h3>To Unix Timestamp</h3>
        <input
          type="datetime-local"
          ref={datetimeInput}
          value={input1}
          onChange={() => setInput1(datetimeInput.current.value)}
        />
        <p>{Math.round(new Date(input1).getTime() / 1000)}</p>
      </Container>
      <Container>
        <h3>From Unix Timestamp</h3>
        <input
          type="number"
          min="0"
          max="2147483647"
          ref={utsInput}
          value={input2}
          onChange={() => setInput2(utsInput.current.value)}
        />
        <p>{new Date(input2 * 1000).toLocaleString()}</p>
      </Container>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (
    !isTriggered(query, ["unix time", "unix timestamp"], {
      substringMatch: true,
    })
  ) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  return true;
};

export { queryToData, Component };
