import React, { useState } from "react";
import JSONPretty from "react-json-pretty";

function PrettifyJSON() {
  const [jsonData, setJsonData] = useState({});

  return (
    <React.Fragment>
      <textarea
        rows="10"
        cols="100"
        placeholder="Enter your JSON to get formatted"
        onChange={(e) => setJsonData(e.target.value)}
      />
      <JSONPretty id="json-pretty" data={jsonData}></JSONPretty>
    </React.Fragment>
  );
}

async function dummyFunction() {
  // A function just to make sure component works
  return [""];
}

const PrettifyJSONApp = {
  name: "PrettifyJSON",
  id: "prettify_json",
  description: "Prettify JSON",
  logo: "",
  dataFetcher: dummyFunction,
  renderer: PrettifyJSON,
};

export default PrettifyJSONApp;
