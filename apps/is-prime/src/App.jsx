import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

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
  var matches = data.match(/(\d+)/);
  var number = matches[0];
  const isPrime=(num)=>{
    for(let i=2;i<num;i++)
    {
      if(num%i==0)
      return false;
    }
    return true;
  }
  
  return (
    <Container>
      {(data.includes("prime") || data.includes("Prime"))?(isPrime(number) ? <h1>Yes! {number} is a prime number</h1>:<h1>No! {number} is not a prime number</h1>):(isPrime(number) ? <h1>No! {number} is not a composite number</h1>:<h1>Yes! {number} is a composite number</h1>)}
      
    </Container>
  );
}

//=========================================
function stringContainsNumber(_input){
  let string1 = String(_input);
  for( let i = 0; i < string1.length; i++){
      if(!isNaN(string1.charAt(i)) && !(string1.charAt(i) === " ") ){
        return true;
      }
  }
  return false;
}
// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if(!stringContainsNumber(query))
  return;
  
  var matches = query.match(/(\d+)/);
  var num = matches[0];
  if (!isTriggered(query, [ `is ${num} a prime number` ]) && !query.includes("prime") && !query.includes("composite") && !query.includes("Prime") && !query.includes("Composite")) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query;

  return data;
}

export { queryToData, Component };
