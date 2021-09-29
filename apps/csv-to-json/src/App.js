import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import JSONPretty from "react-json-pretty";
import styled from "styled-components";
import { Breakpoints } from "@felvin-search/core";

//------------Styled Components-------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: 1rem 0;

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;
  }
`;

const CSVArea = styled.textarea`
  border: 1px solid #d0d0d0;
  box-sizing: border-box;
  box-shadow: inset 0px 2px 6px rgba(163, 162, 162, 0.05);
  border-radius: 4px;

  margin: 0.5rem 0;
  padding: 0.5rem;
  resize: none;

  line-height: inherit;
  font-family: inherit;
  font-size: inherit;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  position: relative;
  margin: 0 1rem;
`;

const JSONContainer = styled.div`
  width: 310px;
  overflow-x: scroll;
  outline: none;
  padding: 0.5rem;
  margin: 0.5rem 0;
  height: 100%;

  background: #ffffff;
  border: 1px solid #d0d0d0;
  box-sizing: border-box;
  box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;

const CopyButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  top: 2px;

  background: transparent;
  cursor: pointer;
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;

  border: 1px solid #8b949e;
  padding: 0.25rem;
  margin: 0.25rem;
  border-radius: 5px;
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
      <CSVArea
        rows="10"
        placeholder="Paste CSV here"
        onChange={(e) => setCSVData(e.target.value)}
      />

      <RightColumn>
        <JSONContainer as={JSONPretty} id="json-pretty" data={jsonData} />
        <CopyButton onClick={() => handleCopy(navigator.clipboard)}>
          Copy {copy ? <Icon.Check /> : <Icon.Clipboard />}
        </CopyButton>
      </RightColumn>
    </Container>
  );
}

export default Renderer;
