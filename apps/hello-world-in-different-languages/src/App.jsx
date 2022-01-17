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
  const [lang, setLang] = useState(data.language);
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
          <option key={language} value={language}>
            {language}
          </option>
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
  let language = query.split(" ")[3].toLowerCase(); // get the language from the query

  if (language) { // if language is not empty convert the first letter to uppercase and set it as the language
    const firstLetter = language.charAt(0).toUpperCase();
    language = language.replace(language.charAt(0), firstLetter);
  }

  codes.forEach((code) => {
    data[code.language_name] = code.program;
  });

  // if language is not empty, return the code for the language
  data.language = language;

  return Promise.resolve(data);
};

export { queryToData, Component };
