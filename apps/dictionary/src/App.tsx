import React from "react";
import styled from "styled-components";
import {
  isTriggered,
  InstantApp,
  InstantAppProps,
  queryToDataInput,
  queryToDataOutput,
} from "@felvin-search/core";

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const ColContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 1rem 0;
`;

const DefinitionContainer = styled.div`
  padding: 0.5rem;
  margin-left: 0.5rem;
`;

const DictionaryContainer = styled.div`
  h1 {
    font-size: 1.5rem;
  }

  audio {
    margin: 0 0.5rem;
  }
`;

function Definition(props) {
  const definition = props.data;
  return (
    <DefinitionContainer>
      <div>{definition.definition}</div>
      {definition.synonyms && (
        <div>
          Synonyms: &thinsp;
          <em>{definition.synonyms.join(", ")}</em>
        </div>
      )}
    </DefinitionContainer>
  );
}

// ============ Excel Cheatsheet app ================
const sheetApiKey = "AIzaSyC-AfHslgkSCaq7OkbD7sLiyv8RKhzUBNU"

function sheetToSheetAPIUrl(sheetId, sheetName, apiKey) {
  return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A1:Z1000?key=${apiKey}`;
}

async function sheetToJson(sheetId, sheetName) {
  const request = await fetch(sheetToSheetAPIUrl(sheetId, sheetName, sheetApiKey))
  const data = await request.json()
  const keys = data["values"][0];
  // console.log(keys)
  const rows = data["values"].slice(1);
  console.log(rows)
  var transformedData = []
  for(let i=0; i<5; i++) { // TODO fix this
    var item = {};
    for(let j=0; j< 4; j++) { // TODO fix this
      console.log(`i: ${i}, j: ${j}`)
      const key = keys[j]
      item[key] = rows[i][j];
      console.log(item)
    }
    // @ts-ignore
    transformedData.push(item)
  }


  // return data;
  // console.log(transformedData)
  return transformedData;
}

const driveLinkToDriveId = (link) => {
  const re = new RegExp('\d[^/]+')
}

const driveIdToEmbeddable = (id) => {
  return `https://drive.google.com/uc?export=view&id=${id}`
}

// ==================== End =========================
Pin a row
/**
 * The UI logic of the app.
 */
function Component(props: InstantAppProps) {
  const data = props.data;

  return (
    <DictionaryContainer>
      {/* <h1>{JSON.stringify(data)}</h1> */}
      <p>{data["Formula"]}</p>
      <p>{data["Explaination"]}</p>
      <img src={data["Gif"]} width="600" height="400"></img>

    </DictionaryContainer>
  );
}

const triggerWords = ["define", "meaning","pronounce","pronunciation"];
function cleanQuery(query: string): string {
  let newQuery = query;
  triggerWords.forEach((word) => (newQuery = newQuery.replace(word, "")));
  newQuery = newQuery.trim();
  return newQuery;
}

async function queryToData({
  query,
}: queryToDataInput): Promise<queryToDataOutput> {
  // If the query does not contain the following words, do not trigger the app
  // `define`, `meaning`
  const data = await sheetToJson("1QadcLXlmxj_L5IbJkA0YN51vyZUpDx8AO6RfBjoMPlY", "Sheet1")
  console.log("Got the data")
  for(const item of data){
    if(item["Search queries"] === query) {
      return item;
    }
  }
  return data;
}

export { queryToData, Component };

// TODO: Match with multiple queries in the sheet?
// TODO: Automatically transform the google drive link to embeddable link
// TODO: Fix the drive link thing
