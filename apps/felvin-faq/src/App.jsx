import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import fingerprint from 'talisman/keyers/fingerprint';


// ------------- Preprocessors ---------------------
// Move to @felvin-search/core

// fingerprint

// ------------- String Matchers -------------------


// Default matcher
const matchStrings = (string1, string2) => {
  return fingerprint(string1) === fingerprint(string2);
}

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function getIdFromDriveUrl(url) { return url.match(/[-\w]{25,}/); }

const driveIdToEmbeddable = (id) => {
  return `https://drive.google.com/uc?export=view&id=${id}`
}
function Component({ data }) {
  const answer = data["Answer"]
  const isDriveLink = answer.startsWith('https://drive.google.com')
  if(isDriveLink) {
    const id = getIdFromDriveUrl(answer)
    const embeddable = driveIdToEmbeddable(id);
    return (
      <Container>
      <img src={embeddable} width="300" height="300"/>
    </Container>
    )
  } else {
    return (
      <Container>
        {data["Answer"]}
      </Container>
    );
  }

}
//=========================================

// This where you can process the query and try to convert it into some meaningful data.
async function queryToData({
  query,
}) {
  const sheetID = "1duJLsNW6IYmOnR9JItUuEHtlxS79ce4LalzQcHfKvCA";
  const response = await fetch(`https://low-code-service.felvin.com/api/?sheetID=${sheetID}`)
  const data = await response.json()
  for(const item of data){
    console.log(item)
    if(matchStrings(item["Question"], query)) {
      return item;
    }
  }
  return;
}

export { queryToData, Component };
