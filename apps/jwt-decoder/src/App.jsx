import React, { useState } from "react";
import styled from "styled-components";
import { Breakpoints, isTriggered } from "@felvin-search/core";
import jwt_decode from 'jwt-decode';

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 70rem;
  padding: 1rem 1.5rem;

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 30rem;

  @media (min-width: ${Breakpoints.medium}) {
    margin-right: 5rem;
  }
`;

const Input = styled.textarea`
  width: 60vw;
  min-height: 20rem;
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  background-color: #eee;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.05);
  border: none;
  outline: none;

  @media (min-width: ${Breakpoints.medium}) {
    width: 30rem;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.5rem;
  padding: 1rem;
`;

const OutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 30rem;
  width: 30rem;
`;

const OutputSubContainer = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  padding: .7rem 1rem;
  border-radius: 10px;
  background-color: #eee;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.05);

  @media (min-width: ${Breakpoints.medium}) {
    width: 30rem;
  }
`;

const Output = styled.pre`
  width: 50vw;
  min-height: 10rem;
  max-height: 10rem;
  overflow: scroll;

  @media (min-width: ${Breakpoints.medium}) {
    width: 30rem;
  }
`;

const PrimaryHeading = styled.h2`
  font-size: 1.5rem;
  span {
    font-size: 1rem;
  }
`;

const SecondaryHeading = styled.h3`
  font-size: 1.2rem;
  padding: 0;
  margin: 1rem 0;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {

  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWFyY2giOiJmZWx2aW4iLCJjb2RlIjoiT3BlbiBTb3VyY2UiLCJwcm9qZWN0IjoiaW5zdGFudC1hcHBzIn0.6ZiTWZhU0jB5YXRSdb-O8kVHPSpknz7NyxyRLYoInGc");
  var payload = null, header = null, errorMsg = null;

  try {
    payload = JSON.stringify(jwt_decode(token), null, 2);
    header = JSON.stringify(jwt_decode(token, {header: true}), null, 2);
  }
  catch(err) {
    console.log(err);
    payload = null;
    header = null;
    if(token !== "") {
      errorMsg = "Invalid Token";
    }
  }
  return (
    <Container>

      <InputContainer>
        <PrimaryHeading>Encoded JWT <span>(paste a token here)</span></PrimaryHeading>

        <Input type="text" placeholder="Paste your JWT token here" value={token} onChange={(event) => setToken(event.target.value)}></Input>
        <ErrorMessage>{errorMsg}</ErrorMessage>
      </InputContainer>

      <OutputContainer>
        <PrimaryHeading>Decoded JWT</PrimaryHeading>

        <OutputSubContainer>
          <SecondaryHeading>header</SecondaryHeading>
          <Output>{header !== null ? header : ``}</Output>
        </OutputSubContainer>

        <OutputSubContainer>
          <SecondaryHeading>payload</SecondaryHeading>
          <Output>{payload !== null ? payload : ``}</Output>
        </OutputSubContainer>
      </OutputContainer>

    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (!isTriggered(query, [ "decode JWT","JWT decoder" ], {substringMatch: true})) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
}

export { queryToData, Component };
