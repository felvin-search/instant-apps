import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import { alphabetDict, wordleListByDay, wordleSorted } from "./wordleLists";
import { useState, useEffect } from "react";
import getListOfWords from "./logic";
import { RefreshCw } from "react-feather";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #121213;
  padding: 0 15px;
`;

const KeyboardKey = styled.button`
  font-family: inherit;
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  width: 43px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => props.background};
  disabled: ${(props) => props.disabled};
  color: #ffffff;
  flex: 1;
  display: flex;
  flex-basis: 43px;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
`;

const KeyboardKeySpecial = styled.button`
  font-family: inherit;
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  width: 75px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #818384;
  color: #ffffff;
  flex: 1;
  display: flex;
  flex-basis: 70px;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
`;

const Row = styled.div`
  display: flex;
  margin: 0 auto 8px;
  touch-action: manipulation;
  justify-content: center;
`;

const Keyboard = styled.div`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  margin: 0 8px;
`;

const Tile = styled.div`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  display: inline-flex;
  width: 50px;
  height: 50px;
  margin: 5px 2px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  vertical-align: middle;
  box-sizing: border-box;
  color: #ffffff;
  background-color: ${(props) => props.background};
  text-transform: uppercase;
  font-size: 2rem;
  line-height: 2rem;
  border: 2px solid ${(props) => props.border || "#3a3a3c"};
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  color: #fff;
`;

const Info = styled.div`
  margin: 5px;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  color: #fff;
`;

const SuggestionPill = styled.div`
  background-color: white;
  border-radius: 50px;
  padding: 0.9rem 1.6rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
`;

const PillArea = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  flex-flow: row wrap;
  gap: 1rem;
  margin: 10px;
  width: 500px;
`;

const Credits = styled.a`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  margin: 10px;
  text-decoration: none;
  color: #fff;
`;
//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component() {
  const [word, setWord] = useState([]);
  const [alphabet, setAlphabet] = useState(alphabetDict);
  const [wordColor, setWordColor] = useState([]);
  const [wordChecked, setWordChecked] = useState(false);
  const keyBoardRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keyBoardRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keyBoardRow3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    setPredictions(getListOfWords(word, wordColor, alphabet));
  }, [word, wordColor, alphabet]);

  const onTileClick = (index) => {
    if (!wordChecked) return;
    let colorArray = [...wordColor];
    if (wordColor[index] === "#3a3a3c") {
      colorArray[index] = "#538d4e";
      setAlphabet({
        ...alphabet,
        [word[index]]: "#538d4e",
      });
      setWordColor(colorArray);
    } else if (wordColor[index] === "#538d4e") {
      colorArray[index] = "#b59f3b";
      setAlphabet({
        ...alphabet,
        [word[index]]: "#b59f3b",
      });
      setWordColor(colorArray);
    } else if (wordColor[index] === "#b59f3b") {
      colorArray[index] = "#3a3a3c";
      setWordColor(colorArray);
      setAlphabet({
        ...alphabet,
        [word[index]]: "#3a3a3c",
      });
    }
    if (alphabet[word[index]] === "#818384") {
      setAlphabet({
        ...alphabet,
        [word[index]]: "#3a3a3c",
      });
    }
  };
  const checkWord = () => {
    let actualWord = word.join("").toLowerCase();
    if (
      wordleListByDay.includes(actualWord) ||
      wordleSorted.includes(actualWord)
    ) {
      setWordChecked(true);
      setWordColor(["#3a3a3c", "#3a3a3c", "#3a3a3c", "#3a3a3c", "#3a3a3c"]);
      let newAlphabet = {};
      word.forEach((letter) => {
        newAlphabet[letter] = "#3a3a3c";
      });
      setAlphabet({ ...alphabet, ...newAlphabet });
    } else {
      console.log(false);
    }
  };

  const keyBoard = (
    <Keyboard>
      <Row>
        {keyBoardRow1.map((key) => {
          return (
            <KeyboardKey
              disabled={word.includes(key) && wordChecked}
              background={alphabet[key]}
              onClick={() => {
                if (word.length < 5) {
                  setWord([...word, key]);
                }
                if (wordChecked) {
                  setAlphabet({
                    ...alphabet,
                    [key]: alphabet[key] === "#3a3a3c" ? "#818384" : "#3a3a3c",
                  });
                }
              }}
            >
              {key}
            </KeyboardKey>
          );
        })}
      </Row>
      <Row>
        {keyBoardRow2.map((key) => {
          return (
            <KeyboardKey
              disabled={word.includes(key) && wordChecked}
              background={alphabet[key]}
              onClick={() => {
                if (word.length < 5) {
                  setWord([...word, key]);
                }
                if (wordChecked) {
                  setAlphabet({
                    ...alphabet,
                    [key]: alphabet[key] === "#3a3a3c" ? "#818384" : "#3a3a3c",
                  });
                }
              }}
            >
              {key}
            </KeyboardKey>
          );
        })}
      </Row>
      <Row>
        <KeyboardKeySpecial onClick={checkWord}>Enter</KeyboardKeySpecial>
        {keyBoardRow3.map((key) => {
          return (
            <KeyboardKey
              dataKey={key}
              disabled={word.includes(key) && wordChecked}
              background={alphabet[key]}
              onClick={() => {
                if (word.length < 5) {
                  setWord([...word, key]);
                }
                if (wordChecked) {
                  setAlphabet({
                    ...alphabet,
                    [key]: alphabet[key] === "#3a3a3c" ? "#818384" : "#3a3a3c",
                  });
                }
              }}
            >
              {key}
            </KeyboardKey>
          );
        })}
        <KeyboardKeySpecial
          onClick={() => {
            setWord([...word.slice(0, -1)]);
            setWordColor([]);
            setWordChecked(false);
          }}
        >
          Del
        </KeyboardKeySpecial>
      </Row>
    </Keyboard>
  );

  const wordTiles = (
    <Row>
      <Tile
        background={wordColor[0] || "#121213"}
        onClick={() => onTileClick(0)}
        border={wordColor[0]}
      >
        {word[0] || " "}
      </Tile>
      <Tile
        background={wordColor[1] || "#121213"}
        onClick={() => onTileClick(1)}
        border={wordColor[1]}
      >
        {word[1] || " "}
      </Tile>
      <Tile
        background={wordColor[2] || "#121213"}
        onClick={() => onTileClick(2)}
        border={wordColor[2]}
      >
        {word[2] || " "}
      </Tile>
      <Tile
        background={wordColor[3] || "#121213"}
        onClick={() => onTileClick(3)}
        border={wordColor[3]}
      >
        {word[3] || " "}
      </Tile>
      <Tile
        background={wordColor[4] || "#121213"}
        onClick={() => onTileClick(4)}
        border={wordColor[4]}
      >
        {word[4] || " "}
      </Tile>
    </Row>
  );

  return (
    <>
      <Container>
        <Title>Wordle Solver</Title>
        <Info>
          Type in the word, and mark the colors by clicking on the tiles to see
          suggestions
        </Info>
        <br />
        <Row>
          {wordTiles}
          <RefreshCw
            onClick={() => {
              setWord([]);
              setWordColor([]);
              setWordChecked(false);
              setAlphabet(alphabetDict);
            }}
            color="white"
            height={58}
            style={{ padding: "0 10px" }}
          />
        </Row>
        {keyBoard}
        <PillArea>
          {predictions.map((word) => (
            <SuggestionPill
              onClick={() => {
                setWordColor([]);
                setWordChecked(false);
                setWord([...word.toUpperCase()]);
              }}
            >
              {word}
            </SuggestionPill>
          ))}
        </PillArea>
        <Credits href="https://github.com/Sync271">by Sync271</Credits>
      </Container>
    </>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (
    !isTriggered(query, [
      "solve wordle",
      "wordle solver",
      "5 letter word",
      "five letter word",
      "wordle solve",
    ])
  ) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
