import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";
import styled from "styled-components";
import _ from "lodash";
import * as Icon from "react-feather";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started
const Source = styled.span`
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
  color: #878787;
`;

const SourceLink = styled.span`
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
  border: 0.5px #929292 solid;
  padding: 0;
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
const CodeSnippet = styled(SyntaxHighlighter)`
  height: 100%;
  margin: 0;
  padding: 20px;
`

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.

function Component(props) {
  console.log(props);

  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = (clip) => {
    clip.writeText(props.data.code).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <div>
      <CodeBlock>
        <CodeSnippet
          language={props.data.lan}
          style={atomOneLight}
          wrapLongLines={true}

        >
          {props.data.code}
        </CodeSnippet>
      </CodeBlock>
      <Container>
        <Source>
          Source :
          <SourceLink >www.geekforgeeks.com</SourceLink>
        </Source>
        <Clipboard onClick={() => handleCopy(navigator.clipboard)}>
          {!isCopied ? (
            <Icon.Copy size={26} color="#AFAFAF" />
          ) : (
            <Icon.Check size={26} color="#AFAFAF" />
          )}
        </Clipboard>
      </Container>
    </div>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (
    !isTriggered(
      query,
      [
        "find",
        "how",
      ],
      { substringMatch: true }
    )
  ) {
    return;
  }
  const lan = ['javascript', 'c++', 'c', 'python'];
  query = query.toLowerCase();
  let lanFound = lan.map((item) => {
    if (query.includes(item)) {
      return item
    }
  })
  lanFound = lanFound.filter(function (element) {
    return element !== undefined;
  });
  const res = await axios.get(`https://felvin-crawler.fly.dev/?q=${query}`)
  let code = res.data.filter((ele) => ele.lan.toLowerCase().includes(lanFound[0]))
  if(code.length===0){
    code =res.data;
  }
  if (res.status === 200) {
    return code[0];
  }
  else {
    return;
  }


};

export { queryToData, Component };