import React, { useState, useRef } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import codes from "./codes.json";

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
  const [lang, setLang] = useState("Javascript");
  const inputRef = useRef();
  return (
    <Container>
      Hello World program in:
      <select
        ref={inputRef}
        onChange={() => setLang(inputRef.current.value)}
        value={lang}
      >
        {Object.keys(data).map((language) => (
          <option value={language}>{language}</option>
        ))}
      </select>
      <code>
        <pre>{data[lang]}</pre>
      </code>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (
    !isTriggered(query, ["hello world"], {
      substringMatch: true,
    })
  ) {
    return Promise.resolve(false);
  }
  const data = {};
  codes.forEach((code) => {
    data[code.language_name] = code.program;
  });
  console.log(data);
  return Promise.resolve(data);
};

export { queryToData, Component };
