import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import code from "../sample-data/data.json";
import Editor from "@monaco-editor/react";

const languages = [
  "c++",
  "js",
  "javascript",
  "python",
  "py",
  "bash",
  "golang",
  "shell",
  "haskell",
];

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component([algorithm,language]) {
  return (
    <div>
      <Editor
        height="50vh"
        width="60vw"
        theme="vs-dark"
        defaultLanguage={language}
        defaultValue={code[algorithm][language]}
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

  if (Object.keys(code).includes(algorithm) && languages.includes(language)) {
    return [algorithm, language];
  }
  return;

  if (
    !isTriggered(query, ["bfs in js", "dfs in c++", "binary search in python"])
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
