import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import data from "../sample-data/data.json";
import Editor from "@monaco-editor/react";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started


//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component() {
  return (
    <Editor
      height="50vh"
      width="80vw"
      defaultLanguage="cpp"
      defaultValue={data.anagrams["c++"]}
    />
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
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
