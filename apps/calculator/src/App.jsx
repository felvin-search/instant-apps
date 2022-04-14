import React, { Children, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const btnValues = [
  "C",
  "+-",
  "%",
  "/",
  7,
  8,
  9,
  "X",
  4,
  5,
  6,
  "-",
  1,
  2,
  3,
  "+",
  0,
  ".",
  "=",
];

const Container = styled.div`
  display: grid;
  border: 2px black solid;
  grid-template-columns: repeat(4, 4rem);
`;
const Screen = styled.div`
  height: 2.5rem;
  border: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 0.5rem;
  grid-column: span 4;
`;
const Btn = styled.div`
  border: 1px black solid;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: ${(props) => props.val == "=" && "auto/span 2"};
  width: auto;
  height: 2.5rem;
  cursor: pointer;
  transition: 0.2s ease-in;
  &:hover {
    background-color: #d8d5d5;
  }
`;
const BtnWrapper = ({ values, onClick }) => (
  <Btn onClick={onClick} val={values}>
    {values}
  </Btn>
);
//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const comaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Container>
      <Screen>{calc.num ? calc.num : calc.res}</Screen>
      {btnValues.map((btn, id) => (
        <BtnWrapper
          key={id}
          values={btn}
          onClick={
            btn === "C"
              ? resetClickHandler
              : btn === "+-"
              ? invertClickHandler
              : btn === "%"
              ? percentClickHandler
              : btn === "="
              ? equalsClickHandler
              : btn === "/" || btn === "X" || btn === "-" || btn === "+"
              ? signClickHandler
              : btn === "."
              ? comaClickHandler
              : numClickHandler
          }
        />
      ))}
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["calculator"])) {
    return;
  }

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
