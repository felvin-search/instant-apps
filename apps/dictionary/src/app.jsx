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

/**
 * The UI logic of the app.
 */
function Component(props) {
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

export default Component;
