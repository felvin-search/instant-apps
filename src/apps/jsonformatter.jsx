import React, { useState } from "react";
import * as Icon from "react-feather";
import JSONPretty from "react-json-pretty";
import styled from "styled-components";

//-----------Styled Components-----------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 700px;
  margin: 1rem 0;
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
    border: 1px soild #5f26ff;
  }
`;

const JSONContainer = styled.div`
  outline: none;
  padding: 0.6rem;
  margin: 1rem 0 0 0;

  background: #ffffff;
  border: 1px solid #d0d0d0;
  box-sizing: border-box;
  box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;
  min-height: 50px;

  &:focus,
  &:active {
    border: 1px soild #5f26ff;
  }
`;

const CopyButton = styled.button`
  display: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 20px;

  border: 1px solid #8b949e;
  padding: 0.25rem;
  border-radius: 5px;
`;

const FormattedJSONContainer = styled.div`
  position: relative;

  &:hover {
    ${CopyButton} {
      display: block;
    }
  }
`;

//==============================================

function PrettifyJSON() {
  const [jsonData, setJsonData] = useState();
  const [copy, setCopy] = useState(false);

  const handleCopy = (clipboard) => {
    var copyText = document.getElementById("json-pretty");

    clipboard.writeText(copyText.innerText).then(() => {
      setCopy(true);

      setTimeout(() => {
        setCopy(false);
      }, 2000);
    });
  };

  return (
    <Container>
      <TextArea
        rows="5"
        placeholder="Paste JSON here"
        onChange={(e) => setJsonData(e.target.value)}
      />
      <FormattedJSONContainer>
        <CopyButton onClick={() => handleCopy(navigator.clipboard)}>
          {copy ? <Icon.Check /> : <Icon.Clipboard />}
        </CopyButton>
        <JSONContainer as={JSONPretty} id="json-pretty" data={jsonData} />
      </FormattedJSONContainer>
    </Container>
  );
}

async function shouldTriggerJSONFormatter({ query }) {
  const triggerQueries = ["json format", "format json"];
  for (const triggerQuery of triggerQueries) {
    if (query.toLowerCase() === triggerQuery) {
      return true;
    }
  }
}

const JSONFormatterApp = {
  id: "jsonformatter",
  name: "JSONFormatter",
  description:
    "Formats the JSON with right indentation for easier human consumption",
  queryToData: shouldTriggerJSONFormatter,
  Component: PrettifyJSON,
};

export default JSONFormatterApp;
