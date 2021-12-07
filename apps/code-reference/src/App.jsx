import React from "react";
import code from "../sample-data/data.json";
import Editor from "@monaco-editor/react";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component(props) {
  return (
    <div>
      <Editor
        height="50vh"
        width="60vw"
        theme="vs-dark"
        defaultLanguage={props.data.language}
        defaultValue={code[props.data.algorithm][props.data.language]}
      />
    </div>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  //  Query would have two different parts
  //  -> Algorithm - may be multi word
  //  -> Language - Mostly Single Word

  //Implementation:
  // Would search if any language is present in the query , If yes
  // Then look for algorithm by making substrings of all words in the query

  query = query.toLowerCase();

  const [algorithm, language] = query.split(" in ");

  if (
    Object.keys(code).includes(algorithm) &&
    Object.keys(code[algorithm]).includes(language)
  ) {
    return { algorithm, language };
  }
  return;
};

export { queryToData, Component };
