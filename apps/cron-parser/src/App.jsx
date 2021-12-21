import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import cronstrue from "cronstrue";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin: 0.2rem;
`;
const Label = styled.label`
  padding: 0.2rem;
`;

const Input = styled.input`
  size: 20;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [cron, setCron] = useState("");
  const [result, setResult] = useState(null);
  function handleSubmit(e) {
    4;
    try {
      e.preventDefault();
      const parsedStatement = cronstrue.toString(cron);
      setResult(parsedStatement);
      console.log(parsedStatement);
    } catch {
      setResult("Incorrect cron statement");
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Div>
          <Label>Enter Cron Statement:</Label>
          <Input
            type="text"
            placeholder="* * * * *"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
          ></Input>
        </Div>
        <input type="submit" value="Parse"></input>
      </Form>
      {result != null ? <p>{result}</p> : null}
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["cron"], { substringMatch: true })) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
