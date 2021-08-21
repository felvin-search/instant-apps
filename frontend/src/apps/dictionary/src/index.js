import axios from "axios";
import React from "react";
import styled from "styled-components";

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

function Dictionary(props) {
  const data = props.data[0];
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
            <ColContainer>
              <em>{m.partOfSpeech}</em>
              {m.definitions.map((d) => (
                <Definition data={d} />
              ))}
            </ColContainer>
          );
        })}
    </DictionaryContainer>
  );
}

async function fetchMeaningData({ query }) {
  const { data } = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en_US/${query}`
  );
  return data;
}

// Accept an object, gives you more flexibility
const DictionaryApp = {
  apiVersion: "instant-apps@v1",
  name: "Dictionary App",
  description:
    "I am simple dictionary app, give me a word, I'll tell you its meaning",
  logoUrl:
    "https://upload.wikimedia.org/wikipedia/commons/4/4b/Books-aj.svg_aj_ashton_01.svg",
  queryToData: fetchMeaningData,
  Component: Dictionary,
};

export default DictionaryApp;
