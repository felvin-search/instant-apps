import React, { useEffect, useState } from "react";
import styled from "styled-components";
import conversionsTable from "./conversions.json";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const OutputString = styled.div`
  font-size: medium;
  padding: 0 0 1.25rem 0;
  text-align: center;
`;

const ColContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.

function Component({ data }) {
  const [inputWeight, setInputWeight] = useState(data.inputWeight);
  const [outputWeight, setOutputWeight] = useState(data.outputWeight);

  const [inputValue, setInputValue] = useState(data.amount);
  const [outputValue, setOutputValue] = useState(0);
  const converter = () => {
    const kilos = conversionsTable[inputWeight]["kilogram"] * inputValue;
    setOutputValue(conversionsTable["kilogram"][outputWeight] * kilos);
  };

  useEffect(() => {
    converter();
  }, []);

  return (
    <ColContainer>
      <OutputString>
        {inputValue} {inputWeight} equals{" "}
        <b>
          {outputValue} {outputWeight}
        </b>
      </OutputString>
    </ColContainer>
  );
}

const isValidWeightUnit = (str) => {
  const weightUnits = [
    "kilogram",
    "gram",
    "ounce",
    "milligram",
    "pound",
    "stone",
    "tonne",
  ];
  if (weightUnits.includes(str)) return true;
};

const replaceSynonyms = (query, dictionary) => {
  const tokens = query.split(' ')
  var newTokens = [];
  for(let token of tokens){
    var replaced = false;
    for(let to of Object.keys(dictionary)){
      for(let from of dictionary[to]){
        if(from === token){
          newTokens.push(to);
          replaced = true;
          break;
        }
      }
    }
    if(replaced === false) {
      newTokens.push(token)
    }
    console.log(newTokens)
  } 

  return newTokens.join(" ");
};

const parseConversionString = (query) => {
  const normalizedQuery = query.toLowerCase();
  if (normalizedQuery.includes(" to ") || normalizedQuery.includes(" in ")) {
    // The regex passed to the 1st split (/([0-9.]+)/) splits a string around a number (like "word12.3word" -> ["word", "12.3", "word"])
    const tokens = normalizedQuery
      .split(/([0-9.]+)/)
      .join(" ")
      .split(" ")
      .filter((s) => s !== "");
    if (tokens.length === 3) {
      return { amount: 1, from: tokens[0], to: tokens[2] };
    } else if (tokens.length === 4) {
      try {
        const amount = parseFloat(tokens[0]);
        return { amount, from: tokens[1], to: tokens[3] };
      } catch {
        return null;
      }
    }
    return null;
  }
};

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
async function queryToData({ query }) {
  console.log("Weight convertor queryToData was called")
  try {
    const normalizedQuery =       replaceSynonyms(query, {
      gram: ["grams", "g", "gs"],
      kilogram: ["kilograms", "kgs", "kg"],
      milligram: ["milligrams", "mg", "mgs"],
      tonne: ["tonnes", "tn", "ton"],
      pound: ["pounds", "lbs", "lb"],
      ounce: ["ounces", "oz"],
      stone: ["stones", "st"],
    })
    console.log(`after conversion: ${normalizedQuery}`)
    let { amount, from, to } = parseConversionString(normalizedQuery
    );
    if (isValidWeightUnit(from) && isValidWeightUnit(to)) {
      return {
        amount,
        inputWeight: from,
        outputWeight: to,
      };
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

export { queryToData, Component };
