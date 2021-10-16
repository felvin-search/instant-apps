import React, { useState, useRef } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import marked from "marked";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: clamp(100px,20vh,70vh);
  grid-gap: 0.5rem;
  width: max(70vw, 300px);
`;

const Input = styled.textarea`
  resize: none;
  overflow-y: auto;
  word-break: break-word;
  border: 2px black dashed;
  font-size: 1rem;
`;
  
  const Output = styled.div`
  overflow-y: auto;
  overflow-wrap: break-word;
  border: 2px black dashed;
`;

const Button = styled.button`
  display: block;
  padding: 0.25rem;
  margin: 0.5rem auto;
`;

const Notification = styled.div`
  visibility: ${props => props.show ? "visible" : "hidden"};
  text-align: center;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component() {
  const [md, setMd] = useState("## Heading *Italic*");
  const [notification, setNotification] = useState(false);
  const  copyHandler = () => {
    navigator.clipboard.writeText(marked(md, {sanitised: true}));
    setNotification(true);
    setTimeout(() => {
      setNotification(false)
    }, 800);
  }
  const inputRef = useRef();
  return (
    <Container>
      <h2>Markdown to HTML Converter</h2>
      <Form>
        <Input ref={inputRef} onChange={() => setMd(inputRef.current.value)}>## Heading *Italic*</Input>
        <Output>
            <code>
              {marked(md, {sanitised: true})}
            </code>
        </Output>
      </Form>
      <Button onClick={copyHandler}>Copy HTML to Clipboard</Button>
      <Notification show={notification}>Copied!</Notification>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (!isTriggered(query, [ "markdown to html","markdown into html","md to html","md into html" ]), { substringMatch: true }) {
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
}

export { queryToData, Component };
