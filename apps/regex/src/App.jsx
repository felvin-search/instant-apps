import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Icons from 'react-feather'
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 45rem;
`;
const Pill = styled.div`
width: 20rem;
height: 42px;
padding-left: 1rem;
display: flex;
align-items: center;
background: #FAFAFA;
border-radius: 21px;
margin-bottom: 0.8rem;
text-transform: uppercase;
font-weight: 600;
color: #2F2F2F;
`
const Alert = styled.span`
background: ${props => props.color};
border-radius: 0px 0px 3px 3px;
color: #FFFFFF;
position: absolute;
bottom: 0;
width: 100%;
font-weight: 510;
font-size: 12.985px;
line-height: 15px;
padding: 4px;
display: flex;
align-items: center;
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const Input = styled.textarea`
  min-height: 15rem;
  font-size: 1.1rem;
  padding: 0.4em;
  width: 20rem;
  border:${props => props.borderColor ? `1.2px solid ${props.borderColor}` : '1.2px solid #EAEAEA'};
  border-radius: 4px;
`;
const Button = styled.button`
  background: black;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  color: white;
 
  font-size: 1rem;
  padding: 0.25em 2em;
`
//color gen
const Color = (prop) => {
  if (prop === 'success') {
    return '#60AA4D'
  }
  else if (prop === 'failure') {
    return '#E17979'
  }
  else if (prop === 'error') {
    return '#ECB26F'
  }
}
//Icons Gen
const IconGen = (prop) => {
  if (prop === 'success') {
    return <Icons.CheckCircle size='12' style={{ marginRight: 4 }} />
  }
  else if (prop === 'failure') {
    return <Icons.XCircle size='12' style={{ marginRight: 4 }} />
  }
  else {
    return <Icons.AlertCircle size='12' style={{ marginRight: 4 }} />
  }
}
//Alert Gen
const AlertGen = ({ type }) => {
  return (
    <Alert color={Color(type)} >{IconGen(type)}{type === 'success' ? 'String matches expression' : type === 'failure' ? 'String does not match the expression' : 'Invalid Regular Expression'}</Alert>
  )
}

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [regex, setRegex] = useState("");
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const [result, setresult] = useState("");
  function handleSubmit(e) {
    try {
      e.preventDefault();
      // directly converting the input string into regex results in backslash getting escaped
      // https://stackoverflow.com/a/874742
      let flags = regex.replace(/.*\/([gimy]*)$/, "$1");
      let pattern = regex.replace(new RegExp("^/(.*?)/" + flags + "$"), "$1");
      let reg = new RegExp(pattern, flags);
      let check = reg.test(text);
      let result = text;
      result = result.replace(reg, (match) => `<mark>${match}</mark>`);
      setresult(result);
      if (regex === '' && text === '') {
        setValue(true)
        return;
      }
      check ? setValue("success") : setValue("failure");
    } catch (err) {
      setValue("error");
    }
  }
  return (
    <Container>

      <Div>
        <Pill>Regular Expression</Pill>

        <Input
          type="text"
          placeholder="Insert your regular expression here..."
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          borderColor={value === 'error' && Color(value)}
          required
        ></Input>
        {!regex.length && value ? <Alert color={Color('error')} >{IconGen('error')}Enter Regex</Alert> : null}
        {value === 'error' && <AlertGen type={value} />}
      </Div>
      <Div>

        <Pill>Test String</Pill>
        <Input
          type="text"
          placeholder="Insert your test string here..."
          value={text}
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          borderColor={Color(value)}
          required
          onChange={(e) => setText(e.target.value)}
        ></Input>
        {!text.length && value ? <Alert color={Color('error')} >{IconGen('error')}Enter String</Alert> : null}
        {value === 'success' || value === 'failure' ? <AlertGen type={value} /> : null}
      </Div>
      <Button onClick={handleSubmit}>Check</Button>


    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (
    !isTriggered(
      query,
      [
        "regex validator",
        "check regex",
        "match regex",
        "regex checker",
        "regex tester",
      ],
      { substringMatch: true }
    )
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
