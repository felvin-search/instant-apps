import React, { useContext } from "react";

import { GameContext } from "./index";

import { generateMineField } from "../utils";

export const Button = () => {
  const { state, dispatch } = useContext(GameContext);
  const { isGameWon, isGameOver } = state;

  const resetGame = () => {
    const minefield = generateMineField();
    const mines = minefield.filter((mine) => mine.bomb === true).length;

    dispatch({ type: "setminefield", payload: minefield });
    dispatch({ type: "setmines", payload: mines });
    dispatch({ type: "setflags", payload: 0 });

    isGameOver
      ? dispatch({ type: "setgameover", payload: false })
      : dispatch({ type: "setgamewon", payload: false });
  };

  return (
    <>
      {(isGameOver || isGameWon) && (
        <button onClick={resetGame}>{isGameOver ? "Try" : "Play"}Again</button>
      )}
    </>
  );
};
