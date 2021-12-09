import React, { useEffect, useState } from "react";
import styled from "styled-components";
import conversionsTable from "./diffunits.json";

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
  const [inputlength, setInputlength] = useState(data.inputlength);
  const [outputlength, setOutputlength] = useState(data.outputlength);
  const [inputValue, setInputValue] = useState(data.amount);
  const [outputValue, setOutputValue] = useState(0);
  const converter = () => {
      const metres = conversionsTable[inputlength]["metre"] * inputValue;
      setOutputValue(conversionsTable["metre"][outputlength] * metres);
  };
  useEffect(() => {
      converter();
  }, []);

  return (
      <ColContainer>
          <OutputString>
              {inputValue} {inputlength} equals{" "}
              <b>
                  {outputValue} {outputlength}
              </b>
          </OutputString>
      </ColContainer>
  );
}

const isValidLengthUnit = (str) => {
  const units_length = [
      "metre",
      "centimetre",
      "millimetre",
      "kilometre",
      "inch",
      "feet",
      "nanometre",
      "yard"
  ];
  if (units_length.includes(str)) return true;
};

const mapUnits = (str) => {
  if (str == "metre" || str =="m") {
      return "metre";
  }
  else if (str == "centimetre" || str == "cm") {
      return "centimetre";
  }
  else if (str == "millimetre" || str == "mm") {
      return "millimetre";
  }
  else if (str == "kilometre" || str == "km") {
      return "kilometre";
  }
  else if (str == "inch" || str == "in") {
      return "inch";
  }
  else if (str == "feet" || str == "ft") {
      return "feet";
  }
  else if (str == "nanometre" || str == "nm") {
      return "nanometre";
  }
  else if (str == "yard" || str == "yd") {
      return "yard";
  }
  else {
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
      if (isValidLengthUnit(from) && isValidLengthUnit(to)) {
          return {
              amount,
              inputlength: from,
              outputlength: to,
          };
      } else {
          return null;
      }
  } catch {
      return null;
  }
}

export { queryToData, Component };