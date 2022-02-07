import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import { hasAnyRootWords } from "@felvin-search/core";
import { hasNumbers } from "@felvin-search/core";
import { getNumbers } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {

  const toRoman = (num)=>{
    var roman = {
      V̅: 5000,
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
    var str = '';
  
    for (var i of Object.keys(roman)) {
      var q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
    }
  
    return str;
  }

  return (
    <Container>
      { data!=='0' ? <h1>{(toRoman(data))}</h1>:(<div><h1>nulla</h1><p> Roman system did not need any value to represent zero instead "nulla" was used to specify zero</p></div>)}
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  // var matches = query.match(/(\d+)/);
  // if (matches == null) return;
  // var num = matches[0];
  // if (
  //   !isTriggered(query, [`convert ${num} to Roman`]) &&
  //   !query.includes("Roman") &&
  //   !query.includes("roman")
  // ) {
  //   return;
  // }

  if(hasAnyRootWords(query, ["roman"]) && hasNumbers(query)) 
    return getNumbers(query)[0];
  return;

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  // const data = num;

  // return data;
}

export { queryToData, Component };
