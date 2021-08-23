import { useState } from "react";
import styled from "styled-components";
import { InstantApp } from "./types";

//------------Styled Components------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RestartButton = styled.button`
  background: transparent;
  cursor: pointer;

  padding: 0.5rem 1.5rem;
  border-radius: 7px;
`;

const BoardContainer = styled.div`
  margin: 0.5rem;
`;

//=========================================

function Square(props) {
  const StyledSquare = styled.button`
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 34px;
  `;

  return <StyledSquare onClick={props.onClick}>{props.value}</StyledSquare>;
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setSquares((squares) => {
      squares[i] = xIsNext ? "X" : "O";
      return squares;
    });
  };

  const winner = calculateWinner(squares);
  let status;
  // TODO: add a condition check for draw
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <Container>
      <div>{status}</div>
      <BoardContainer>
        <div>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </BoardContainer>
      <RestartButton
        onClick={() => {
          setXIsNext(true);
          setSquares(Array(9).fill(null));
        }}
      >
        Restart Game
      </RestartButton>
    </Container>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const MyAppComponent = (props) => {
  return <Board />;
};

const shouldRunMyApp = async ({ query }) => {
  const triggerQueries = ["tic tac toe"];
  for (const triggerQuery of triggerQueries) {
    if (query.toLowerCase() === triggerQuery) {
      return { query };
    }
  }
  return;
};

const TicTacToe = {
  name: "Tic-Tac-Toe",
  description: "Play Tic-Tac-Toe with someone or yourself",
  queryToData: shouldRunMyApp,
  Component: MyAppComponent,
};

export default TicTacToe;
