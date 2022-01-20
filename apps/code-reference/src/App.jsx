import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from "axios";
import styled from "styled-components";
import _ from "lodash";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started
const Source = styled.span`
  font-size: 1rem;
`;

const CodeBlock = styled.div`
  height: 60vh;
  width: clamp(300px, 60vw, 900px);
  overflow-y: auto;
  font-size: 1rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5rem;
`;

const Clipboard = styled.button`
  margin: 0;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component(props) {
  console.log(props.data.language, props.data.code);
  return (
    <div>
      <p>{_.startCase(props.data.algorithm)}</p>
      <CodeBlock>
        <SyntaxHighlighter 
          language={props.data.language} 
          style={a11yDark}
          wrapLongLines={true}
        >
          {JSON.parse(props.data.code)}
        </SyntaxHighlighter>
      </CodeBlock>
      <Container>
        <Source>
          Source : <a href={props.data.source}>{props.data.name}</a>
        </Source>
        <Clipboard
          onClick={() => {
            navigator.clipboard.writeText(JSON.parse(props.data.code));
          }}
        >
          Copy to Clipboard
        </Clipboard>
      </Container>
    </div>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  //  Query would have two different parts
  //  -> Algorithm - may be multi word
  //  -> Language - Mostly Single Word
  const languageMap = {
    js: "javascript",
    cpp: "c++"
  }
  query = query.toLowerCase();
  Object.keys(languageMap).forEach(shortForm => {
    query = query.replace(shortForm, languageMap[shortForm]);
  })
  const searchQuery = query;
  const value = await axios.get(
    "https://felvin-service.herokuapp.com/api/code",
    { params: { searchQuery } }
  );
  if (value.status == 200) {
    return value.data;
  }
  return;
};

export { queryToData, Component };
