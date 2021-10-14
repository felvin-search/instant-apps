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
  },[]);

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

const mapUnits = (str) => {
  if(str == "kg" || str == "kilograms" || str == "kgs")
  {
    return "kilogram";
  }
  else if(str == "grams" || str == "gm" || str == "gms" || str == "g")
  {
    return "gram";
  }
  else if(str == "milligrams" || str == "mg" || str == "mgs")
  {
    return "milligram";
  }
  else if(str == "ton" || str == "tons" || str == "tonnes")
  {
    return "tonne";
  }
  else if(str == "pounds" || str == "lbs")
  {
    return "pound";
  }
  else if(str == "stones" || str == "st")
  {
    return "stone";
  }
  else if(str == "ounces" || str == "oz")
  {
    return "ounce";
  }
  else 
  {
    return str;
  }
}

const parseConversionString = (query) => {
  const normalizedQuery = query.toLowerCase();
  if (normalizedQuery.includes("convert") && normalizedQuery.includes("to")) {
    const tokens = normalizedQuery
      .split(/([0-9.]+)/)
      .join(" ")
      .split(" ")
      .filter((s) => s !== "");
    if (tokens.length === 5) {
      try {
        const amount = parseFloat(tokens[1]);
        return { amount, from: tokens[2], to: tokens[4] };
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
  try {
    let { amount, from, to } = parseConversionString(query);
    from = mapUnits(from);
    to = mapUnits(to);
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
