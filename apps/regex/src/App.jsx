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
`;
const Label = styled.label`
  padding: 2px 10px 0 0;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [regex, setRegex] = useState("");
  const [text, setText] = useState("");
  const [Value, setValue] = useState("");
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let reg = new RegExp(regex);
      let check = reg.test(text);
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
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Div>
          <Label>Enter Regex:</Label>
          <input
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
          ></input>
        </Div>
        <Div>
          <Label>Enter String:</Label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
        </Div>
        <input type="submit" value="Check"></input>
      </Form>
      {typeof Value === "boolean" ? (
        Value ? (
          <h3>The string matches the regex</h3>
        ) : (
          <h3>The String Does not match the regex</h3>
        )
      ) : (
        <h3>{Value}</h3>
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
