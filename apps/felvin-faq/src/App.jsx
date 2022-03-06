import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import fingerprint from 'talisman/keyers/fingerprint';
import sift4 from 'talisman/metrics/sift4';

// Move all the matcher stuff to @felvin-search/core later


// Design Principles
// Low floor, High Ceiling
// Low floor: It should be extremely easy to get started. 
// The default choices should be good and work for most of the cases. This means we provide
// good default matcher which works well in most of the cases and you don't have to think too much before using it.
//
// High Ceiling: The space of possibilities of things you can do should be really really large. You should be able to do
// things we didn't think of. This means we expose all the building blocks and provide them in a way you can pick and choose
// to create your own string matchers.

// Two kinds of building blocks
//
// Preprocessors: (<string>) => <string>
// Takes a string, returns a string.
// A preprocessor takes a string and converts into a string which is simpler or more desirable to use
// It can be things like toLowercase, removeStopWords, removeAccents, stemWords
// Because the input type is same as the output type, preprocessors can be chained to create new preprocessors
//
// Matcher: (<string>, <string>) => <float between 0 and 1> 
// We convert the output of matcher into a boolean by setting a threshold value
//
// the combination of preprocessor, matcher and threshold creates a matcher config
// We can have lots of predefined matcherConfigs
// The default config use fingerprint 

// ------------- Preprocessors ---------------------

const toLowercase = (str) => {
  return str.toLowercase()
}
const identity = (string) => {return string}

// fingerprint matcher from talisman library
// There can be many other preprocessors like
// removeStopWords, replaceSynonyms
// or preprocessors which converts the input queries to phonetic strings

// ------------- String Matchers -------------------
const identityMatcher = (string1, string2) => {
  return string1 === string2;
}

const siftMatcher = (string1, string2) => {
  const N = Math.max(string1.length, string2.length)
  return 1 - (sift4(string1, string2)/(N*1.0))
}

// There can be more matchers like NLP based matchers or matchers which uses different string distance formulas
window.siftMatcher = siftMatcher
window.sift4 = sift4

// ------------- Configs ---------------------------
const exactMatchConfig = {threshold: 1, preprocessor: identity, matcher: identityMatcher}
const typoTolerantConfig = {threshold: 0.8, preprocessor: fingerprint, matcher: siftMatcher}
// There can be more configs
const defaultConfig = typoTolerantConfig


// ------------- Function to use -------------------

const matchStrings = (string1, string2, config=defaultConfig) => {
  const {threshold, preprocessor, matcher} = config;
  return matcher(preprocessor(string1), preprocessor(string2)) > threshold;
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
