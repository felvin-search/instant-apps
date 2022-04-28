import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered, matchTriggerQueries } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started
const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};
export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

const Container = styled.div`
  display: flex;
  // border: 2px solid black;
  justify-content: space-between;
  padding: 3rem;
  @media ${device.mobileS} {
    flex-direction: column;
    align-items: center;
  }
  @media ${device.tablet} {
    flex-direction: row;
  }
`;
const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const Button = styled.button`
  background-color: black;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 4px;
  height: 2rem;
  width: 5rem;
  transition: 0.3s;
  &:hover {
    background-color: white;
    color: black;
    border: black 1px solid;
  }
`;
const Result = styled.div`
  background-image: url(https://timesofindia.indiatimes.com/photo/59645926.cms?width=465&height=245);
  background-repeat: no-repeat;
  background-size: contain;
  height: 15rem;
  width: 20rem;
  position: relative;
  // color: red;
`;
const Pointer = styled.div`
  height: 5rem;
  position: absolute;
  width: 5px;
  left: 50%;
  top: 25%;
  background-color: black;
  transform: rotate(${(props) => props.value}deg);
  transform-origin: 100% 100%;
`;
const Wrapper = styled.div`
  width: 50vw;
  @media ${device.mobileS} {
    width: 100vw;
  }
  @media ${device.tablet} {
    width: 80vw;
  }
  @media ${device.laptop} {
    width: 60vw;
  }
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [deg, setDeg] = useState(-90);
  const [result, setResult] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const rotatePointer = (value) => {
    let id = setInterval(() => {
      setDeg((oldValue) => {
        const newValue = oldValue + 2;
        if (newValue > (value - 18) * 12 - 90) {
          clearInterval(id);
        } else if (newValue > 90) {
          clearInterval(id);
        }
        // console.log(newValue);
        return newValue;
      });
    }, 60);
  };

  const handleCalculate = () => {
    let result = [Number(weight) / Number(height) / Number(height)] * 10000;
    result = Math.round(result);
    setResult(result);
    setDeg(-90);
    rotatePointer(result);
  };
  return (
    <Wrapper>
      <h5 style={{ textAlign: "center" }}>BMI Calculator</h5>
      <Container>
        <InputBox>
          <label htmlFor="height">Height(cm)</label>
          <input
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            id="height"
          />
          <br />
          <label htmlFor="weight">Weight(kg)</label>
          <input
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            id="weight"
          />
          <Button onClick={handleCalculate}>Calculate</Button>
        </InputBox>
        <Result>
          <Pointer value={deg} />
          <h5 style={{ textAlign: "center", marginTop: "50%" }}>
            Result {result}
          </h5>
        </Result>
      </Container>
    </Wrapper>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = matchTriggerQueries(["BMI", "BMI CALCULATOR"]);

export { queryToData, Component };
