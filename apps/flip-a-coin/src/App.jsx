import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TailSide = styled.div`
  background-color: #bb0000;
  color: white;
  text-align: center;
`;

const HeadSide = styled.div`
  background-color: #3e3e3e;
  color: white;
  text-align: center;
  -webkit-transform: rotateY(-180deg);
`;

// Create the keyframes
const flipHeads = keyframes`
  from {
    -webkit-transform: rotateY(0);
    -moz-transform: rotateY(0);
    transform: rotateY(0);
  }
  to {
    -webkit-transform: rotateY(1620deg);
    -moz-transform: rotateY(1620deg);
    transform: rotateY(1620deg);
  }
`;

const flipTails = keyframes`
  from {
    -webkit-transform: rotateY(0);
    -moz-transform: rotateY(0);
    transform: rotateY(0);
  }
  to {
    -webkit-transform: rotateY(1800deg);
    -moz-transform: rotateY(1800deg);
    transform: rotateY(1800deg);
  }
`;

const Coin = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100px;
  height: 100px;

  transition: -webkit-transform 1s ease-in;
  -webkit-transform-style: preserve-3d;

  div {
    width: 100%;
    height: 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    -webkit-box-shadow: inset 0 0 45px rgba(255, 255, 255, 0.3),
      0 12px 20px -10px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: inset 0 0 45px rgba(255, 255, 255, 0.3),
      0 12px 20px -10px rgba(0, 0, 0, 0.4);
    box-shadow: inset 0 0 45px rgba(255, 255, 255, 0.3),
      0 12px 20px -10px rgba(0, 0, 0, 0.4);

    position: absolute;
    -webkit-backface-visibility: hidden;
  }

  &.heads {
    -webkit-animation: ${flipHeads} 2s ease-out forwards;
    -moz-animation: ${flipHeads} 2s ease-out forwards;
    -o-animation: ${flipHeads} 2s ease-out forwards;
    animation: ${flipHeads} 2s ease-out forwards;
  }

  &.tails {
    -webkit-animation: ${flipTails} 2s ease-out forwards;
    -moz-animation: ${flipTails} 2s ease-out forwards;
    -o-animation: ${flipTails} 2s ease-out forwards;
    animation: ${flipTails} 2s ease-out forwards;
  }
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [toss, setToss] = useState("");

  function coinToss() {
    setToss("");
    setTimeout(() => {
      if (Math.random() < 0.5) {
        setToss("heads");
      } else {
        setToss("tails");
      }
    }, 100);
  }

  return (
    <Container>
      <Coin className={toss}>
        <TailSide>
          <h2>TAIL</h2>
        </TailSide>
        <HeadSide>
          <h2>HEAD</h2>
        </HeadSide>
      </Coin>
      <h1>Flip a coin</h1>
      <button id="btn" onClick={coinToss}>
        Toss
      </button>
    </Container>
  );
}

//=========================================

const queryToData = ({ query }) => {
  if (!isTriggered(query, ["flip a coin", "flip", "toss", "toss a coin"])) {
    return;
  }

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
