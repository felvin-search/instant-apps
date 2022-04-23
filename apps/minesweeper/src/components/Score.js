import React, { useContext } from "react";
import { GameContext } from "./GameContext";

export const Score = () => {
  const { state } = useContext(GameContext);
  return (
    <div>
      <span role="img" description="flag" aria-label="flag">
        🚩
      </span>
      {state.mines - state.flags}
    </div>
  );
};
