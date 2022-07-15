import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";
import styled from "styled-components";
import _ from "lodash";
import * as Icon from "react-feather";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started
const Source = styled.span`
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
  color: #878787;
`;

const SourceLink = styled.a`
  text-decoration: none;
  color: #878787;
  margin-left: 4px;
  font-weight: 700;
`;

const CodeBlock = styled.div`
  height: 60vh;
  width: clamp(300px, 60vw, 900px);
  overflow-y: auto;
  font-size: 1rem;
`;
const CodeBlockWrapper = styled.div`
  height: 68vh;
  background: #fafafac7;
  width: clamp(300px, 60vw, 900px);
  border: 0.5px #929292 solid;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5rem;
`;

const Clipboard = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 1.1rem;
  outline: 0;
  cursor: pointer;
  float: right;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.

function Component(props) {
  console.log(props.data);
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
      <b>{_.startCase(`${props.data.algorithm} in ${props.data.language}`)}</b>
      <CodeBlockWrapper>
        <CodeBlock>
          <SyntaxHighlighter
            language={props.data.language}
            style={atomOneLight}
            wrapLongLines={true}
            customStyle={{
              background: "#FAFAFA",
            }}
          >
            {JSON.parse(props.data.code)}
          </SyntaxHighlighter>
        </CodeBlock>
        <Clipboard onClick={() => handleCopy(navigator.clipboard)}>
          {!isCopied ? (
            <Icon.Copy size={26} color="#AFAFAF" />
          ) : (
            <Icon.Check size={26} color="#AFAFAF" />
          )}
        </Clipboard>
      </CodeBlockWrapper>
      <Container>
        <Source>
          Source :
          <SourceLink href={props.data.source}>{props.data.name}</SourceLink>
        </Source>
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
    cpp: "c++",
  };
  query = query.toLowerCase();
  Object.keys(languageMap).forEach((shortForm) => {
    query = query.replace(shortForm, languageMap[shortForm]);
  });
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