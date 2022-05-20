import React, { useContext } from "react";
import styled from "styled-components";
import { GameContext, Mine } from "./index";
const MinefieldContainer = styled.div`
  width: clamp(250px,40vw,400px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
`;

export const Minefield = () => {
  const { state } = useContext(GameContext);

  return (
    <MinefieldContainer>
      {state.minefield.map((mine, index) => (
        <Mine mine={mine} key={`{mine-${index}`} />
      ))}
    </MinefieldContainer>
  );
};
