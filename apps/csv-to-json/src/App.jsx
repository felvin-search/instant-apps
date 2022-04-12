import { Breakpoints, matchTriggerQueries } from "@felvin-search/core";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
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

const CSVArea = styled.textarea`
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

const JSONContainer = styled.pre`
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
  const defaultData = "FirstName,LastName\nJohn,Doe";
  const [csvData, setCSVData] = useState(defaultData);
  const [copy, setCopy] = useState(false);
  const [jsonData, setJSONData] = useState();
  useEffect(() => {
    if (csvData) {
      var results = Papa.parse(csvData, { header: true });
      setJSONData(results.data);
    }
  }, [csvData]);

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
          <FormLabel htmlFor="csv-textarea">CSV Data</FormLabel>
          <CSVArea
            id="csv-textarea"
            defaultValue={defaultData}
            onChange={(e) => setCSVData(e.target.value)}
          />
        </Column>
        <Column>
          <FormLabel htmlFor="json-pretty">Generated JSON</FormLabel>
          <JSONContainer id="json-pretty">
            {JSON.stringify(jsonData, null, 2)}
          </JSONContainer>
        </Column>
      </Container>

      <CopyButton type="button" onClick={() => handleCopy(navigator.clipboard)}>
        Copy JSON &nbsp;{copy ? <Icon.Check /> : <Icon.Clipboard />}
      </CopyButton>
    </>
  );
}

// queryToData takes in the query and returns data which
// the Component displays on the website.
// If queryToData returns no data, we do not display the app.

const queryToData = matchTriggerQueries(["csv to json"]);

export { queryToData, Component };
