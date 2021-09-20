import React from "react";
import styled from "styled-components";
import { isTriggered } from "../lib/utilityApis";
import {
  InstantApp,
  InstantAppProps,
  queryToDataInput,
  queryToDataOutput,
} from "./types";

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

/**
 * The UI logic of the app.
 */
function Component(props: InstantAppProps) {
  const data = props.data;

  return (
    <DictionaryContainer>
      <h1>{data.word}</h1>
      <RowContainer>
        <div>{data.phonetics[0]?.text}</div>
        <audio controls src={data.phonetics[0]?.audio}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </RowContainer>
      {data.meanings &&
        data.meanings.map((m, index) => {
          return (
            <ColContainer key={index}>
              <em>{m.partOfSpeech}</em>
              {m.definitions.map((d) => (
                <Definition data={d} key={d} />
              ))}
            </ColContainer>
          );
        })}
    </DictionaryContainer>
  );
}

const triggerWords = ["define", "meaning"];
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
  if (!isTriggered(query, triggerWords, { substringMatch: true })) return;
  const cleanedQuery = cleanQuery(query);

  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en_US/${cleanedQuery}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Something went wrong with API request. Status ${response.status} ${response.statusText} ${data}`
    );
  }

  if (data && Array.isArray(data) && data.length > 0) {
    return data[0];
  }
}

/**
 * Definition of the instant app.
 */
const DictionaryApp: InstantApp = {
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/4/4b/Books-aj.svg_aj_ashton_01.svg",
  queryToData,
  Component,
};

export default DictionaryApp;
