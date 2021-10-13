import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

import parser from "@asyncapi/parser";

//-----------Styled Components-----------------

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  border-radius: 0.25rem;
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
  margin: 5px;
`;

const ErrorLabel = styled.label`
  span.error {
    color: red;
  }
  span.success {
    color: green;
  }
`;
//=========================================

async function parseApiSchema(schema) {}

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [error, changeError] = useState(null);
  const [apiSchema, changeApiSchema] = useState("");
  const [validateClicked, changeValidateClicked] = useState(false);

  async function handleSubmit(e) {
    changeValidateClicked(true);
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
    <Container>
      <Form onSubmit={handleSubmit}>
        <ErrorLabel>
          <TextArea
            rows={5}
            placeholder="Paste Async API schema here (YAML/JSON)"
            value={apiSchema}
            onChange={(e) => {
              changeValidateClicked(false);
              changeApiSchema(e.target.value);
            }}
          />
          <span className="error">{error}</span>
          <span className="success">
            {validateClicked && !error ? "AsyncAPI schema is valid" : null}{" "}
          </span>
        </ErrorLabel>
        <Input type="submit" value="Validate"></Input>
      </Form>
    </Container>
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
