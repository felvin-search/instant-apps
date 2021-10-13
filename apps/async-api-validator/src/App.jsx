import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started
import parser from "@asyncapi/parser";

//-----------Styled Components-----------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 700px;
  margin: 1rem 0;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const TextArea = styled.textarea`
  outline: none;
  padding: 0.6rem;
  background: #ffffff;
  border: 1px solid #d0d0d0;
  box-sizing: border-box;
  box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;

  width: 100%;

  &:focus,
  &:active {
    border: 1px solid #5f26ff;
  }
`;

const Input = styled.input`
  margin: 2px;
`;

const ErrorLabel = styled.label`
  span {
    color: red;
  }
`;
//=========================================

async function parseApiSchema(schema) {}

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [error, changeError] = useState(null);
  const [apiSchema, changeApiSchema] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      try {
        const doc = await parser.parse(apiSchema);
        changeError(null);
      } catch (e) {
        changeError(e.title);
      }
    } catch (err) {}
  }
  return (
    <Form onSubmit={handleSubmit}>
      <ErrorLabel>
        <TextArea
          rows={5}
          placeholder="Paste Async API schema here (YAML/JSON)"
          value={apiSchema}
          onChange={(e) => changeApiSchema(e.target.value)}
        />
        <span>{error}</span>
      </ErrorLabel>
      <Input type="submit" value="Validate"></Input>
    </Form>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (!isTriggered(query, ["asyncapi", "async api"])) {
    return;
  }
  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
