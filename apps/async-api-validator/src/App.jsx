import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import _ from "lodash";
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

  &:focus,
  &:active {
    border: 1px solid #5f26ff;
  }
`;

const Input = styled.input`
  margin: 5px;
`;

const ErrorLabel = styled.label`
  width: 100%;
  span.error {
    color: red;
  }
  span.success {
    color: green;
  }
`;
//=========================================

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
        let errorMsg = e.title;
        console.log(e.validationErrors);
        if (_.has(e, "validationErrors")) {
          _.forEach(e.validationErrors, (error) => {
            if (error.title) {
              errorMsg += `<br>- ${error.title}`;
            }
          });
        }
        changeError(errorMsg);
        console.log(e.validationErrors);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TextArea
          rows={5}
          placeholder="Paste Async API schema here (YAML/JSON)"
          value={apiSchema}
          onChange={(e) => {
            changeValidateClicked(false);
            changeApiSchema(e.target.value);
          }}
        />

        <Input type="submit" value="Validate"></Input>
        <ErrorLabel>
          <span
            className="error"
            dangerouslySetInnerHTML={{ __html: error }}
          ></span>
          <span className="success">
            {validateClicked && !error ? "AsyncAPI schema is valid" : null}{" "}
          </span>
        </ErrorLabel>
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
