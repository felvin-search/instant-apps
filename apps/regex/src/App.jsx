import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 42rem;
`;
const Pill = styled.div`
width: 20rem;
height: 42px;
padding-left: 1rem;
display: flex;
align-items: center;
background: #FAFAFA;
border-radius: 21px;
margin-bottom: 0.5rem;

`


const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  padding: 0.2rem;
`;
const StrongAccept = styled.strong`
  color: green;
`;
const Input = styled.input`
 
  min-height: 15rem;
  width: 20rem;
`;
const StrongReject = styled.strong`
  color: red;
`;

const Result = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

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
      if (regex == "") {
        setValue("Enter the regular expression");
        return;
      }
      if (text == "") {
        setValue("Enter the test String");
        return;
      }
      check ? setValue(true) : setValue(false);
    } catch (err) {
      setValue("The regular expression could not be parsed. Ensure the syntax is correct!");
    }
  }
  return (
    <Container>

      <Div>
        <Pill>Regular Expression</Pill>

        <Input
          type="text"
          placeholder="Regex"
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
        ></Input>
      </Div>
      <Div>

        <Pill>Test String</Pill>
        <Input
          type="text"
          placeholder="Test String"
          value={text}
          
          onChange={(e) => setText(e.target.value)}
        ></Input>
      </Div>


      {typeof value === "boolean" ? (
        value ? (
          <Result>
            <StrongAccept>The test string matches the regex</StrongAccept>
            <h3>
              <p dangerouslySetInnerHTML={{ __html: result }}></p>
            </h3>
          </Result>
        ) : (
          <StrongReject>The test string does not match the regex</StrongReject>
        )
      ) : (
        <StrongReject>{value}</StrongReject>
      )}
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
