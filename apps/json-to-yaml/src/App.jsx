import { Breakpoints } from "@felvin-search/core";
import * as Icon from "react-feather";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import yaml from "js-yaml";
import JSONPretty from "react-json-pretty";

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

const JSONArea = styled.textarea`
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

const YAMLContainer = styled.div`
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

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component() {
  const defaultData = `
  [
    {
      "name": "Martin D'vloper",
      "job": "Developer",
      "skills": [
        "python",
        "perl",
        "pascal"
      ]
    },
    {
      "name": "Tabitha Bitumen",
      "job": "Developer",
      "skills": [
        "lisp",
        "fortran",
        "erlang"
      ]
    }
  ]`;
  const [jsonData, setJSONData] = useState(defaultData);
  const [copy, setCopy] = useState(false);
  const [yamlData, setYAMLData] = useState();

  useEffect(() => {
    if (jsonData) {
      try {
        const yamlDoc = yaml.dump(JSON.parse(jsonData));
        setYAMLData(yamlDoc);
      } catch (e) {
        console.log("Invalid JSON");
      }
    }
  }, [jsonData]);

  const handleCopy = (clipboard) => {
    var copyText = document.getElementById("yaml-text");

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
          <FormLabel htmlFor="json-textarea">JSON Data</FormLabel>
          <JSONArea
            id="json-textarea"
            defaultValue={defaultData}
            onChange={(e) => setJSONData(e.target.value)}
          />
        </Column>
        <Column>
          <FormLabel htmlFor="yaml-text">Generated YAML</FormLabel>
          <YAMLContainer as={JSONPretty} id="yaml-text" data={yamlData} />
        </Column>
      </Container>

      <CopyButton type="button" onClick={() => handleCopy(navigator.clipboard)}>
        Copy YAML&nbsp;{copy ? <Icon.Check /> : <Icon.Clipboard />}
      </CopyButton>
    </>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["json to yaml"])) {
    return;
  }
  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
