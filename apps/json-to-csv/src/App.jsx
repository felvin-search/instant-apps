import { Breakpoints, matchTriggerQueries } from "@felvin-search/core";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import JSONPretty from "react-json-pretty";
import styled from "styled-components";

//------------Styled Components-------------

const Container = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 1rem;
  width: 100%;
  border-radius: 0.25rem;

  // using bootstrap's breakpoint as Breakpoints only has property 'medium'
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

  // using bootstrap's breakpoint as Breakpoints only has property 'medium'
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

const CSVContainer = styled.div`
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

function Component() {
  const defaultData = '[\n\t{\n\t\t"FirstName": "John",\n\t\t"LastName": "Doe"\n\t}\n]'
  const [jsonData, setJSONData] = useState(defaultData);
  const [copy, setCopy] = useState(false);
  const [csvData, setCsvData] = useState();
  useEffect(() => {
    if (jsonData) {
      try {
        const parsedJson = JSON.parse(jsonData);
        if (!Array.isArray(parsedJson) ||
          !parsedJson.every((p) => typeof p === "object" && p !== null)
        ) {
          setCsvData("Incorrect JSON Data")
          return;
        }
        const heading = Object.keys(parsedJson[0]).join(",");
        const body = parsedJson.map((j) => Object.values(j).join(",")).join("\n");
        setCsvData(`${heading}\n${body}`);
      } catch {
        setCsvData("Incorrect JSON Data")
      }
    }
  }, [jsonData]);

  const handleCopy = (clipboard) => {
    var copyText = document.getElementById("csv");

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
          <FormLabel htmlFor="csv-result">Generated CSV</FormLabel>
          <CSVContainer as={JSONPretty} id="csv-result" data={csvData} />
        </Column>
      </Container>

      <CopyButton type="button" onClick={() => handleCopy(navigator.clipboard)}>
        Copy CSV &nbsp;{copy ? <Icon.Check /> : <Icon.Clipboard />}
      </CopyButton>
    </>
  );
}

// queryToData takes in the query and returns data which
// the Component displays on the website.
// If queryToData returns no data, we do not display the app.

const queryToData = matchTriggerQueries(["json to csv", "convert json to csv"]);

export { queryToData, Component };
