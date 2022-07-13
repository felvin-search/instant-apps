import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from "axios";
import styled from "styled-components";
import _ from "lodash";
import * as Icon from "react-feather";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started
const Source = styled.span`
  font-size: 1rem;
  color: #878787;
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
const Link = styled.a`
  
  text-decoration: none;
  color: #878787;
  font-weight: bold;
   
`
const Clipboard = styled.button`
  margin: 0;
`;
const CopyBtn = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  outline: 0;
  cursor: pointer;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component(props) {
  console.log(props.data.language, props.data.code);
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = (clip) => {
    clip.writeText(JSON.parse(props.data.code)).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  return (
    <div>
      <p>{`${_.startCase(props.data.algorithm)} In ${_.startCase(props.data.language)}`}</p>
      <CodeBlock>
        <SyntaxHighlighter
          language={props.data.language}
          style={a11yLight}
          wrapLongLines={true}
        >
          {JSON.parse(props.data.code)}
        </SyntaxHighlighter>
      </CodeBlock>
      <Container>
        <Source>
          Source : <Link href={props.data.source}>{props.data.name}</Link>
        </Source>
        <CopyBtn
          type="button"
          onClick={() => handleCopy(navigator.clipboard)}
        >
          {!isCopied ? (
            <Icon.Copy color="#AFAFAF" />
          ) : (
            <Icon.Check color="#AFAFAF" />
          )}
        </CopyBtn>
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
    "https://code-snippets.fly.dev/api/code",
    { params: { searchQuery } }
  );
  if (value.status == 200) {
    return value.data;
  }
  return;
};

export { queryToData, Component };
