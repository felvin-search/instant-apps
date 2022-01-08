import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import StatusCodes from "./files/codes.js"
//StatusCodes data imported from MDN - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  @media(max-width: 768px) {
    flex-direction:column;
  }
`;
const StatusC= styled.div`
font-size: 1.5em;
text-align: center;
font-weight:bold;
width:30%;
border-right:1px solid black;
display:flex;
align-items: center;
justify-content: center;
@media(max-width: 768px) {
  border-right:none;
  border-bottom:1px solid black;
  width:100%;
}


`
const Wrapper = styled.div`
  display:flex;
  flex-direction: column;
  width:70%;
  @media(max-width: 768px) {
    width:100%;
  }

  `
const Meaning=styled.h4`
text-align: center;
  padding:0.8rem;
  border-bottom:1px solid black;
  margin:0;
 
  `
const Description=styled.p`
  font-size:1.25rem;
  padding: 1rem 3rem;

  `
//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  return (
    <Container>
      <StatusC>{data.value} HTTP code</StatusC>
      <Wrapper>
        <Meaning>
          {data.meaning}
        </Meaning>
        <Description>
          {data.description}
        </Description>
      </Wrapper>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  query=query.toLowerCase();
  const triggeredQueries=[ "status","code","http" ]
  if (!isTriggered(query, triggeredQueries, { substringMatch: true })) {
    return;
  }
  
  let filteredQuery = query.split(' ');
  const codes=filteredQuery.filter((word)=>{
    return !isNaN(word)
  })
  if(codes.length==0||codes[0].length!=3){
    return
  }
  let code= codes[0]
  let indexOfCode=StatusCodes.findIndex((status)=>{
    return status.value==code;
  })
  if(indexOfCode==-1){
    return
  }else{
    return StatusCodes[indexOfCode]
  }
  
}

export { queryToData, Component };
