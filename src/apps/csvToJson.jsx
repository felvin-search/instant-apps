import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import JSONPretty from "react-json-pretty";
import styled from "styled-components";
import { matchTriggerQueries } from "../lib/utilityApis";

//------------Styled Components-------------

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 700px;
  margin: 1rem 0;
`;

const Column = styled.div`
  padding: 0.6rem;
  margin: 0.8rem;
  background: #ffffff;
  border: 1px solid #d0d0d0;
  box-sizing: border-box;
  box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  width: 300px;
  height: 400px;
`;

const CSVArea = styled.textarea`
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  resize: none;
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
//=========================================

function Renderer() {
  const [csvData, setCSVData] = useState();
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
    <Container>
      <Column>
        <CSVArea
          rows="10"
          placeholder="Paste CSV here"
          onChange={(e) => setCSVData(e.target.value)}
        />
      </Column>
      <Column>
        <CopyButton onClick={() => handleCopy(navigator.clipboard)}>
          {copy ? <Icon.Check /> : <Icon.Clipboard />}
        </CopyButton>
        <JSONContainer as={JSONPretty} id="json-pretty" data={jsonData} />
      </Column>
    </Container>
  );
}

const CsvToJSON = {
  name: "csvToJson",
  description: "convert csv to json",
  // queryToData takes in the query and returns data which
  // the Component displays on the website.
  // If queryToData returns no data, we do not display the app.
  queryToData: matchTriggerQueries(["csv to json"]),
  Component: Renderer,
};

export default CsvToJSON;
