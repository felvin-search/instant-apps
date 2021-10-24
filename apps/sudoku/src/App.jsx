import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import { getSudoku } from "sudoku-gen";

//------------Styled Components-------------

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Board = styled.div`
  height: 20.5rem;
  width: 20.5rem;
  border: 3px solid #000;
  border-radius: 0.5rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
`;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 30%;
`;

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
`;

const Cell = styled.input.attrs({ type: "text", maxLength: "1" })`
  -webkit-appearance: none;
  outline: none;
  height: 2rem;
  width: 2rem;
  border: 1px solid #777;
  border-radius: 0;
  text-align: center;
  color: #000;
  padding: 0;
  &:disabled {
    background-color: #ddd;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  jusity-content: space-around;
  padding-left: 2rem;
  width: 19rem;
`;

const Button = styled.button`
  background: transparent;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  width: 9rem;
`;

//=========================================

const convertSudoku = (input) =>
  input.puzzle.split("").map((c) => (c === "-" ? "" : c));

function Component() {
  const [sudoku, setSudoku] = useState(getSudoku("easy"));
  const [userInput, setUserInput] = useState(convertSudoku(sudoku));
  const [msg, setMsg] = useState("");
  const [displayMsg, setDisplayMsg] = useState(false);

  useEffect(() => {
    // reset user input when new sudoku is created
    setUserInput(convertSudoku(sudoku));
  }, [sudoku]);

  useEffect(() => {
    // remove msg after 3 seconds
    let timer = setTimeout(() => setDisplayMsg(false), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [displayMsg]);

  const renderCell = (id) => (
    <Cell
      id={id}
      value={userInput[id]}
      disabled={sudoku.puzzle[id] !== "-"}
      onChange={handleChange}
    />
  );

  const handleChange = (e) => {
    const value = e.target.value;

    // Validate Input
    if (value === "" || (value >= "1" && value <= "9")) {
      let newInput = [...userInput];
      newInput[e.target.id] = value;
      setUserInput(newInput);
    }
  };

  const handleSubmit = () => {
    const userAnswer = userInput.join("");
    let newMsg = "";

    if (userAnswer.length < sudoku.solution.length) {
      // Incomplete sudoku
      newMsg = "Please fill all the boxes";
    } else if (userAnswer === sudoku.solution) {
      // Win
      newMsg = "Congrats, You won the game !!!";
    } else {
      // Lose
      newMsg = "Wrong answer, Try again...";
    }
    setMsg(newMsg);
    setDisplayMsg(true);
  };

  const getNewSudoku = () => {
    setSudoku(getSudoku("easy"));
  };

  const getRow = (idx, blockRow) => {
    return Math.floor(idx / 3) * 3 + blockRow;
  };

  const getCol = (idx, block) => {
    return (idx % 3) * 3 + block;
  };

  const getId = (row, col) => {
    return row * 9 + col;
  };

  return (
    <Container>
      <Board>
        {new Array(9).fill(null).map((_, blockNum) => (
          <Block key={blockNum}>
            {new Array(3).fill(null).map((__, colNum) => (
              <Column key={blockNum * 3 + colNum}>
                {renderCell(
                  getId(getRow(blockNum, 0), getCol(blockNum, colNum))
                )}
                {renderCell(
                  getId(getRow(blockNum, 1), getCol(blockNum, colNum))
                )}
                {renderCell(
                  getId(getRow(blockNum, 2), getCol(blockNum, colNum))
                )}
              </Column>
            ))}
          </Block>
        ))}
      </Board>
      <ButtonContainer>
        <Button onClick={() => setUserInput(convertSudoku(sudoku))}>
          Clear
        </Button>
        <Button onClick={handleSubmit}>Check</Button>
        <Button onClick={getNewSudoku}>New Sudoku</Button>
        <div>{displayMsg ? msg : null}&nbsp;</div>
      </ButtonContainer>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (!isTriggered(query, ["sudoku", "play sudoku"])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
