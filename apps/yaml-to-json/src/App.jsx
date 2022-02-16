import { Breakpoints, matchTriggerQueries } from "@felvin-search/core";
import * as Icon from "react-feather";
import JSONPretty from "react-json-pretty";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import yaml from "js-yaml"

//------------Styled Components-------------

const Container = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 1rem;
  width: 100%;
  border-radius: 0.25rem;

  @media (min-width: ${Breakpoints.large || "992px"}) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  min-height: 14rem;
  min-width: 20vw;

  &:first-child {
    margin-bottom: 20px;
  }

  @media (min-width: ${Breakpoints.large || "992px"}) {
    &:first-child {
      margin-right: 20px;
      margin-bottom: 0px;
    }
  }
`;

const FormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const YAMLArea = styled.textarea`
  border: 1px solid #d0d0d0;
  box-sizing: border-box;
  box-shadow: inset 0px 2px 6px rgba(163, 162, 162, 0.05);
  border-radius: 4px;
  overflow-x: scroll;
  overflow-y: scroll;

  // fill remaining space
  flex: 1;

  resize: none;

  line-height: inherit;
  font-family: inherit;

  padding: 0.5rem;
`;

const JSONContainer = styled.div`
  overflow-x: scroll;
  outline: none;

  // fill remaining space
  flex: 1;

  border: 1px solid #d0d0d0;
  box-sizing: border-box;
  box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 4px;

  padding: 0.5rem;
`;

const CopyButton = styled.button`
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.75rem;

  background: transparent;
  cursor: pointer;
  line-height: inherit;
  font-family: inherit;

  border: 1px solid #8b949e;
  padding: 0.5rem 1rem;
  border-radius: 4px;
`;

// =========================================

function Component() {
  const defaultData = `
- martin:
  name: Martin D'vloper
  job: Developer
  skills:
    - python
    - perl
    - pascal
- tabitha:
  name: Tabitha Bitumen
  job: Developer
  skills:
    - lisp
    - fortran
    - erlang`
  const [yamlData, setYAMLData] = useState(defaultData);
  const [copy, setCopy] = useState(false);
  const [jsonData, setJSONData] = useState();
  useEffect(() => {
    if (yamlData) {
      const jsonDoc = yaml.load(yamlData)
      setJSONData(jsonDoc);
    }
  }, [yamlData]);

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
    <>
      <Container>
        <Column>
          <FormLabel htmlFor="yaml-textarea">YAML Data</FormLabel>
          <YAMLArea
            id="yaml-textarea"
            defaultValue={defaultData}
            onChange={(e) => setYAMLData(e.target.value)}
          />
        </Column>
        <Column>
          <FormLabel htmlFor="json-pretty">Generated JSON</FormLabel>
          <JSONContainer as={JSONPretty} id="json-pretty" data={jsonData} />
        </Column>
      </Container>

      <CopyButton type="button" onClick={() => handleCopy(navigator.clipboard)}>
        Copy JSON &nbsp;{copy ? <Icon.Check /> : <Icon.Clipboard />}
      </CopyButton>
    </>
  );
}

// function Component() {
//   return <div>Hello World</div>;
// }
//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  console.log("Inside queryToData")
  if (!isTriggered(query, [ "yaml to json" ])) {
    return;
  }

  console.log("yaml to json triggered")
  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
}

export { queryToData, Component };
