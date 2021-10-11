import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
`;
const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: left;
  margin: 2px;
`;
const Label = styled.label`
  padding: 2px 10px 0 0;
`;
const StrongAccept = styled.strong`
  color: green;
`;
const Input=styled.input`
  size:20;
`
const StrongReject = styled.strong`
  color: red;
`;

const Result=styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction:column
`

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [regex, setRegex] = useState("");
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const [result, setresult] = useState("");
  async function handleSubmit(e) {
    try {
      e.preventDefault();
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
      setValue("Sorry, An error occured!Please try again");
      setRegex("");
      setText("");
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Div>
          <Label>Enter Regex:</Label>
          <Input
            type="text"
            placeholder="Regex"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
          ></Input>
        </Div>
        <Div>
          <Label>Enter String:</Label>
          <input
            type="text"
            placeholder="Test String"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
        </Div>
        <input type="submit" value="Check"></input>
      </Form>
      {typeof Value === "boolean" ? (
        Value ? (
          <Result>
            <StrongAccept>The Test String matches the Regex</StrongAccept>
            <h3>
              <p dangerouslySetInnerHTML={{ __html: result }}></p>
            </h3>
          </Result>
        ) : (
          <StrongReject>The Test String Does not match the Regex</StrongReject>
        )
      ) : (
        <StrongReject>{Value}</StrongReject>
      )}
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (
    !isTriggered(query, [
      "regex validator",
      "check regex",
      "match regex",
      "regex checker",
      "regex tester",
    ])
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
