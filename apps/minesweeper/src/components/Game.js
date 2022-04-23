import React from "react";
import styled from "styled-components";

import { Score, Minefield, Button } from "./index";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Game = () => {
  return (
    <Wrapper>
      <Score />
      <Minefield />
      <Button />
    </Wrapper>
  );
};
